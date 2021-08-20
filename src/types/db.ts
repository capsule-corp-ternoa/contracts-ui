// Copyright 2021 @paritytech/canvas-ui-v2 authors & contributors

import type { Collection, Database } from '@textile/threaddb';
import type { PrivateKey } from '@textile/crypto';
import type { VoidFn } from './app';

export type { Collection, Database, PrivateKey }

interface Document {
  _id?: string;
}

export interface UserDocument extends Document {
  codeBundlesStarred: string[];
  contractsStarred: string[];
  publicKey: string;
  email?: string;
  name?: string;
}

export interface CodeBundleDocument extends Document {
  blockOneHash?: string;
  codeHash: string;
  genesisHash: string;
  abi?: unknown | null;
  id: string;
  name: string;
  owner?: string;
  tags?: string[];
  date: string;
  stars: number;
  instances: number;
}

export interface ContractDocument extends Document {
  abi: unknown;
  address: string;
  blockOneHash?: string;
  codeBundleId: string;
  genesisHash: string;
  name: string;
  owner?: string;
  tags?: string[];
  date: string;
  stars: number;
}

export interface UseQuery<T> {
  data: T | null;
  isLoading: boolean;
  isValid: boolean;
  refresh: VoidFn;
  updated: number;
}

export interface CodeBundleQuery {
  codeHash: string;
  blockOneHash?: string;
}

export interface Starred<T> {
  isExistent: boolean;
  value?: T | { identifier: string };
}

export interface UserArtifacts<T> {
  owned: Array<T>;
  starred: Array<Starred<T>>;
}

export interface DbState {
  db: Database;
  user: UserDocument | null;
  refreshUser: () => void;
  identity: PrivateKey | null;
  isDbReady: boolean;
}

export interface DbStatistics {
  codeBundlesCount: number;
  contractsCount: number;
  mostPopularCodeBundles: CodeBundleDocument[];
}

export type MyCodeBundles = UserArtifacts<CodeBundleDocument>;

export type MyContracts = UserArtifacts<ContractDocument>;