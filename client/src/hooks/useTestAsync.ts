import { useQuery } from "react-query";
import { STAGED_TRANSACTIONS_URL } from "../utils/config";
import { TransactionResponseData, Transaction } from "../types";
import api from "../utils/instance";

type TransactionResponse = {
  status: string;
  isLoading: boolean;
  isSuccess: boolean;
  stagedTransactions: Transaction[] | undefined;
  discardedTransactions: Transaction[] | undefined;
  averageStagedTime: number | undefined;
  dataUpdatedAt: number | Date;
  error: any;
};

export default function useTestAsync(): TransactionResponse {
  const fetcher = (): Promise<TransactionResponseData> =>
    api.get(STAGED_TRANSACTIONS_URL).then((response) => response.data);
  const { status, isLoading, isSuccess, data, error, dataUpdatedAt } = useQuery(
    STAGED_TRANSACTIONS_URL,
    fetcher
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

export type UseTestAsync = ReturnType<typeof useTestAsync>;
