import React, { useEffect, useCallback, useState } from "react";
import apiRequest from "../../utils/api-request";
import { StagedTransactions } from "../../types";
import StagedTransactionsView from "../../components/organisms/StagedTransactionsView";
import useSWR, { SWRResponse } from "swr";
import api from "../../utils/instance";
import { STAGED_TRANSACTIONS_URL } from "../../utils/config";

function StagedTransactionsRequestContainer(): JSX.Element {
  const fetcher = (url: string) =>
    api.get(url).then((response) => response.data.stagedTransactions);
  const { data, error }: SWRResponse = useSWR(STAGED_TRANSACTIONS_URL, fetcher);
  return <StagedTransactionsView stagedTransactions={data} />;
}

export default StagedTransactionsRequestContainer;
