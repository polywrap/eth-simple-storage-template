import { ClientConfig, PolywrapClientConfig } from "@polywrap/client-js";
import { ethereumPlugin, Connections, Connection } from "@polywrap/ethereum-plugin-js";
// USE THIS FOR LOCAL ETHEREUM NODE
const ETH_PROVIDER = "http://127.0.0.1:8545/";

function getPlugins(): ClientConfig["plugins"] {
  const connection = new Connection({ provider: ETH_PROVIDER })
  const connections = new Connections({ networks: { testnet: connection }, defaultNetwork: "testnet" });
  return [
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
    plugins: getPlugins()
  }
}
