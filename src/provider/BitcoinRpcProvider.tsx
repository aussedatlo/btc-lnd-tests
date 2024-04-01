import React, { createContext, useContext } from "react";
import { BitcoinRpcService } from "../service/BitcoinRpc.service";

type BitcoinRpcContextProps = {
  rpc: BitcoinRpcService;
};

export const BitcoinRpcContext = createContext<BitcoinRpcContextProps>(
  {} as BitcoinRpcContextProps
);

type BitcoinRpcContextProviderProps = {
  children: React.ReactElement;
  rpc: BitcoinRpcService;
};

export const BitcoinRpcContextProvider: React.FC<
  BitcoinRpcContextProviderProps
> = ({ children, rpc }: BitcoinRpcContextProviderProps) => {
  return (
    <BitcoinRpcContext.Provider value={{ rpc }}>
      {children}
    </BitcoinRpcContext.Provider>
  );
};

export const useBitcoinRpcService = () => {
  const { rpc } = useContext(BitcoinRpcContext);

  if (!rpc) {
    throw new Error(
      "useBitcoinRpcService must be used within an BitcoinRpcContextProvider."
    );
  }

  return rpc;
};
