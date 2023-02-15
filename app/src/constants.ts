export const SIMPLE_STORAGE_CONTRACT_ADDRESS = {
  "0x539": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  "0x5": "0x00C753526ff5C975eB48815afd9A004c10972171",
  "0x13881": "0x87450857Fd5151FDED70EE66a311c23857F99831",
}
export const EXPLORER_URL = {
  "0x539": "https://etherscan.io/",
  "0x5": "https://goerli.etherscan.io/",
  "0x13881": "https://mumbai.polygonscan.com/",
}
export type ChainId = "0x539" | "0x5" | "0x13881";

export function getChainId(): ChainId {
  let chainId = (window as any).ethereum.chainId;

  if (typeof chainId === "number") {
    chainId = chainId.toString(16);
  }

  return chainId;
}

export const WRAPPER_ENS_DOMAIN = "api.simplestorage.eth";
export const WRAPPER_URI = `ens/goerli/${WRAPPER_ENS_DOMAIN}`;
export const WRAPPER_IPFS_HASH = "QmSpiQhe8xptgYmmpgmkmEnfzr8GEvNnW1zNT1sKkqH8EE";
