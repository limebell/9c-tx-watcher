import { ClientError, request } from "graphql-request";
import StatusCodes from "http-status-codes";
import { Request, Response } from "express";
import TransactionDao from "@daos/Transaction/TransactionDao.mock";
import { Transaction, TransactionStatus } from "../interfaces/Transaction";
import {
  MinerAddressQuery,
  NextTxNonceQuery,
  StagedTransactionsQuery,
  StoredTransactionQuery,
} from "../graphql";
import { WebHook } from "../slack";

const transactionDao = new TransactionDao();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;
const SOURCE_ENDPOINT: string = process.env.SOURCE_ENDPOINT
  ? process.env.SOURCE_ENDPOINT
  : "";
const TARGET_ENDPOINT: string = process.env.TARGET_ENDPOINT
  ? process.env.TARGET_ENDPOINT
  : "";
const webHook: WebHook | undefined = process.env.WEBHOOK
  ? new WebHook(process.env.WEBHOOK)
  : undefined;
// Warn every 60 seconds.
const WARN_TIMEOUT: number = process.env.WARN_TIMEOUT
  ? parseInt(process.env.WARN_TIMEOUT)
  : 60 * 1000;
const POLL_INTERVAL: number = process.env.POLL_INTERVAL
  ? parseInt(process.env.POLL_INTERVAL)
  : 5000;

async function RequestAsync(
  endpoint: string,
  query: string,
  variables?: object
): Promise<any> {
  try {
    var r = await request(endpoint, query, variables);
    return r;
  } catch (error) {
    if (!(error instanceof ClientError)) {
      console.error("Error occurrend during RequestAsync: " + error);
      return null;
    } else {
      throw error;
    }
  }
}

async function GetAddresses() {
  try {
    const sourceAddressQuery = await RequestAsync(
      SOURCE_ENDPOINT,
      MinerAddressQuery
    );
    sourceAddress = sourceAddressQuery?.minerAddress;
  } catch (error) {
    console.error("Error occurred during sourceAddressQuery " + error);
    if (error instanceof ClientError) {
      var ce = error as ClientError;
      if (ce.response.data.minerAddress == null) {
        console.log("Miner address of source client is null");
        sourceAddress = null;
      }
    }
  }
  const targetAddressQuery = await RequestAsync(
    TARGET_ENDPOINT,
    MinerAddressQuery
  );
  targetAddress = targetAddressQuery?.minerAddress;
}

function getTypeId(action: string): string {
  const index = action.indexOf('"type_id"');
  if (index === -1) {
    return "unkown_action";
  }

  const startIndex = action.indexOf('"', index + '"type_id"'.length) + 1;
  if (startIndex === -1) {
    return "unkown_action";
  }

  const endIndex = action.indexOf('"', startIndex);
  if (endIndex === -1) {
    return "unkown_action";
  }

  return action.substring(startIndex, endIndex);
}

async function GetStoredTransaction(
  id: string
): Promise<Transaction | undefined | null> {
  try {
    const storedTransaction = await RequestAsync(
      SOURCE_ENDPOINT,
      StoredTransactionQuery,
      { id: id }
    );
    return storedTransaction;
  } catch (error) {
    if (error instanceof ClientError) {
      return null;
    }

    return undefined;
  }
}

async function update() {
  if (sourceAddress === undefined || targetAddress === undefined) {
    await GetAddresses();
  }

  const sourceStagedTransactions = await RequestAsync(
    SOURCE_ENDPOINT,
    StagedTransactionsQuery,
    {
      signer: sourceAddress,
      involvedAddress: null,
      desc: false,
      offset: 0,
      limit: 1000,
    }
  );
  const targetStagedTransactions = await RequestAsync(
    TARGET_ENDPOINT,
    StagedTransactionsQuery,
    {
      signer: sourceAddress,
      involvedAddress: null,
      desc: false,
      offset: 0,
      limit: 1000,
    }
  );

  const sourceTxs =
    sourceStagedTransactions?.chainQuery.transactionQuery?.stagedTransactions;
  const targetTxIds =
    targetStagedTransactions?.chainQuery.transactionQuery?.stagedTransactions.map(
      (value: { id: string }) => value.id
    );

  const storedTransactions = await transactionDao.getAll();

  function getTxOfId(txId: string): Transaction | null {
    for (let i: number = 0; i < storedTransactions.length; i++) {
      if (storedTransactions[i].txId === txId) {
        return storedTransactions[i];
      }
    }
    return null;
  }

  let logMessages = "";
  stagedTransactions = sourceTxs?.map(
    (value: { actions: any[]; id: any; nonce: any; timestamp: any }) => {
      let stored = getTxOfId(value.id);
      let transaction: Transaction;
      if (stored === null) {
        transaction = {
          actions: value.actions.map((action) => getTypeId(action.inspection)),
          txId: value.id,
          nonce: value.nonce,
          createdAt: value.timestamp,
          status: TransactionStatus.Pending1,
        };
      } else {
        transaction = stored;
      }

      if (targetTxIds?.includes(transaction.txId)) {
        transaction.status = TransactionStatus.Staged;
      } else if (transaction.status === TransactionStatus.Staged) {
        transaction.status = TransactionStatus.Pending2;
      }

      return transaction;
    }
  );

  transactionDao.update(stagedTransactions);

  const transactions = await transactionDao.getAll();
  if (transactions !== undefined) {
    const transactionsToUpdate = new Array<Transaction>();
    const transactionsToDelete = new Array<Transaction>();
    const promises = transactions
      .filter(
        (value) =>
          value.status === TransactionStatus.Pending1 ||
          value.status === TransactionStatus.Staged ||
          value.status === TransactionStatus.Pending2
      )
      .map(async (value) => {
        // If transaction is no more staged, check storage to find out whether it is stored or discarded.
        if (
          stagedTransactions?.find(
            (t: { txId: string }) => t.txId == value.txId
          ) === undefined
        ) {
          const id: string = value.txId;
          const storedTransaction: Transaction | undefined | null =
            await GetStoredTransaction(id);

          if (storedTransaction === undefined || storedTransaction === null) {
            value.status = TransactionStatus.Discarded;
            logMessages +=
              'Transaction "' +
              id +
              '" is discarded after ' +
              (new Date().valueOf() - new Date(value.createdAt).valueOf()) /
                1000 +
              " seconds.\n";
            transactionsToUpdate.push(value);
          } else {
            // Do not save included transactions for now
            value.status = TransactionStatus.Included;
            transactionsToDelete.push(value);
          }
        }
      });

    await Promise.all(promises);
    transactionDao.update(transactionsToUpdate);
    transactionDao.delete(transactionsToDelete.map((tx) => tx.txId));
  }

  if (logMessages !== "") {
    logMessages.trimEnd();
    webHook?.send(logMessages);
  }
}

async function warn() {
  const transactions = await transactionDao.getAll();
  // Warn via slack that the transaction with id is pending for long time.
  let count: number = 0;
  transactions.forEach((tx) => {
    const createdAt = tx.createdAt;
    const elapsed = new Date().valueOf() - new Date(createdAt).valueOf();

    if (elapsed > WARN_TIMEOUT) {
      count++;
    }
  });

  if (count > 0) {
    webHook?.send(
      count +
        " transactions are still not staged after " +
        WARN_TIMEOUT / 1000 +
        " seconds."
    );
  }
}

setInterval(update, POLL_INTERVAL);
setInterval(warn, WARN_TIMEOUT);

let sourceAddress: string | undefined | null = undefined;
let targetAddress: string | undefined | null = undefined;
let stagedTransactions: Array<Transaction>;

/**
 * Get addresses.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getAddresses(req: Request, res: Response) {
  if (sourceAddress === undefined || targetAddress === undefined) {
    await GetAddresses();
  }
  return res
    .status(OK)
    .json({ sourceAddress: sourceAddress, targetAddress: targetAddress });
}

/**
 * Get next nonce.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getNextNonce(req: Request, res: Response) {
  if (sourceAddress === undefined) {
    await GetAddresses();
  }
  const nextTxNonce = await RequestAsync(SOURCE_ENDPOINT, NextTxNonceQuery, {
    address: sourceAddress,
  });
  return res
    .status(OK)
    .json({ nextTxNonce: nextTxNonce?.transaction.nextTxNonce });
}

/**
 * Get transactions.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getTransactions(req: Request, res: Response) {
  var transactions = await transactionDao.getAll();
  transactions =
    transactions === undefined ? new Array<Transaction>() : transactions;
  // Display discarded transactions only
  return res.status(OK).json({
    stagedTransactions: stagedTransactions,
    transactions: transactions.filter(
      (tx) => tx.status === TransactionStatus.Discarded
    ),
  });
}
