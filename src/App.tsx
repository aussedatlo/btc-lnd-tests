import "./App.css";
import { useBlockchainInfo } from "./hooks/useBlockchainInfo";

function App() {
  const { blocks } = useBlockchainInfo();

  return <>Block number: {blocks}</>;
}

export default App;
