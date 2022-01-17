import { useQuery, UseQueryResult } from "react-query";
import { ADDRESSES_URL } from "../utils/config";
import api from "../utils/instance";
import { Address } from "../types";

type AddressResponse = {
  status: string;
  isLoading: boolean;
  isSuccess: boolean;
  addresses: Address | undefined;
  dataUpdatedAt: number | Date;
  error: any;
};

function useAddressAsync(): AddressResponse {
  const fetcher = (): Promise<Address> =>
    api.get(ADDRESSES_URL).then((response) => response.data);
  const {
    status,
    isLoading,
    isSuccess,
    data,
    dataUpdatedAt,
    error,
  }: UseQueryResult<Address> = useQuery<Address>(ADDRESSES_URL, fetcher, {
    refetchInterval: 1000,
  });
  return {
    status,
    isLoading,
    isSuccess,
    addresses: data,
    dataUpdatedAt,
    error: error,
  };
}

export default useAddressAsync;

export type UseAddressAsync = ReturnType<typeof useAddressAsync>;
