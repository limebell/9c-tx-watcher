import React, { useEffect, useState, useCallback } from "react";
import apiRequest from "../../utils/api-request";

function NextNonceContainer(): JSX.Element {
  const fetchNextNonce = useCallback(async () => {
    try {
      const response = await apiRequest.getNextNonce();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const interval = setInterval(fetchNextNonce, 1000);
    }
    return () => {
      mounted = false;
    };
  }, [fetchNextNonce]);
  return (
    <div>
      <h1>NextNonceContainer</h1>
    </div>
  );
}

export default NextNonceContainer;
