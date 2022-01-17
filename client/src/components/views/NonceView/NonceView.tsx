import React from "react";
import useNextNonceAsync, {
  UseNextNonceAsync,
} from "../../../hooks/useNextNonceAsync";

function NonceView(): JSX.Element {
  const { nextNonce, error }: UseNextNonceAsync = useNextNonceAsync();
  return (
    <div className="nonce-view">
      <h3>Next Nonce</h3>
      {error && <p>서버에 문제가 있습니다.</p>}
      <div>nextTxNonce: {nextNonce?.nextTxNonce}</div>
    </div>
  );
}

export default NonceView;
