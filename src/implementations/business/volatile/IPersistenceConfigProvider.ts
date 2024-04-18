import { ResultAsync } from 'neverthrow';

import { IPersistenceConfig } from 'crunchDB/implementations/business/volatile/IPersistenceConfig.js';

export interface IPersistenceConfigProvider {
  getConfig(): ResultAsync<IPersistenceConfig, never>;
}

export const IPersistenceConfigProviderType = Symbol.for(
  'IPersistenceConfigProvider'
);
