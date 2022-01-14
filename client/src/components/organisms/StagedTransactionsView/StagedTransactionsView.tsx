import React from "react";
import { Transaction } from "../../../types";
import useStagedTransactionsAsync, {
  UseStagedTransactionsAsync,
} from "../../../hooks/useStagedTransactionsAsync";
import style from "./StagedTransactionsView.module.scss";
import classnames from "classnames";
import Table from "../../atoms/Table";
import Td from "../../atoms/Td";
import {
  getElapsedTime,
  getStatusAlias,
  getStatusColor,
} from "../../../utils/functions";

const cx = classnames.bind(style);

function StagedTransactionsView(): JSX.Element {
  const { stagedTransactions, error }: UseStagedTransactionsAsync =
    useStagedTransactionsAsync();
  return (
    <div className={cx("staged-transactions-view")}>
      <h2>
        Staged Transactions:{" "}
        {typeof stagedTransactions?.length === "number"
          ? stagedTransactions?.length
          : 0}
      </h2>
      {error && <p>서버에 문제가 있습니다.</p>}
      <Table>
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
          {stagedTransactions?.map((transaction: Transaction) => {
            return (
              <tr key={transaction.txId}>
                <Td className="tx-id">{transaction.txId}</Td>
                <Td className="nonce">{transaction.nonce}</Td>
                <Td className="actions">{transaction.actions[0]}</Td>
                <Td className="createdAt">
                  {new Date(transaction.createdAt).toUTCString()}
                </Td>
                <Td
                  className={`status ${getStatusColor(
                    Number(transaction.status)
                  )}`}
                  // FIXME: scss module is not loaded to browser
                  style={{
                    color: getStatusColor(Number(transaction.status)),
                    fontWeight: "bold",
                  }}
                >
                  {`${getStatusAlias(Number(transaction.status))} ${
                    Number(transaction.status) === 0
                      ? getElapsedTime(transaction.createdAt)
                      : ""
                  }`}
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default StagedTransactionsView;
