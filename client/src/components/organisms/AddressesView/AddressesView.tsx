import React from "react";
import { Address } from "../../../types";

interface AddressesViewProps {
  addresses: Address;
  fetchSuccess?: boolean;
}

function AddressesView(props: AddressesViewProps): JSX.Element {
  const { fetchSuccess, addresses } = props;
  return (
    <div className="address-view">
      Address View
      <div>
        source address:{" "}
        {fetchSuccess
          ? !addresses.sourceAddress
            ? "null"
            : addresses.sourceAddress
          : "null"}
      </div>
      <div>
        target address:{" "}
        {fetchSuccess
          ? !addresses.targetAddress
            ? "null"
            : addresses.targetAddress
          : "null"}
      </div>
    </div>
  );
}

export default AddressesView;
