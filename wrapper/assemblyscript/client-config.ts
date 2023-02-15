import { ClientConfig, PolywrapClientConfig } from "@polywrap/client-js";
import { ethereumPlugin, Connections, Connection } from "@polywrap/ethereum-plugin-js";
import { ipfsPlugin } from "@polywrap/ipfs-plugin-js";

// USE THIS FOR LOCAL ETHEREUM NODE
const ETH_PROVIDER = "http://127.0.0.1:8545/";

// USE THIS FOR LOCAL IPFS NODE
const IPFS_PROVIDER = "http://127.0.0.1:5001";


function getPlugins(): ClientConfig["plugins"] {
  const connection = new Connection({ provider: ETH_PROVIDER })
  const connections = new Connections({ networks: { testnet: connection }, defaultNetwork: "testnet" });
  return [
      {
        uri: "wrap://ens/ipfs.polywrap.eth",
        plugin: ipfsPlugin({}),
      },
      {
        uri: "wrap://ens/ethereum.polywrap.eth",
        plugin: ethereumPlugin({ connections }),
      },
    ];
}

export async function getClientConfig(
  _: Partial<PolywrapClientConfig>
): Promise<Partial<PolywrapClientConfig>> {
  return {
    envs: [{
      uri: "wrap://ens/ipfs.polywrap.eth",
      env: {
        provider: IPFS_PROVIDER,
      }
    }],
    plugins: getPlugins()
  }
}
