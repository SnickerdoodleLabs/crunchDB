import {
  ERecordKey,
  VersionedObject,
  PersistenceError,
} from 'crunchDB/objects';
import { inject, injectable } from 'inversify';
import { errAsync, okAsync, ResultAsync } from 'neverthrow';

import { getObjectStoreDefinitions } from 'crunchDB/implementations/business/volatile/objectStores';
import {
  IPersistenceConfigProvider,
  IPersistenceConfigProviderType,
} from 'crunchDB/implementations/business/volatile/IPersistenceConfigProvider';
import { IVolatileStorageSchemaProvider } from 'crunchDB/implementations/business/volatile/IVolatileStorageSchemaProvider';
import { VolatileTableIndex } from 'crunchDB/implementations/business/volatile/VolatileTableIndex';

@injectable()
export class VolatileStorageSchemaProvider
  implements IVolatileStorageSchemaProvider {
  public constructor(
    @inject(IPersistenceConfigProviderType)
    protected configProvider: IPersistenceConfigProvider
  ) {}

  public getCurrentVersionForTable(
    tableName: ERecordKey
  ): ResultAsync<number, PersistenceError> {
    return this.getVolatileStorageSchema().andThen(schema => {
      const volatileTableIndex = schema.get(tableName);
      if (volatileTableIndex == null) {
        return errAsync(
          new PersistenceError('no schema present for table', tableName)
        );
      }
      return okAsync(volatileTableIndex.migrator.getCurrentVersion());
    });
  }

  public getVolatileStorageSchema(): ResultAsync<
    Map<ERecordKey, VolatileTableIndex<VersionedObject>>,
    never
  > {
    return this.configProvider
      .getConfig()
      .map(config => getObjectStoreDefinitions(config));
  }
}
