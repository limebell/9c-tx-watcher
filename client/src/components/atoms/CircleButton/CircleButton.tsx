import React from "react";
import { Button } from "react-bootstrap";
import classNames from "classnames";
import styles from "./CircleButton.scss";

interface FloatButtonProps {
  onClick?(): void;
  children: React.ReactNode;
  variant?: string;
  className?: string;
  style?: object;
}

const cx = classNames.bind(styles);

function CircleButton({
  onClick,
  children,
  style,
  variant,
  className,
  ...rest
}: FloatButtonProps): JSX.Element {
  return (
    <Button
      className={cx("btn-circle", className)}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default CircleButton;
