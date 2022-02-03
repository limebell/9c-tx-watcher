import React from "react";
import classNames from "classnames";
import styles from "./DiscardedTransactionsView.scss";
import useTransactionsAsync, {
  UseTransactionsAsync,
} from "../../../hooks/useTransactionsAsync";
import { Table } from "react-bootstrap";
import TableHeader from "../../Table/TableHeader";
import TransactionTableRow from "../../Table/TransactionTable/TransactionTableRow";

const cx = classNames.bind(styles);
const headLabels: string[] = [
  "Transaction Id",
  "Nonce",
  "Actions",
  "Created At",
  "Status",
];

function DiscardedTransactionsView(): JSX.Element {
  const { discardedTransactions, error }: UseTransactionsAsync =
    useTransactionsAsync();
  const renderTransactionsTableRow = TransactionTableRow({
    transactions: discardedTransactions,
  });
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
          <TableHeader labels={headLabels} />
        </thead>
        <tbody>{renderTransactionsTableRow()}</tbody>
      </Table>
    </div>
  );
}

export default DiscardedTransactionsView;
