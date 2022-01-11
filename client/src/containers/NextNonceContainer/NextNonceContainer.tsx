import React, { useEffect, useState, useCallback } from "react";
import apiRequest from "../../utils/api-request";
import { Nonce } from "../../types";
import NonceView from "../../components/organisms/NonceView";
import axios from "axios";

function NextNonceContainer(): JSX.Element {
  const [nextNonce, setNextNonce] = useState<Nonce>({
    nextNonce: "",
  });
  const [fetchSuccess, setFectchSuccess] = useState<boolean>(false);

  const fetchNextNonce = useCallback(async () => {
    try {
      const response = await apiRequest.getNextNonce();
      setNextNonce((prev) => {
        return {
          ...prev,
          nextNonce: response.data.nextNonce || undefined,
        };
      });
      setFectchSuccess(true);
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    const source = axios.CancelToken.source();
    if (mounted) {
      setInterval(fetchNextNonce, 1000);
    }

    return () => {
      mounted = false;
      source.cancel();
    };
  }, [fetchNextNonce]);
  return <NonceView nextNonce={nextNonce} fetchSuccess={fetchSuccess} />;
}

export default NextNonceContainer;
