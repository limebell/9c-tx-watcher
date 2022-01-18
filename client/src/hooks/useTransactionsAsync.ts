import { useQuery, UseQueryResult } from "react-query";
import { STAGED_TRANSACTIONS_URL } from "../utils/config";
import api from "../utils/instance";
import { StagedTransactions, Transaction } from "../types";

type TransactionsResponse = {
  status: string;
  isLoading: boolean;
  isSuccess: boolean;
  stagedTransactions: Transaction[] | undefined;
  discardedTransactions: Transaction[] | undefined;
  dataUpdatedAt: number | Date;
  error: any;
};
function useTransactionsAsync(): TransactionsResponse {
  const fetcher = (): Promise<StagedTransactions> =>
    api.get(STAGED_TRANSACTIONS_URL).then((response) => response.data);
  const {
    status,
    isLoading,
    isSuccess,
    data,
    error,
    dataUpdatedAt,
  }: UseQueryResult<StagedTransactions> = useQuery<StagedTransactions>(
    STAGED_TRANSACTIONS_URL,
    fetcher,
    { refetchInterval: 1000 }
  );
  const discardedTransactions = data?.transactions?.filter(
    (transaction: Transaction) => transaction.status === 4
  );
  return {
    status,
    isLoading,
    isSuccess,
    error,
    stagedTransactions: data?.stagedTransactions,
    discardedTransactions,
    dataUpdatedAt,
  };
}

export default useTransactionsAsync;

export type UseTransactionsAsync = ReturnType<typeof useTransactionsAsync>;
