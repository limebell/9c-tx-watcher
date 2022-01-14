import React from "react";
import { Nonce } from "../../../types";

interface NonceViewProps {
  nextNonce: Nonce;
  fetchSuccess: boolean;
}

function NonceView({ nextNonce, fetchSuccess }: NonceViewProps): JSX.Element {
  return (
    <div className="nonce-view">
      <h3>NextNonceView</h3>
      <div>nextTxNonce: {nextNonce?.nextTxNonce}</div>
    </div>
  );
}

export default NonceView;
