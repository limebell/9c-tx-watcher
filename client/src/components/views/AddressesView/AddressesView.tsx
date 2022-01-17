import React from "react";
import useAddressAsync, {
  UseAddressAsync,
} from "../../../hooks/useAddressAsync";

function AddressesView(): JSX.Element {
  const { addresses, error }: UseAddressAsync = useAddressAsync();
  return (
    <div className="address-view">
      <h3>Addresses</h3>
      {error && <p>서버에 문제가 있습니다.</p>}
      <div>source address: {addresses?.sourceAddress || "null"}</div>
      <div>target address: {addresses?.targetAddress || "null"}</div>
    </div>
  );
}

export default AddressesView;
