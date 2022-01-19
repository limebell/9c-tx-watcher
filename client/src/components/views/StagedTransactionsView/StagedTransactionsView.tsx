import React from "react";
import { Transaction } from "../../../types";
import useTransactionsAsync, {
  UseTransactionsAsync,
} from "../../../hooks/useTransactionsAsync";
import style from "./StagedTransactionsView.scss";
import classnames from "classnames";
import { Table } from "react-bootstrap";
import Td from "../../props/Td";
import {
  getElapsedTime,
  getStatusAlias,
  getStatusColor,
} from "../../../utils/functions";

const cx = classnames.bind(style);

function StagedTransactionsView(): JSX.Element {
  const { stagedTransactions, averageStagedTime, error }: UseTransactionsAsync =
    useTransactionsAsync();
  const getStatusStatistics = (transactions: Transaction[]) => {
    const statistics = {
      pending1: 0,
      staged: 0,
      pending2: 0,
    };
    transactions.forEach((tx) => {
      switch (tx.status) {
        case 0:
          statistics.pending1++;
          break;
        case 1:
          statistics.staged++;
          break;
        case 2:
          statistics.pending2++;
          break;
      }
    });
    return (
      <p>
        <b>Pending1</b>: {statistics.pending1}
        {" / "}
        <b>Staged</b>: {statistics.staged}
        {" / "}
        <b>Pending2</b>: {statistics.pending2}
      </p>
    );
  };
  return (
    <div className={cx("staged-transactions-view")}>
      <div className={cx("staged-transactions-view", "header")}>
        <h2>
          Staged Transactions:{" "}
          {typeof stagedTransactions?.length === "number"
            ? stagedTransactions?.length
            : 0}
        </h2>
        {error ? (
          <p className={"error"}>서버에 문제가 있습니다.</p>
        ) : typeof stagedTransactions !== "undefined" ? (
          getStatusStatistics(stagedTransactions)
        ) : (
          ""
        )}
      </div>
      Average staged time:{" "}
      {averageStagedTime === undefined
        ? -1
        : (averageStagedTime / 1000).toFixed(2)}{" "}
      seconds
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
          {stagedTransactions?.map((transaction: Transaction) => {
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
