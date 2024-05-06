// import {
//     PersistenceError,
//     VersionedObject,
//     VolatileStorageMetadata,
//   } from "@snickerdoodlelabs/objects";
  import { DataObject, PersistenceError } from "crunchDB/objects";
import { ResultAsync } from "neverthrow";
  
  export interface IVolatileCursor<T extends DataObject> {
    nextValue(): ResultAsync<T | null, PersistenceError>;
    allValues(): ResultAsync<T[] | null, PersistenceError>;
  
    _next(): ResultAsync<VolatileStorageMetadata<T> | null, PersistenceError>;
    _all(): ResultAsync<VolatileStorageMetadata<T>[], PersistenceError>;
  }
  