export enum TransactionStatus {
  Pending,
  Staged,
  Included,
  Discarded,
}

export interface Transaction {
  actions: string[];
  txId: string;
  nonce: number;
  createdAt: string;
  status: TransactionStatus;
}
