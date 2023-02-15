import {
  Ethereum_Module,
  Args_setData,
  Args_getData,
} from "./wrap";

export function getData(args: Args_getData): u32 {
  const res = Ethereum_Module.callContractView({
    address: args.address,
    method: "function get() view returns (uint256)",
    args: null,
    connection: args.connection,
  }).unwrap();

  return U32.parseInt(res);
}

export function setData(args: Args_setData): string {
  const res = Ethereum_Module.callContractMethod({
    address: args.address,
    method: "function set(uint256 value)",
    args: [args.value.toString()],
    connection: args.connection,
    txOverrides: null,
  }).unwrap();

  return res.hash;
}
