import { Transaction } from "../../interfaces/Transaction";

export interface ITransactionDao {
  getOne: (txId: string) => Promise<Transaction | null>;
  getAll: () => Promise<Transaction[]>;
  add: (transaction: Transaction) => Promise<void>;
  update: (transaction: Transaction) => Promise<void>;
  delete: (txId: string) => Promise<void>;
}

class UserDao implements ITransactionDao {
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
  public async add(transaction: Transaction): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  /**
   *
   * @param transaction
   */
  public async update(transaction: Transaction): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  /**
   *
   * @param txId
   */
  public async delete(txId: string): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }
}

export default UserDao;
