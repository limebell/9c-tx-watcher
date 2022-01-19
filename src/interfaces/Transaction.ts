export enum TransactionStatus {
  Pending1,
  Staged,
  Pending2,
  Included,
  Discarded,
}

export interface Transaction {
  actions: string[];
  txId: string;
  nonce: number;
  createdAt: number;
  stagedAt: number;
  status: TransactionStatus;
}
