pub mod wrap;
use polywrap_wasm_rs::JSON;
use wrap::imported::ethereum_module;
pub use wrap::*;

pub fn get_data(args: ArgsGetData) -> i32 {
    match EthereumModule::call_contract_view(&ethereum_module::ArgsCallContractView {
        address: args.address,
        method: "function get() view returns (uint256)".to_string(),
        args: None,
        connection: args.connection,
    }) {
        Ok(v) => v.parse::<i32>().unwrap(),
        Err(e) => panic!("{}", e),
    }
}

pub fn set_data(args: ArgsSetData) -> String {
    match EthereumModule::call_contract_method(&ethereum_module::ArgsCallContractMethod {
        address: args.address,
        method: "function set(uint256 value)".to_string(),
        args: Some(vec![args.value.to_string()]),
        connection: args.connection,
        tx_overrides: None,
    }) {
        Ok(res) => res.hash,
        Err(e) => panic!("{}", e),
    }
}
