import { injectable } from 'inversify';
import { ResultAsync } from 'neverthrow';
import { IDBConfig } from 'crunchDB/objects/business/IDBConfig';
import { VolatileObject } from 'crunchDB/objects/business/SimpleObject';
import { IIndexedDB } from 'crunchDB/interfaces/business/IIndexedDB';

@injectable()
export class IndexedDB implements IIndexedDB {
  private db: IDBDatabase | null = null;

  constructor(private config: IDBConfig) {}

  init(): ResultAsync<void, Error> {
    return ResultAsync.fromPromise(
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open(this.config.dbName, this.config.version);
        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
          const db = request.result;
          for (const storeConfig of this.config.stores) {
            if (!db.objectStoreNames.contains(storeConfig.name)) {
              const store = db.createObjectStore(storeConfig.name, {
                keyPath: storeConfig.keyPath,
                autoIncrement: storeConfig.autoIncrement ?? false,
              });

              storeConfig.indices?.forEach(index => {
                store.createIndex(index.name, index.keyPath, index.options);
              });
            }
          }
        };
        request.onsuccess = () => {
          this.db = request.result;
          resolve();
        };
        request.onerror = () => reject(new Error('Failed to open database'));
      }),
      e => new Error(`Database initialization failed: ${e}`)
    );
  }

  addObject(
    storeName: string,
    VolatileObject: VolatileObject
  ): ResultAsync<void, Error> {
    return this.transaction(storeName, 'readwrite', store =>
      store.add(VolatileObject)
    ).map(() => undefined);
  }

  getObject(
    storeName: string,
    id: number
  ): ResultAsync<VolatileObject, Error> {
    return this.transaction(storeName, 'readonly', store => store.get(id));
  }

  getAllObjects(
    storeName: string
  ): ResultAsync<VolatileObject[], Error> {
    return ResultAsync.fromPromise(
      new Promise<VolatileObject[]>((resolve, reject) => {
        if (!this.db) return reject(new Error('DB is not initialized'));
        const transaction = this.db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.openCursor();
        const VolatileObjects: VolatileObject[] = [];

        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor) {
            VolatileObjects.push(cursor.value);
            cursor.continue();
          } else {
            resolve(VolatileObjects);
          }
        };

        transaction.onerror = () => reject(new Error('Transaction failed'));
        request.onerror = () => reject(new Error('Request failed'));
      }),
      e => new Error(`Error fetching all VolatileObjects: ${e}`)
    );
  }

  getAllItems(storeName: string): ResultAsync<VolatileObject[], Error> {
    return ResultAsync.fromPromise(
      new Promise<VolatileObject[]>((resolve, reject) => {
        if (!this.db) {
          reject(new Error('DB is not initialized'));
          return;
        }
        const transaction = this.db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.openCursor();
        const items: VolatileObject[] = [];

        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor) {
            items.push(cursor.value);
            cursor.continue();
          } else {
            resolve(items); // Resolve the array of items once cursor has iterated through all the entries
          }
        };

        transaction.onerror = () => reject(new Error('Transaction failed'));
        request.onerror = () => reject(new Error('Cursor operation failed'));
      }),
      e => new Error(`Error fetching all items with cursor: ${e}`)
    );
  }

  private transaction<T>(
    storeName: string,
    mode: IDBTransactionMode,
    action: (store: IDBObjectStore) => IDBRequest<T>
  ): ResultAsync<T, Error> {
    return ResultAsync.fromPromise(
      new Promise<T>((resolve, reject) => {
        if (!this.db) return reject(new Error('DB is not initialized'));
        const transaction = this.db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const request = action(store);

        transaction.oncomplete = () => resolve(request.result);
        transaction.onerror = () => reject(new Error('Transaction failed'));
        request.onerror = () => reject(new Error('Request operation failed'));
      }),
      e => new Error(`Transaction error: ${e}`)
    );
  }
}
