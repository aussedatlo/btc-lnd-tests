import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/rpc": {
          target:
            mode === "development"
              ? "http://localhost:8332"
              : "http://bitcoind:8332",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/rpc/, ""),
          configure: (proxy, _options) => {
            proxy.on("error", (err, _req, _res) => {
              console.log("proxy error", err);
            });
          },
        },
      },
    },
  };
});
