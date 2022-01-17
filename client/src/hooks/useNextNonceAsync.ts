import { useQuery, UseQueryResult } from "react-query";
import { NEXT_NONCE_URL } from "../utils/config";
import api from "../utils/instance";
import { Nonce } from "../types";

// use type more than interface to define types specific
type NonceResponse = {
  status: string;
  isLoading: boolean;
  isSuccess: boolean;
  nextNonce: Nonce | undefined;
  dataUpdatedAt: number | Date;
  error: any;
};

function useNextNonceAsync(): NonceResponse {
  const fetcher = (): Promise<Nonce> =>
    api.get(NEXT_NONCE_URL).then((response) => response.data);
  const {
    status,
    isLoading,
    isSuccess,
    data,
    dataUpdatedAt,
    error,
  }: UseQueryResult<Nonce> = useQuery<Nonce>(NEXT_NONCE_URL, fetcher, {
    refetchInterval: 1000,
  });
  return {
    status,
    isLoading,
    isSuccess,
    nextNonce: data,
    dataUpdatedAt,
    error,
  };
}

export default useNextNonceAsync;

export type UseNextNonceAsync = ReturnType<typeof useNextNonceAsync>;
