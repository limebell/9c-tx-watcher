import { useQuery, UseQueryResult } from "react-query";
import { STAGED_TRANSACTIONS_URL } from "../utils/config";
import api from "../utils/instance";
import { TransactionResponseData, Transaction } from "../types";

type TransactionsResponse = {
  status: string;
  isLoading: boolean;
  isSuccess: boolean;
  stagedTransactions: Transaction[] | undefined;
  discardedTransactions: Transaction[] | undefined;
  averageStagedTime: number | undefined;
  dataUpdatedAt: number | Date;
  error: any;
};
function useTransactionsAsync(): TransactionsResponse {
  const fetcher = (): Promise<TransactionResponseData> =>
    api.get(STAGED_TRANSACTIONS_URL).then((response) => response.data);
  const {
    status,
    isLoading,
    isSuccess,
    data,
    error,
    dataUpdatedAt,
  }: UseQueryResult<TransactionResponseData> = useQuery<TransactionResponseData>(
    STAGED_TRANSACTIONS_URL,
    fetcher,
    { refetchInterval: 1000 }
  );
  return {
    status,
    isLoading,
    isSuccess,
    error,
    stagedTransactions: data?.stagedTransactions,
    discardedTransactions: data?.discardedTransactions,
    averageStagedTime: data?.averageStagedTime,
    dataUpdatedAt,
  };
}

export default useTransactionsAsync;

export type UseTransactionsAsync = ReturnType<typeof useTransactionsAsync>;
