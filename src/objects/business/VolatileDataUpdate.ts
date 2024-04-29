import {
  EDataUpdateOpCode,
  VolatileStorageKey,
  UnixTimestamp,
  VersionedObject,
} from 'crunchDB/objects';

export class VolatileDataUpdate {
  public constructor(
    public operation: EDataUpdateOpCode,
    // auto-incremented keys can not be evaluated from the data that is why we could have a null key
    public key: VolatileStorageKey | null,
    public timestamp: UnixTimestamp,
    public value: VersionedObject,
    public version: number
  ) {}
}
