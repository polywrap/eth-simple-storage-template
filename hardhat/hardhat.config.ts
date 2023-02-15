import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';

const sharedNetworkSettings = {
  live: false,
  allowUnlimitedContractSize: true,
  gas: 'auto' as const,
  gasPrice: 'auto' as const,
  gasMultiplier: 1,
  accounts: {
    mnemonic: 'test test test test test test test test test test test junk',
  },
  deploy: ['./scripts/deploy'],
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  paths: {
    sources: './contracts',
  },
  mocha: {
    timeout: 60000,
  },
  networks: {
    hardhat: {
      ...sharedNetworkSettings,
      chainId: +(process.env.HARDHAT_CHAIN_ID || 1337),
    },
  },
};

export default config;