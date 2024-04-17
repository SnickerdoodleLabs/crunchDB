import { ERecordKey, VersionedObject } from '@crunchDB/objects';

import { IPersistenceConfig } from '@crunchDB/implementations/business/volatile/IPersistenceConfig';
import { VolatileTableIndex } from '@crunchDB/implementations/business/volatile/VolatileTableIndex.js';

// This function generates a map of object store configurations for IndexedDB.
// It takes an optional configuration object to customize the settings for each object store.
// We use this method in VolatileStorageSchemaProvider
const testTimeValue = 100000; // for use in indexedDB test
export const getObjectStoreDefinitions = (config?: IPersistenceConfig) => {
  return new Map<ERecordKey, VolatileTableIndex<VersionedObject>>([
    /*   [
      ERecordKey.ACCOUNT,
      new VolatileTableIndex(
        ERecordKey.ACCOUNT,
        ['sourceAccountAddress', false],
        new LinkedAccountMigrator(),
        EBackupPriority.HIGH,
        config?.dataWalletBackupIntervalMS ?? testTimeValue,
        0, // auto push
        [['sourceChain', false]]
      ),
    ], */
  ]);
};
