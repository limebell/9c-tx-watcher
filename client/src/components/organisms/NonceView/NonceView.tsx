import React from "react";
import { Nonce } from "../../../types";

interface NonceViewProps {
  nextNonce: Nonce;
  fetchSuccess: boolean;
}

function NonceView(props: NonceViewProps): JSX.Element {
  const { nextNonce, fetchSuccess } = props;
  return (
    <div className="nonce-view">
      NextNonceView
      <div>
        nextNonce:{" "}
        {fetchSuccess
          ? !nextNonce.nextNonce
            ? "null"
            : nextNonce.nextNonce
          : "null"}
      </div>
    </div>
  );
}

export default NonceView;
