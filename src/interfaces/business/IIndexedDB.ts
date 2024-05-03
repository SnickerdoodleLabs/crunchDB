// IIndexedDB.ts
import { ResultAsync } from 'neverthrow';
import { SimpleObject } from 'crunchDB/objects/business/SimpleObject';

export interface IIndexedDB {
  init(): ResultAsync<void, Error>;

  addObject(
    storeName: string,
    VolatileObject: SimpleObject
  ): ResultAsync<void, Error>;

  getObject(storeName: string, id: number): ResultAsync<SimpleObject, Error>;

  getAllObjects(storeName: string): ResultAsync<SimpleObject[], Error>;

  getAllItems(storeName: string): ResultAsync<SimpleObject[], Error>;
}

export const IIndexedDBType = Symbol.for('IIndexedDB');
