import { useEffect, useState } from "react";
import { useBitcoinRpcService } from "../provider/BitcoinRpcProvider";

const REFRESH_RATE = 5 * 1000;

type BlockchainInfoState = {
  blocks: number;
  progress: number;
};

export const useBlockchainInfo = () => {
  const [state, setState] = useState<BlockchainInfoState>({
    blocks: 0,
    progress: 0,
  });
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
    const response = await rpc.fetch("getblockchaininfo");
    response.map(({ result }) =>
      setState({ blocks: result.blocks, progress: result.verificationprogress })
    );
  };

  return state;
};
