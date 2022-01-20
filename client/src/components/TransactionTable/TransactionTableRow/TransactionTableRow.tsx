import React from "react";
import { Transaction } from "../../../types";
import Td from "../../atoms/Td";
import {
  getStatusAlias,
  getElapsedTime,
  getStatusColor,
} from "../../../utils/functions";

type Transactions = {
  transactions: Transaction[] | undefined;
};

function TransactionTableRow({ transactions }: Transactions) {
  const renderTransactionTableRow: () => JSX.Element[] | undefined = () =>
    transactions?.map((transaction: Transaction) => {
      return (
        <tr key={transaction.txId}>
          <Td className="tx-id">
            <pre>{transaction.txId}</pre>
          </Td>
          <Td className="nonce">{transaction.nonce}</Td>
          <Td className="actions">{transaction.actions[0]}</Td>
          <Td className="created-at">
            {new Date(transaction.createdAt).toUTCString()}
          </Td>
          <Td
            className={`status ${getStatusColor(Number(transaction.status))}`}
          >
            {getStatusAlias(Number(transaction.status))}
            {Number(transaction.status) !== 4 && (
              <>
                <br />
                <span
                  style={{
                    color: "black",
                    fontWeight: "lighter",
                    fontSize: "smaller",
                  }}
                >
                  {Number(transaction.status) === 0
                    ? "\n(for " +
                      getElapsedTime(transaction.createdAt).toFixed(2) +
                      " seconds)"
                    : "\n(staged after " +
                      (
                        (transaction.stagedAt - transaction.createdAt) /
                        1000
                      ).toFixed(2) +
                      " seconds)"}
                </span>
              </>
            )}
          </Td>
        </tr>
      );
    });
  return renderTransactionTableRow;
}

export default TransactionTableRow;
