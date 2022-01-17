const BASE_API_URL = "/api" as const;
const BASE_TRANSACTIONS_URL = "/transactions" as const;
export const STAGED_TRANSACTIONS_URL =
  BASE_API_URL + BASE_TRANSACTIONS_URL + "/all";
export const NEXT_NONCE_URL = BASE_API_URL + BASE_TRANSACTIONS_URL + "/nonce";
export const ADDRESSES_URL =
  BASE_API_URL + BASE_TRANSACTIONS_URL + "/addresses";
