export interface Address {
  sourceAddress: string | undefined;
  targetAddress: string | undefined;
}
export interface Nonce {
  nextTxNonce: number;
}

export interface StagedTransactions {
  stagedTransactions: Array<Transaction> | undefined;
  transactions: Array<Transaction> | undefined;
}

export interface Transaction {
  actions: string[];
  txId: string;
  nonce: number;
  createdAt: string | number | Date;
  status: number;
}
