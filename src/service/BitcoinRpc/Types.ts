export type GetBlochainInfoResult = {
  bestblockhash: string;
  blocks: number;
  chain: string;
  chainwork: string;
  difficulty: number;
  headers: number;
  initialblockdownload: boolean;
  mediantime: number;
  pruned: boolean;
  size_on_disk: number;
  time: number;
  verificationprogress: number;
  warnings: string;
};

export type GetBlockResult = {
  bits: string;
  chainwork: string;
  confirmations: number;
  difficulty: number;
  hash: string;
  height: number;
  mediantime: number;
  merkleroot: string;
  nTx: number;
  nextblockhash: string;
  nonce: number;
  previousblockhash: string;
  size: number;
  strippedsize: number;
  time: number;
  tx: string[];
  version: number;
  versionHex: string;
  weight: number;
};
export type GetBlockArgs = { blockhash: string; verbosity?: 0 | 1 | 2 };

type GetResultType = {
  getblockchaininfo: GetBlochainInfoResult;
  getblock: GetBlockResult;
};

type GetArgsType = {
  getblockchaininfo: undefined;
  getblock: GetBlockArgs;
};

export type BitcoinRpcMethods = keyof GetResultType;

type BitcoinRpcExtractResult<T extends BitcoinRpcMethods> =
  T extends keyof GetResultType ? GetResultType[T] : never;

export type BitcoinRpcExtractParamType<T extends BitcoinRpcMethods> =
  T extends keyof GetArgsType ? GetArgsType[T] : never;

export type BitcoinRpcResponse<T extends BitcoinRpcMethods> = {
  error: string | null;
  id: number;
  result: BitcoinRpcExtractResult<T>;
};
