import { PolywrapClient } from "@polywrap/client-js";
import { WRAPPER_URI } from "../constants";

export async function setData(
  contract: string,
  value: number,
  client: PolywrapClient
): Promise<string> {

  const result = await client.invoke<string>({
    uri: WRAPPER_URI,
    method: "setData",
    args: {
      address: contract,
      value,
    },
  });

  if (!result.ok) {
    throw result.error;
  }

  return result.value;
}

export async function getData(
  contract: string,
  client: PolywrapClient
): Promise<string> {
  const result = await client.invoke<string>({
    uri: WRAPPER_URI,
    method: "getData",
    args: {
      address: contract
    },
  });

  if (!result.ok) {
    throw result.error;
  }

  return result.value;
}
