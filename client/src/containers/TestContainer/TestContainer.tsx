import React, { useCallback } from "react";
import useSWR, { SWRResponse } from "swr";
import apiRequest from "../../utils/api-request";
import api from "../../utils/instance";
import { Transaction } from "../../types";

function TestContainer(): JSX.Element {
  const fetcher = (url: string) =>
    api.get(url).then((response) => response.data.stagedTransactions);
  const url = "/api/transactions/all";
  const { data, error }: SWRResponse = useSWR<Array<Transaction>>(url, fetcher);
  if (error)
    return (
      <div>
        <h1>failed to load</h1>
      </div>
    );
  if (!data) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>Test Container</h1>
      <div>{JSON.stringify(data)}</div>
  return (
    <div>
      <h1>Test Container</h1>
    </div>
  );
}

export default TestContainer;
