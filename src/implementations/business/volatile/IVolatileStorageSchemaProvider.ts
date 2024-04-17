import {
  ERecordKey,
  PersistenceError,
  VersionedObject,
} from '@crunchDB/objects';
import { ResultAsync } from 'neverthrow';

import { VolatileTableIndex } from '@crunchDB/implementations/business/volatile/VolatileTableIndex';

export interface IVolatileStorageSchemaProvider {
  getVolatileStorageSchema(): ResultAsync<
    Map<ERecordKey, VolatileTableIndex<VersionedObject>>,
    never
  >;

  getCurrentVersionForTable(
    tableName: ERecordKey
  ): ResultAsync<number, PersistenceError>;
}

export const IVolatileStorageSchemaProviderType = Symbol.for(
  'IVolatileStorageSchemaProvider'
);
