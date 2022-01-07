import { AxiosResponse } from "axios";
import api from "./instance";

interface ApiRequest {
  getAddresses(): Promise<AxiosResponse>;
  getNextNonce(): Promise<AxiosResponse>;
  getTransactions(): Promise<AxiosResponse>;
}

class Api implements ApiRequest {
  getAddresses(): Promise<AxiosResponse> {
    return api.get("/api/transactions/addresses");
  }

  getNextNonce(): Promise<AxiosResponse> {
    return api.get("/api/transactions/nonce");
  }

  getTransactions(): Promise<AxiosResponse> {
    return api.get("/api/transactions/all");
  }
}

export default new Api();
