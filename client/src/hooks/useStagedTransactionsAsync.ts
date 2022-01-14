import useSWR from "swr";
import { STAGED_TRANSACTIONS_URL } from "../utils/config";
import api from "../utils/instance";
import { StagedTransactions } from "../types";

interface StagedTranasactionsAsyncResponse {
  stagedTransactions: StagedTransactions;
}

function useStagedTransactionsAsync() {
  const fetcher = () =>
    api.get(STAGED_TRANSACTIONS_URL).then((response) => response.data);
  const { data, error } = useSWR(STAGED_TRANSACTIONS_URL, fetcher);
}
