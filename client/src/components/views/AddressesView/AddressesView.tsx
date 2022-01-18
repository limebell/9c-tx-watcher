import React from "react";
import classNames from "classnames";
import useAddressAsync, {
  UseAddressAsync,
} from "../../../hooks/useAddressAsync";
import styles from "./AddressView.scss";

const cx = classNames.bind(styles);

function AddressesView(): JSX.Element {
  const { addresses, error }: UseAddressAsync = useAddressAsync();
  return (
    <div className={cx("address-view")}>
      <h3>Addresses</h3>
      {error && <p>서버에 문제가 있습니다.</p>}
      <div className={cx("address-view", "description")}>
        <div className={cx("address-type")}>Source address: </div>
        <pre className={cx("address")}>
          {addresses?.sourceAddress || "null"}
        </pre>
      </div>
      <div className={cx("address-view", "description")}>
        <div className={cx("address-type")}>Target address: </div>
        <pre className={cx("address")}>
          {addresses?.targetAddress || "null"}
        </pre>
      </div>
    </div>
  );
}

export default AddressesView;
