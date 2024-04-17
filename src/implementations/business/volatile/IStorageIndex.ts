import { EBackupPriority, StorageKey } from '@crunchDB/objects';

export interface IStorageIndex {
  name: StorageKey;
  priority: EBackupPriority;
  backupInterval: number;
}
