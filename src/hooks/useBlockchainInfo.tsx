import { useEffect, useState } from "react";
import { useBitcoinRpcService } from "../provider/BitcoinRpcProvider";

const REFRESH_RATE = 5 * 1000;

export const useBlockchainInfo = () => {
  const [blocks, setBlocks] = useState<number>();
  const [refresh, setRefresh] = useState<number>(0);
  const rpc = useBitcoinRpcService();

  useEffect(() => {
    const timer = setInterval(() => {
      setRefresh((state) => state + 1);
    }, REFRESH_RATE);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchBlockCount();
  }, [refresh]);

  const fetchBlockCount = async () => {
    const response = await rpc.fetch();

    setBlocks(response.result.blocks);
  };

  return { blocks };
};
