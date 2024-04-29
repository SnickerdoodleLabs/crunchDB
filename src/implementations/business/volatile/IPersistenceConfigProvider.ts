import { ResultAsync } from 'neverthrow';

import { IPersistenceConfig } from 'crunchDB/implementations/business/volatile/IPersistenceConfig';

export interface IPersistenceConfigProvider {
  getConfig(): ResultAsync<IPersistenceConfig, never>;
}

export const IPersistenceConfigProviderType = Symbol.for(
  'IPersistenceConfigProvider'
);
