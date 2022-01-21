import React from "react";

interface HeaderProps<T> {
  labels: T[];
}

function TableHeader<T>({ labels, ...props }: HeaderProps<T>): JSX.Element {
  return (
    <tr>
      {labels.map((label: T, index: number) => {
        return (
          <th key={index} {...props}>
            {label}
          </th>
        );
      })}
    </tr>
  );
}

export default TableHeader;
