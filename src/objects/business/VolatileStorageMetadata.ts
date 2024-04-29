import { VersionedObject, EBoolean, UnixTimestamp } from 'crunchDB/objects';

export const DatabaseVersion = 3;
export const VolatileStorageDataKey = 'data';
export const VolatileStorageMetadataIndexes: [string, boolean][] = [
  ['deleted', false],
  ['version', false],
  ['lastUpdate', false],
];

export class VolatileStorageMetadata<T extends VersionedObject> {
  public constructor(
    public data: T,
    public lastUpdate: UnixTimestamp,
    public version: number,
    public deleted: EBoolean = EBoolean.FALSE
  ) {}
}
