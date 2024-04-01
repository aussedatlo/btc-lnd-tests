import axios, { AxiosError } from "axios";
import { Either, Left, Right } from "purify-ts";
import {
  BitcoinRpcServiceErrors,
  LoadingBlockIndexError,
  UnexpectedError,
} from "./Errors";
import {
  BitcoinRpcMethods,
  BitcoinRpcResponse,
  BitcoinRpcExtractParamType,
} from "./Types";

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
  private _id: number;

  constructor({ user, password, host = "rpc" }: BitcoinRpcServiceArgs) {
    this._host = host;
    this._user = user;
    this._password = password;
    this._id = 0;
  }

  public fetch = async <
    T extends BitcoinRpcMethods,
    P extends BitcoinRpcExtractParamType<T>
  >(
    method: T,
    ...rest: P extends typeof undefined
      ? []
      : [param: BitcoinRpcExtractParamType<T>]
  ): Promise<Either<BitcoinRpcServiceErrors, BitcoinRpcResponse<T>>> => {
    this._id++;

    let params: (string | number)[] = [];
    rest.forEach((param) => {
      param && Object.values(param).map((value) => params.push(value));
    });

    try {
      const response = await axios.post(
        this._host,
        {
          jsonrpc: "2.0",
          method,
          id: this._id,
          params,
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
