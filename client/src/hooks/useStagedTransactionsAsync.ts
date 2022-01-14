import useSWR, { SWRResponse } from "swr";
import { STAGED_TRANSACTIONS_URL } from "../utils/config";
import api from "../utils/instance";
import { StagedTransactions, Transaction } from "../types";

type StagedTransactionResponse = {
  stagedTransactions: Transaction[] | undefined;
  error: any;
};

function useStagedTransactionsAsync(): StagedTransactionResponse {
  const fetcher = (): Promise<StagedTransactions> =>
    api.get(STAGED_TRANSACTIONS_URL).then((response) => response.data);
  const { data, error }: SWRResponse = useSWR<StagedTransactions>(
    STAGED_TRANSACTIONS_URL,
    fetcher
  );
  return {
    stagedTransactions: data?.stagedTransactions,
    error: error,
  };
}

export default useStagedTransactionsAsync;

export type UseStagedTransactionsAsync = ReturnType<
  typeof useStagedTransactionsAsync
>;
