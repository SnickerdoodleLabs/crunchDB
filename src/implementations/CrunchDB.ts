import { injectable } from 'inversify';
import { ICrunchDB } from 'crunchDB/interfaces/ICrunchDB';
import {
  IIndexedDB,
  IIndexedDBType,
} from 'crunchDB/interfaces/business/IIndexedDB';

@injectable()
export class CrunchDB implements ICrunchDB {
  private dbService: IIndexedDB;

  constructor(@inject(IIndexedDBType) dbService: IIndexedDB) {
    this.dbService = dbService;
  }

  async initializeDatabase(): Promise<void> {
    this.dbService
      .init()
      .map(() => {
        console.log('Database initialized successfully.');
      })
      .mapErr(e => {
        console.error(`Failed to initialize database: ${e.message}`);
      });
  }
}
