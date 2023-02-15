# Simple Storage
This is a demo that showcases how to interact with a simple Ethereum smart-contract with a wrapper.

We have implemented this project in the below WASM compatible languages:

| Language | Source | Status | Version |
|----------|--------|--------|---------|
| ![Rust](https://img.shields.io/badge/Rust-ffffff?style=for-the-badge&labelColor=ffff99&logoColor=000000&logo=rust) | [./wrapper/rust](./wrapper/rust) |Running                                              | [![Polywrap](https://img.shields.io/badge/Polywrap-0.9.5-blue?style=for-the-badge)](https://www.npmjs.com/package/polywrap/v/0.9.5) |
| ![AssemblyScript](https://img.shields.io/badge/AssemblyScript-007AAC?style=for-the-badge&labelColor=ffffff&logoColor=007AAC&logo=assemblyscript) | [./wrapper/assemblyscript](./wrapper/assemblyscript/) | Running                                              | [![Polywrap](https://img.shields.io/badge/Polywrap-0.9.5-blue?style=for-the-badge)](https://www.npmjs.com/package/polywrap/v/0.9.5) |

We have also created demo apps that integrate this wrapper in the following languages/frameworks:

| Language | Framework | Source | App | Version |
|----------|-----------|--------|---------|---------|
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&labelColor=ffffff&logoColor=3178C6&logo=typescript) | [React.js](https://reactjs.org/) | [./app](./app)  | [Live](https://helloworld.demo.polywrap.io/) | [![Polywrap](https://img.shields.io/badge/Polywrap-0.9.5-blue?style=for-the-badge)](https://www.npmjs.com/package/polywrap/v/0.9.5) |

## Workshop

We'll now guide you through building & testing the wrapper & application. Please follow the steps below, and don't hesitate to reach out with questions @ https://discord.polywrap.io/.

### 1. Setup
Prerequisite software:
- `nvm`: Node Version Manager
- `yarn`: Yarn Package Manager
- `docker`: Docker Container Runtime

From the `root` directory, run:
```bash
nvm install && nvm use
yarn
```

This will get you setup with the correct version of Node.JS, as well as install all node dependencies in this repo.

### 2. Compile the Smart Contracts
```bash
cd hardhat
yarn compile
```

### 3. Deploy the Smart Contracts Locally
```bash
yarn dev
```

Additionally you'll want to get your browser's MetaMask setup with one of the private keys shown in the console window after running `yarn dev` above, and connected to the local test network at `localhost:8545`.

### 4. Build the Wrapper
In another terminal window, from the `root` directory, run:
```bash
nvm use
cd wrapper/assemblyscript
yarn build
```

NOTE: You'll need the docker daemon running before running this step, since Polywrap uses it for the wrapper's build environment.

### 5. Test the Wrapper
Simply run:
```bash
yarn test
```

### 6. Deploy the Wrapper
Deploy the wrapper to IPFS via the https://wrappers.io/ service by running:
```bash
yarn deploy
```

### 7. Start the App
Start the demo application by running:
```bash
cd ../../app
yarn start
```
