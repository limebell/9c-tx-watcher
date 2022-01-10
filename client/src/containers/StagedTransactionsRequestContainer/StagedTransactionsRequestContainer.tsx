import React, { useEffect, useCallback, useState } from "react";
import apiRequest from "../../utils/api-request";

function StagedTransactionsRequestContainer(): JSX.Element {
  const [stagedTransactions, setStagedTransactions] = useState<Array<object>>(
    []
  );
  const fetchStagedTransactionData = useCallback(async () => {
    try {
      const response = await apiRequest.getTransactions();
      setStagedTransactions(() => {
        return [...response.data.stagedTransactions];
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const interval = setInterval(fetchStagedTransactionData, 1000);
    }
    return () => {
      mounted = false;
    };
  }, [fetchStagedTransactionData]);
  return (
    // Temporary DOM
    // TODO: create organism component and connect to container
    <div>
      <h1>StagedTransactionsContainer</h1>
    </div>
  );
}

export default StagedTransactionsRequestContainer;
