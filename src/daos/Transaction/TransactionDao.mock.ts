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

  public async add(transaction: Transaction): Promise<void> {
    const db = await super.openDb();
    db.transactions.push(transaction);
    await super.saveDb(db);
  }

  // If the given transaction does not exists, add it to the database.
  public async update(transaction: Transaction): Promise<void> {
    const db = await super.openDb();
    for (let i = 0; i < db.transactions.length; i++) {
      if (db.transactions[i].txId === transaction.txId) {
        db.transactions[i] = transaction;
        await super.saveDb(db);
        return;
      }
    }
    db.transactions.push(transaction);
    await super.saveDb(db);
  }

  public async delete(txId: string): Promise<void> {
    const db = await super.openDb();
    for (let i = 0; i < db.transactions.length; i++) {
      if (db.transactions[i].txId === txId) {
        db.transactions.splice(i, 1);
        await super.saveDb(db);
        return;
      }
    }
    throw new Error("Transaction not found");
  }
}

export default TransactionDao;
