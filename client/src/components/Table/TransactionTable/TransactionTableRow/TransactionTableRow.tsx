import React from "react";
import { Transaction } from "../../../../types";
import classNames from "classnames";
import styles from "./TransactionTableRow.scss";
import Td from "../../../atoms/Td";
import {
  getStatusAlias,
  getElapsedTime,
  getStatusColor,
} from "../../../../utils/functions";

type Transactions = {
  transactions: Transaction[] | undefined;
};
type RenderTransactionTableRowResult = () => JSX.Element[] | undefined;

const cx = classNames.bind(styles);

function TransactionTableRow({
  transactions,
  ...props
}: Transactions): RenderTransactionTableRowResult {
  const renderTransactionTableRow: () => JSX.Element[] | undefined = () =>
    transactions?.map((transaction: Transaction) => {
      return (
        <tr
          key={transaction.txId}
          {...props}
          className={cx("transaction-table-row")}
        >
          <Td className="tx-id">
            <pre>{transaction.txId}</pre>
          </Td>
          <Td className="nonce">{transaction.nonce}</Td>
          <Td className="actions">{transaction.actions[0]}</Td>
          <Td className="created-at">
            {new Date(transaction.createdAt).toUTCString()}
          </Td>
          <Td
            className={classNames(
              "status",
              getStatusColor(Number(transaction.status))
            )}
          >
            {getStatusAlias(Number(transaction.status))}
            {Number(transaction.status) !== 4 && (
              <>
                <br />
                <span className={cx("detail")}>
                  {Number(transaction.status) === 0
                    ? "\n(for " +
                      getElapsedTime(transaction.createdAt).toFixed(2) +
                      " seconds)"
                    : "\n(staged after " +
                      getElapsedTime(
                        transaction.stagedAt,
                        transaction.createdAt
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
