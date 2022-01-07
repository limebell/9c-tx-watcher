import { Transaction } from "../../interfaces/Transaction";
import { ITransactionDao } from "./TransactionDao";
import MockDaoMock from "../MockDb/MockDao.mock";

class TransactionDao extends MockDaoMock implements ITransactionDao {
  public async getOne(txId: string): Promise<Transaction | null> {
    const db = await super.openDb();
    for (const transaction of db.transactions) {
      if (transaction.txId === txId) {
        return transaction;
      }
    }
    return null;
  }

  public async getAll(): Promise<Transaction[]> {
    const db = await super.openDb();
    return db.transactions;
  }

  public async add(transactions: Transaction[]): Promise<void> {
    const db = await super.openDb();
    if (
      transactions === undefined ||
      transactions === null ||
      transactions.length === 0
    ) {
      return;
    }

    transactions.forEach((transaction) => {
      db.transactions.push(transaction);
    });
    await super.saveDb(db);
  }

  // If the given transaction does not exists, add it to the database.
  public async update(transactions: Transaction[]): Promise<void> {
    const db = await super.openDb();
    if (
      transactions === undefined ||
      transactions === null ||
      transactions.length === 0
    ) {
      return;
    }

    const copy = transactions.slice();
    for (let i = 0; i < db.transactions.length; i++) {
      let index = copy.findIndex((tx) => tx.txId === db.transactions[i].txId);
      if (index !== -1) {
        db.transactions[i] = copy[index];
        copy.splice(index, 1);
        if (copy.length === 0) {
          break;
        }
      }
    }
    copy.forEach((tx: Transaction) => db.transactions.push(tx));
    await super.saveDb(db);
  }

  public async delete(txIds: string[]): Promise<void> {
    const db = await super.openDb();
    if (txIds === undefined || txIds === null || txIds.length === 0) {
      return;
    }

    const copy = txIds.slice();
    for (let i = 0; i < db.transactions.length; i++) {
      let index = copy.findIndex((txId) => txId === db.transactions[i].txId);
      if (index !== -1) {
        db.transactions.splice(i, 1);
        copy.splice(index, 1);
        i--;
        if (copy.length === 0) {
          break;
        }
      }
    }
    await super.saveDb(db);
  }
}

export default TransactionDao;
