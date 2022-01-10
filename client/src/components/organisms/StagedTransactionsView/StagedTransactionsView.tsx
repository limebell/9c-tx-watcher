import React from "react";
import { StagedTransactions, Transaction } from "../../../types";
import style from "./StagedTransactionsView.module.scss";
import classnames from "classnames";

const cx = classnames.bind(style);

interface StagedTransactionsReuquestProps {
  stagedTransactions: StagedTransactions | any;
  fetchSuccess: boolean;
}

function StagedTransactionsView(
  props: StagedTransactionsReuquestProps
): JSX.Element {
  const { stagedTransactions, fetchSuccess } = props;
  return (
    <div className={cx("staged-transactions-view")}>
      <h2>
        Staged Transactions:{" "}
        {fetchSuccess && typeof stagedTransactions?.length === "number"
          ? stagedTransactions?.length
          : 0}
      </h2>
      <table>
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
          {fetchSuccess &&
            stagedTransactions?.map((transaction: Transaction) => {
              return (
                <tr key={transaction.txId}>
                  <td className="tx-id">{transaction.txId}</td>
                  <td className="transaction-nonce">{transaction.nonce}</td>
                  <td className="transaction-actions">
                    {transaction.actions[0]}
                  </td>
                  <td className="transaction-createdAt">
                    {new Date(transaction.createdAt).toUTCString()}
                  </td>
                  <td className="transaction-status">{transaction.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default StagedTransactionsView;
