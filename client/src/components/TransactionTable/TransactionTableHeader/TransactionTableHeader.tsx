import React from "react";

interface HeaderProps<T> {
  labels: T[];
}

function TransactionTableHeader<T>({ labels }: HeaderProps<T>): JSX.Element {
  return (
    <tr>
      {labels.map((label: T, index: number) => {
        return <th key={index}>{label}</th>;
      })}
    </tr>
  );
}

export default TransactionTableHeader;
