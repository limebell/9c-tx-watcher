export interface Address {
  sourceAddress: string | undefined;
  targetAddress: string | undefined;
}
export interface Nonce {
  nextTxNonce: number;
}

export interface TransactionResponseData {
  stagedTransactions: Array<Transaction> | undefined;
  discardedTransactions: Array<Transaction> | undefined;
  averageStagedTime: number | undefined;
}

export interface Transaction {
  actions: string[];
  txId: string;
  nonce: number;
  createdAt: number;
  stagedAt: number;
  status: number;
}
