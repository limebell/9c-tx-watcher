import { Transaction } from "../../interfaces/Transaction";

export interface ITransactionDao {
  getOne: (txId: string) => Promise<Transaction | null>;
  getAll: () => Promise<Transaction[]>;
  add: (transactions: Transaction[]) => Promise<void>;
  update: (transactions: Transaction[]) => Promise<void>;
  delete: (txIds: string[]) => Promise<void>;
}

class TransactionDao implements ITransactionDao {
  /**
   * @param txId
   */
  public getOne(txId: string): Promise<Transaction | null> {
    // TODO
    return Promise.resolve(null);
  }

  /**
   *
   */
  public getAll(): Promise<Transaction[]> {
    // TODO
    return Promise.resolve([]);
  }

  /**
   *
   * @param transaction
   */
  public async add(transactions: Transaction[]): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  /**
   *
   * @param transaction
   */
  public async update(transactions: Transaction[]): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  /**
   *
   * @param txId
   */
  public async delete(txIds: string[]): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }
}

export default TransactionDao;
