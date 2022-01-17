import { useQuery } from "react-query";
import { STAGED_TRANSACTIONS_URL } from "../utils/config";
import { StagedTransactions, Transaction } from "../types";
import api from "../utils/instance";

type StagedTransactionResponse = {
  status: string;
  isLoading: boolean;
  isSuccess: boolean;
  stagedTransactions: Transaction[] | undefined;
  dataUpdatedAt: number | Date;
  error: any;
};

export default function useTestAsync(): StagedTransactionResponse {
  const fetcher = (): Promise<StagedTransactions> =>
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
    dataUpdatedAt,
  };
}

export type UseTestAsync = ReturnType<typeof useTestAsync>;
