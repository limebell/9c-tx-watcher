import React from "react";

type HeaderProps = {
  labels: (string | number)[];
};

function TransactionTableHeader({ labels }: HeaderProps): JSX.Element {
  return (
    <tr>
      {labels.map((label: string | number, index: number) => {
        return <th key={index}>{label}</th>;
      })}
    </tr>
  );
}

export default TransactionTableHeader;
