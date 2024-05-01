// IIndexedDB.ts
import { ResultAsync } from 'neverthrow';
import { VolatileObject } from '../../objects/business/VolatileObject';  

export interface IIndexedDB {
  init(): ResultAsync<void, Error>;

  addVolatileObject(
    storeName: string,
    VolatileObject: VolatileObject
  ): ResultAsync<void, Error>;

  getVolatileObject(
    storeName: string,
    id: number
  ): ResultAsync<VolatileObject, Error>;

  getAllVolatileObjects(
    storeName: string
  ): ResultAsync<VolatileObject[], Error>;

  getAllItems(storeName: string): ResultAsync<VolatileObject[], Error>;
}

export const IIndexedDBType = Symbol.for("IIndexedDB");
