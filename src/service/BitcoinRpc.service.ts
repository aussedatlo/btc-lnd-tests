import axios, { AxiosError } from "axios";
import { Either, EitherAsync, Left, Right } from "purify-ts";
import {
  BitcoinRpcServiceErrors,
  LoadingBlockIndexError,
  UnexpectedError,
} from "./Errors";

type BitcoinRpcServiceArgs = {
  user: string;
  password: string;
  host?: string;
  port?: string;
};

export class BitcoinRpcService {
  private _host: string;
  private _user: string;
  private _password: string;

  constructor({ user, password, host = "rpc" }: BitcoinRpcServiceArgs) {
    this._host = host;
    this._user = user;
    this._password = password;
  }

  public fetch = async (): Promise<
    Either<BitcoinRpcServiceErrors, { result: any }>
  > => {
    try {
      const response = await axios.post(
        this._host,
        {
          jsonrpc: "2.0",
          method: "getblockchaininfo",
          id: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: this._user,
            password: this._password,
          },
        }
      );

      return Right(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.error === "Loading block index…")
          return Left(new LoadingBlockIndexError());
      }

      return Left(new UnexpectedError());
    }
  };
}
