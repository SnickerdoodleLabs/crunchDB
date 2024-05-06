  import { ResultAsync } from "neverthrow";
  import { ECollectionName, DataObject, PersistenceError } from "crunchDB/objects";
  
  import { IVolatileCursor } from "@persistence/volatile/IVolatileCursor.js";
import { CollectionKeys } from "crunchDB/objects/primitive/CollectionKey";
  
  export interface IPersistence {
    getObject<T extends DataObject>(
      recordKey: ECollectionName,
      key: CollectionKeys,
    ): ResultAsync<T | null, PersistenceError>;
    getCursor<T extends DataObject>(
      recordKey: ECollectionName,
      indexName?: string,
      query?: IDBValidKey | IDBKeyRange,
      direction?: IDBCursorDirection | undefined,
      mode?: IDBTransactionMode,
    ): ResultAsync<IVolatileCursor<T>, PersistenceError>;
    getAll<T extends DataObject>(
      recordKey: ECollectionName,
      indexName?: string,
    ): ResultAsync<T[], PersistenceError>;
    getAllByIndex<T extends DataObject>(
      recordKey: ECollectionName,
      indexName: string,
      query: IDBValidKey | IDBKeyRange,
    ): ResultAsync<T[], PersistenceError>;
    getAllByMultiIndex<T extends DataObject>(
      recordKey: ECollectionName,
      indices: string[],
      values: IDBValidKey | IDBKeyRange,
    ): ResultAsync<T[], PersistenceError>;
    getAllKeys<T extends DataObject>(
      recordKey: ECollectionName,
      indexName?: string,
      query?: IDBValidKey | IDBKeyRange,
      count?: number | undefined,
    ): ResultAsync<T[], PersistenceError>;
    updateRecord<T extends DataObject>(
      recordKey: ECollectionName,
      value: T,
    ): ResultAsync<void, PersistenceError>;
    deleteRecord(
      recordKey: ECollectionName,
      key: CollectionKeys,
    ): ResultAsync<void, PersistenceError>;
    // #endregion
  
  }
  
  export const IPersistenceType = Symbol.for("IPersistence");
  