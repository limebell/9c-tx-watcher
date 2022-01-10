export interface Address {
  sourceAddress: string | undefined;
  targetAddress: string | undefined;
}

export interface Nonce {
  nextNonce: string | undefined;
}

export interface StagedTransactions {
  stagedTransactions: Array<Transaction> | undefined;
  transactions: Array<Transaction> | undefined;
}

export interface Transaction {
  actions: Array<string | undefined>;
  txId: string | undefined;
  nonce: number | undefined;
  createdAt: string | number | Date;
  status: number | undefined;
}
