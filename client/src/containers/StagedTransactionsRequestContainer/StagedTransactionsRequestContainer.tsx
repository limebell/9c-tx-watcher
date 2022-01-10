import React, { useEffect, useCallback, useState } from "react";
import apiRequest from "../../utils/api-request";
import { StagedTransactions } from "../../types";
import StagedTransactionsView from "../../components/organisms/StagedTransactionsView";
import axios from "axios";

function StagedTransactionsRequestContainer(): JSX.Element {
  const [stagedTransactions, setStagedTransactions] = useState<
    Array<StagedTransactions>
  >([]);
  const [fetchSuccess, setFetchSuccess] = useState<boolean>(false);

  const fetchStagedTransactionData = useCallback(async () => {
    try {
      const response = await apiRequest.getTransactions();
      setStagedTransactions(response.data.stagedTransactions);
      setFetchSuccess(true);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    const source = axios.CancelToken.source();
    let mounted = true;
    if (mounted) {
      const interval = setInterval(fetchStagedTransactionData, 1000);
    }

    return () => {
      mounted = false;
      source.cancel();
    };
  }, [fetchStagedTransactionData]);
  return (
    <StagedTransactionsView
      stagedTransactions={stagedTransactions}
      fetchSuccess={fetchSuccess}
    />
  );
}

export default StagedTransactionsRequestContainer;
