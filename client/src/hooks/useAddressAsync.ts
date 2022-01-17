import useSWR, { SWRResponse } from "swr";
import { ADDRESSES_URL } from "../utils/config";
import api from "../utils/instance";
import { Address } from "../types";

type AddressResponse = {
  addresses: Address | undefined;
  error: any;
};

function useAddressAsync(): AddressResponse {
  const fetcher = (): Promise<Address> =>
    api.get(ADDRESSES_URL).then((response) => response.data);
  const { data, error }: SWRResponse = useSWR<Address>(ADDRESSES_URL, fetcher);
  return {
    addresses: data,
    error: error,
  };
}

export default useAddressAsync;

export type UseAddressAsync = ReturnType<typeof useAddressAsync>;
