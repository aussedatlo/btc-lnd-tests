import axios from "axios";

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

  public fetch = async () => {
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

      return response.data;
    } catch (e) {
      console.error(e);
    }
  };
}
