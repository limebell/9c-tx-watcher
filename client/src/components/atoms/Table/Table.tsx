import React from "react";
import classnames from "classnames";
import style from "./Table.module.scss";

const cx = classnames.bind(style);

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

function Table({ children, className, ...rest }: TableProps): JSX.Element {
  return (
    <table className={cx("table", className)} {...rest}>
      {children}
    </table>
  );
}

export default Table;
