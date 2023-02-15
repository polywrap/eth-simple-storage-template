import { PolywrapClient } from "@polywrap/client-js";
import * as App from "../types/wrap";
import path from "path";

import { getClientConfig } from "../../../client-config";

jest.setTimeout(500000);

describe("SimpleStorage", () => {
  const CONNECTION = { networkNameOrChainId: "testnet" };

  let client: PolywrapClient;
  let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const wrapperPath: string = path.join(
    path.resolve(__dirname),
    "..",
    "..",
    ".."
  );
  const wrapperUri = `fs/${wrapperPath}/build`;

  beforeAll(async () => {
    const config = await getClientConfig({});
    client = new PolywrapClient(config);
  });

  afterAll(async () => {
  });

  const getData = async (contractAddr: string): Promise<number> => {
    const response = await App.SimpleStorage_Module.getData(
      {
        address: contractAddr,
        connection: CONNECTION,
      },
      client,
      wrapperUri
    );

    if (!response.ok) fail(response.error);
    expect(response.ok).toBeTruthy();
    expect(response.value).not.toBeNull();

    return response.value as number;
  }

  const setData = async (contractAddr: string, value: number): Promise<string> => {
    const response = await App.SimpleStorage_Module.setData(
      {
        address: contractAddr,
        connection: CONNECTION,
        value: value,
      },
      client,
      wrapperUri
    );

    if (!response.ok) fail(response.error);
    expect(response.ok).toBeTruthy();
    expect(response.value).not.toBeNull();

    return response.value as string;
  }

  it("sanity", async () => {
    // Get data
    let data = await getData(contractAddress);
    expect(data).toBe(0);

    // Set data
    const tx = await setData(contractAddress, 10);
    expect(tx).toBeTruthy();

    // Get data
    data = await getData(contractAddress);
    expect(data).toBe(10);
  });
});
