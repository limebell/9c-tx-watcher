import React from "react";
import classNames from "classnames";
import styles from "./Td.scss";

interface TdProps {
  children: React.ReactNode;
  className: string;
  style?: object;
}

const cx = classNames.bind(styles);

function Td({ children, className, style, ...rest }: TdProps): JSX.Element {
  return (
    <td className={cx("td", className)} style={style} {...rest}>
      {children}
    </td>
  );
}

export default Td;
