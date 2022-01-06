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
const webHook = process.env.WEBHOOK
  ? new WebHook(process.env.WEBHOOK)
  : undefined;
// Warn every 60 seconds.
const WARN_TIMEOUT: number = process.env.WARN_TIMEOUT
  ? parseInt(process.env.WARN_TIMEOUT)
  : 60 * 1000;
const lastWarnedMap = new Map<string, Date>();

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

setInterval(async () => {
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
      limit: 100,
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
      limit: 100,
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
      if (storedTransactions[i].txId == txId) {
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
      } else if (transaction.status == TransactionStatus.Staged) {
        transaction.status = TransactionStatus.Pending2;
      } else if (transaction.status == TransactionStatus.Pending1) {
        // Warn via slack that the transaction with id is pending for long time.
        const id = transaction.txId;
        const createdAt = transaction.createdAt;
        let lastWarned = lastWarnedMap.get(id);
        lastWarned =
          lastWarned === undefined ? new Date(createdAt) : lastWarned;
        const elapsed = new Date().valueOf() - lastWarned.valueOf();

        if (elapsed > WARN_TIMEOUT) {
          logMessages +=
            'Transaction "' +
            id +
            '" is pending for ' +
            (new Date().valueOf() - new Date(createdAt).valueOf()) / 1000 +
            " seconds.\n";
          lastWarnedMap.set(id, new Date());
        }
      }

      return transaction;
    }
  );

  transactionDao.update(stagedTransactions);

  const transactions = await transactionDao.getAll();
  if (transactions !== undefined) {
    const transactionsToUpdate = new Array<Transaction>();
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
          const id = value.txId;
          const storedTransaction = await RequestAsync(
            SOURCE_ENDPOINT,
            StoredTransactionQuery,
            { id: id }
          );

          lastWarnedMap.delete(id);

          if (storedTransaction === undefined || storedTransaction === null) {
            value.status = TransactionStatus.Discarded;
            logMessages +=
              'Transaction "' +
              id +
              '" is discarded after ' +
              (new Date().valueOf() - new Date(value.createdAt).valueOf()) /
                1000 +
              " seconds.";
          } else {
            value.status = TransactionStatus.Included;
          }
          transactionsToUpdate.push(value);
        }
      });

    await Promise.all(promises);
    transactionDao.update(transactionsToUpdate);
  }

  if (logMessages !== "") {
    logMessages.trimEnd();
    webHook?.send(logMessages);
  }
}, 5000);

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
  return res.status(OK).json({
    stagedTransactions: stagedTransactions,
    transactions: transactions,
  });
}
