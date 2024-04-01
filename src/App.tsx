import "./App.css";
import { useBlockchainInfo } from "./hooks/useBlockchainInfo";

function App() {
  const { blocks, progress } = useBlockchainInfo();

  return (
    <>
      <div>Block number: {blocks}</div>
      <div>Progress: {progress}</div>
    </>
  );
}

export default App;
