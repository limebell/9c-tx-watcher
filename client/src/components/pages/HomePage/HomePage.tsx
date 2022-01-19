import React from "react";
import NonceView from "../../views/NonceView";
import PageTemplate from "../../templates/PageTemplate";
import StagedTransactionsView from "../../views/StagedTransactionsView";
import AddressesView from "../../views/AddressesView";
import DiscardedTransactionsView from "../../views/DiscardedTransactionsView";
import CircleButton from "../../props/CircleButton";
import classNames from "classnames";
import styles from "./HomePage.scss";

const cx = classNames.bind(styles);

const floatBtnStyle = {
  position: "fixed",
  float: "right",
  bottom: "20px",
  right: "40px",
  width: "4rem",
  height: "4rem",
  borderRadius: "50%",
};

function HomePage(): JSX.Element {
  return (
    <>
      <PageTemplate>
        <h1>9c Transaction Monitor</h1>
        <NonceView />
        <AddressesView />
        <StagedTransactionsView />
        <DiscardedTransactionsView />
      </PageTemplate>
      <a href="#root">
        <CircleButton
          className={cx("btn-float", "fixed")}
          style={floatBtnStyle}
          variant="primary"
        >
          위로
        </CircleButton>
      </a>
    </>
  );
}

export default HomePage;
