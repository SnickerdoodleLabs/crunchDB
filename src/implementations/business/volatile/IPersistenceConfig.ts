import { URLString } from '@crunchDB/objects';

export interface IPersistenceConfig {
  accountBalancePollingIntervalMS: number;
  accountNFTPollingIntervalMS: number;
  backupChunkSizeTarget: number;
  defaultInsightPlatformBaseUrl: URLString;
  defaultGoogleCloudBucket: string;
  restoreTimeoutMS: number;
  enableBackupEncryption: boolean;
  dataWalletBackupIntervalMS: number;
  ipfsFetchBaseUrl: URLString;

  dropboxAppKey: string;
  dropboxAppSecret: string;
  dropboxRedirectUri: string;
}
