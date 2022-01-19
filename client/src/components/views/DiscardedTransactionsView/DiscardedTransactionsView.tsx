import React from "react";
import classNames from "classnames";
import styles from "./DiscardedTransactionsView.scss";
import useTransactionsAsync, {
  UseTransactionsAsync,
} from "../../../hooks/useTransactionsAsync";
import { Table } from "react-bootstrap";
import { Transaction } from "../../../types";
import Td from "../../props/Td";
import { getStatusAlias, getStatusColor } from "../../../utils/functions";

const cx = classNames.bind(styles);

function DiscardedTransactionsView(): JSX.Element {
  const { discardedTransactions, error }: UseTransactionsAsync =
    useTransactionsAsync();
  return (
    <div className={cx("discarded-transactions-view")}>
      <h2>
        Discarded Transactions:{" "}
        {typeof discardedTransactions?.length === "number"
          ? discardedTransactions?.length
          : 0}
      </h2>
      {error && <p>서버에 문제가 있습니다.</p>}
      <Table striped bordered hover>
        <thead>
          <tr className="table-header">
            <th>Transaction Id</th>
            <th>Nonce</th>
            <th>Actions</th>
            <th>Created At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {discardedTransactions?.map((transaction: Transaction) => {
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
                  className={`status ${getStatusColor(
                    Number(transaction.status)
                  )}`}
                >
                  {getStatusAlias(Number(transaction.status))}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default DiscardedTransactionsView;
