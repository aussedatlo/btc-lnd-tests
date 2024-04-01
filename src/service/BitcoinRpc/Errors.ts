export type BitcoinRpcServiceErrors = LoadingBlockIndexError | UnexpectedError;

export class LoadingBlockIndexError extends Error {
  constructor() {
    super("Block index is loading");
    Object.setPrototypeOf(this, LoadingBlockIndexError.prototype);
  }
}

export class UnexpectedError extends Error {
  constructor() {
    super("Unexpected error");
    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }
}
