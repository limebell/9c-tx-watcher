import jsonfile from "jsonfile";
import { Transaction } from "../../interfaces/Transaction";
import AsyncLock from "async-lock";

interface IDatabase {
  transactions: Transaction[];
}

class MockDaoMock {
  private readonly dbFilePath = "src/daos/MockDb/MockDb.json";
  private readonly lock = new AsyncLock();

  protected openDb(): Promise<IDatabase> {
    return this.lock.acquire("rw", () => {
      return jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
    });
  }

  protected saveDb(db: IDatabase): Promise<void> {
    return this.lock.acquire("rw", () => {
      return jsonfile.writeFile(this.dbFilePath, db);
    });
  }
}

export default MockDaoMock;
