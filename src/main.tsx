import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BitcoinRpcContextProvider } from "./provider/BitcoinRpcProvider.tsx";
import { BitcoinRpcService } from "./service/BitcoinRpc/BitcoinRpcService.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BitcoinRpcContextProvider
      rpc={
        new BitcoinRpcService({
          user: "bitcoinrpc",
          password: "bitcoinrpcpassword",
        })
      }
    >
      <App />
    </BitcoinRpcContextProvider>
  </React.StrictMode>
);
