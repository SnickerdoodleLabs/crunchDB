import { ContainerModule, interfaces } from 'inversify';
import { IndexedDB } from 'crunchDB/implementations/business/IndexedDB';
import {
  IIndexedDB,
  IIndexedDBType,
} from 'crunchDB/interfaces/business/IIndexedDB';
export const crunchDBModule = new ContainerModule(
  (
    bind: interfaces.Bind,
    _unbind: interfaces.Unbind,
    _isBound: interfaces.IsBound,
    _rebind: interfaces.Rebind
  ) => {
    bind<IIndexedDB>(IIndexedDBType)
      .to(IndexedDB)
      .inSingletonScope();
  }
);
