import useSWR, { SWRResponse } from "swr";
import { NEXT_NONCE_URL } from "../utils/config";
import api from "../utils/instance";
import { Nonce } from "../types";

// use type more than interface to define types specific
type NonceResponse = {
  nextNonce: Nonce | undefined;
  error: any;
};

function useNextNonceAsync(): NonceResponse {
  const fetcher = (): Promise<Nonce> =>
    api.get(NEXT_NONCE_URL).then((response) => response.data);
  const { data, error }: SWRResponse = useSWR<Nonce>(NEXT_NONCE_URL, fetcher);
  return {
    nextNonce: data,
    error: error,
  };
}

export default useNextNonceAsync;

export type UseNextNonceAsync = ReturnType<typeof useNextNonceAsync>;
