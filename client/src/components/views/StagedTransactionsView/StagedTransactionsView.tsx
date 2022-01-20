import React from "react";
import { Transaction } from "../../../types";
import useTransactionsAsync, {
  UseTransactionsAsync,
} from "../../../hooks/useTransactionsAsync";
import style from "./StagedTransactionsView.scss";
import classnames from "classnames";
import { Table } from "react-bootstrap";
import TransactionTableHeader from "../../TransactionTable/TransactionTableHeader";
import TransactionTableRow from "../../TransactionTable/TransactionTableRow";

const cx = classnames.bind(style);
const headLabels: string[] = [
  "Transaction Id",
  "Nonce",
  "Actions",
  "Created At",
  "Status",
];

function StagedTransactionsView(): JSX.Element {
  const { stagedTransactions, averageStagedTime, error }: UseTransactionsAsync =
    useTransactionsAsync();
  const renderTransactionsTableRow = TransactionTableRow({
    transactions: stagedTransactions,
  });
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
          <TransactionTableHeader labels={headLabels} />
        </thead>
        <tbody>{renderTransactionsTableRow()}</tbody>
      </Table>
    </div>
  );
}

export default StagedTransactionsView;
