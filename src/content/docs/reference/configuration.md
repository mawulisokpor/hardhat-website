# Configuration

When Hardhat is run, it searches for the closest `hardhat.config.ts` file starting from the Current Working Directory. This file normally lives in the root of your project. An empty `hardhat.config.ts` is enough for Hardhat to work.

The entirety of your Hardhat setup (i.e. your config, plugins and custom tasks) is contained in this file.

## Available config options

To set up your config, you have to export an object from `hardhat.config.ts`.

The config options available will depend on the Hardhat plugins you have installed. However, there are some [standard options](#standard-options) that come from builtin Hardhat plugins and are always available. Additionally, regardless of which of our `hardhat-toolbox` plugins you have installed, there are some [toolbox options](#toolbox-options) that are common to both of them, while other options are specifically available in either the [Viem](#viem-toolbox-options) or [Ethers](#ethers-toolbox-options) toolbox plugins.

## Standard options

The following options are available even if you don't include any plugins:

```ts
export default {
  paths: {
    sources: "./contracts",
    tests: "./test/solidity",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
  },
  test: {
    solidity: {
      timeout: 40000,
    },
  },
};
```

:::tip

You can find more info about using Hardhat configuration variables in the [configuration variable guide](../learn-more/configuration-variables.md).

:::

### Path configuration

You can customize the different paths that Hardhat uses by providing an object to the `paths` field with the following keys:

- `sources`: The directory where your contracts are stored. This path is resolved from the project's root. Default value: `'./contracts'`.

- `tests`: The directory where your tests are located, or an object containing fields for each installed test runner that points to their respective test locations. This path is resolved from the project's root. Default value: `'./test'`.

- `cache`: The directory used by Hardhat to cache its internal stuff. This path is resolved from the project's root. Default value: `'./cache'`.

- `artifacts`: The directory where the compilation artifacts are stored. This path is resolved from the project's root. Default value: `'./artifacts'`.

### Solidity configuration

The `solidity` config is an optional field that can be one of the following:

- A solc version to use, e.g. `"{RECOMMENDED_SOLC_VERSION}"`.

- An array of solc versions to use, e.g. `["{RECOMMENDED_SOLC_VERSION}"]`.

- An object which describes the configuration for a single compiler. It contains the following keys:
  - `version`: The solc version to use.
  - `settings`: An object with the same schema as the `settings` entry in the [Input JSON](https://docs.soliditylang.org/en/latest/using-the-compiler.html#input-description).
  - `preferWasm`: <!-- todo -->
  - `npmFilesToBuild`: <!-- todo -->
- An object which describes multiple compilers and their respective configurations. It contains the following:
  - `compilers`: A list of compiler configuration objects like the one above.
  - `overrides`: An optional map of compiler configuration override objects. This maps file names to compiler configuration objects.
  - `preferWasm`: <!-- todo -->
  - `npmFilesToBuild`: <!-- todo -->
- An object which describes multiple build profiles and their respective configurations. It contains the following:
  - `profiles`: A map of build profile names to compiler configuration objects like the one above.
  - `npmFilesToBuild`: <!-- todo -->

#### Default EVM Version

The default EVM version is determined by solc's choice for a given compiler version. To specify a different EVM version, modify your `hardhat.config.js`:

```js
module.exports = {
  solidity: {
    version: "0.8.21",
    settings: {
      evmVersion: "shanghai",
    },
  },
};
```

Since version `0.8.20`, solc's EVM default is `shanghai`, which can lead to issues in chains that don't support the `PUSH0` opcode. To address this, starting from `0.8.20` Hardhat defaults to `paris`. This value can be overridden by using the above configuration.

### Network configuration

The `networks` config field is an optional object where network names map to their configuration.

There are two kinds of networks in Hardhat: [JSON-RPC](https://eth.wiki/json-rpc/API) based networks, and built-in, in-memory simulated networks. You can use either of these by setting the `type` field in the network configuration to either `http` or `edr-simulated`, respectively.

Additionally, simulated networks can be used to test your contracts in different environments, such as Optimism or layer 1 Ethereum, by setting the `chainType` field to either `op` or `l1`, respectively.`

There are a number of options that both network types share, as well as some that are specific to each type.

#### Shared network options

The following options are available for both JSON-RPC and simulated networks:

- `type`: The type of the network. This can be either `http` for JSON-RPC networks or `edr-simulated` for simulated networks.

- `accounts`: This field controls which accounts Hardhat uses. It can use the node's accounts (by setting it to `"remote"`), a list of local accounts (by setting it to an array of [configuration variables](../learn-more/configuration-variables.md)), or use an [HD Wallet](#hd-wallet-config). Default value: `"remote"`.

- `chainId`: An optional number, used to validate the network Hardhat connects to. If not present, this validation is omitted.

- `chainType`: Determines the type of chain for this network. This can be either `l1` for layer 1 networks like Ethereum, `op` for layer 2 networks like Optimism, or `generic` for other types of networks. Default value: `generic`.

- `from`: The address to use as default sender. If not present the first account of the node is used.

- `gas`: Its value should be `"auto"` or a number or bigint. If a number or bigint is used, it will be the gas limit used by default in every transaction. If `"auto"` is used, the gas limit will be automatically estimated. Default value: `"auto"`.

- `gasMultiplier`: A number used to multiply the results of gas estimation to give it some slack due to the uncertainty of the estimation process. Default value: `1`.

- `gasPrice`: Its value should be `"auto"` or a number or bigint. This parameter behaves like `gas`. Default value: `"auto"`.

#### JSON-RPC network options

The following options are specific to JSON-RPC networks:

- `url`: The url of the node, passed in via [configuration variable](../learn-more/configuration-variables.md). This argument is required for HTTP networks.

- `httpHeaders`: An optional object with headers to be sent in every request to the node. This can be useful for authentication or other purposes.

- `timeout`: An optional number that specifies the timeout for requests to the node, in milliseconds.

#### Simulated network options

The following options are specific to simulated networks:

- `allowBlocksWithSameTimestamp`: <!-- todo -->

- `allowUnlimitedContractSize`: <!-- todo -->

- `blockGasLimit`: <!-- todo -->

- `coinbase`: <!-- todo -->

- `forking`: <!-- todo -->

- `hardfork`: <!-- todo -->

- `initialBaseFeePerGas`: <!-- todo -->

- `initialDate`: <!-- todo -->

- `loggingEnabled`: <!-- todo -->

- `minGasPrice`: <!-- todo -->

- `mining`: <!-- todo -->

- `networkId`: <!-- todo -->

- `throwOnCallFailures`: <!-- todo -->

- `throwOnTransactionFailures`: <!-- todo -->

#### HD Wallet config

To use an [HD Wallet](https://github.com/ethereumbook/ethereumbook/blob/develop/05wallets.asciidoc#hd_wallets) with Hardhat you should set your network's `accounts` field to an object with the following fields:

- `mnemonic`: A required string with the mnemonic phrase of the wallet. Passed in via [configuration variable](../learn-more/configuration-variables.md).

- `path`: The HD parent of all the derived keys. Default value: `"m/44'/60'/0'/0"`.

- `initialIndex`: The initial index to derive. Default value: `0`.

- `count`: The number of accounts to derive. Default value: `20`.

- `passphrase`: The passphrase for the wallet, passed in via [configuration variable](../learn-more/configuration-variables.md). Default value: empty string.

- `accountsBalance`: **Only available in simulated networks.** The balance of the accounts derived from the HD wallet.

For example:

```ts
export default {
  networks: {
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: {
        mnemonic: configVariable("ACCOUNTS_MNEMONIC"),
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: configVariable("ACCOUNTS_PASSPHRASE"),
        // only available when network type === "edr-simulated"
        accountsBalance: 1000000000000000000n, // 1 ETH in wei
      },
    },
  },
};
```

### Test configuration

By default, Hardhat includes support for tests written in Solidity to test your contracts. There are many ways to configure the test environment, as described below.

<!-- todo: there are **a lot** of fields under SolidityTestUserConfig, do we want them all here right now? if not, which ones do we prioritize? -->

## Toolbox options

As mentioned above, there are a number of options that are common to both toolboxes, such as those added by the [`hardhat-ignition`](#hardhat-ignition-configuration) and [`hardhat-verify`](#hardhat-verify-configuration) plugins. These options are available regardless of which toolbox you are using.

### Hardhat Ignition configuration

Please refer to the [Hardhat Ignition documentation](../../ignition/docs/config/index.md) for more details on how to configure Hardhat Ignition.

### Hardhat Verify configuration

Please refer to the [verification guide](../learn-more/smart-contract-verification.md) for more details on how to configure the `hardhat-verify` plugin.

## Viem Toolbox options

The Viem toolbox makes the [Node.js test runner](https://nodejs.org/api/test.html) available for use in your Hardhat project. You can tell Hardhat where your tests are located by setting the `paths.tests.nodejs` field in your config, like this:

```ts
export default {
  paths: {
    tests: {
      nodejs: "./paths/to/your/tests",
    },
  },
};
```

## Ethers Toolbox options

The Ethers toolbox makes the [Mocha test runner](https://mochajs.org/) available for use in your Hardhat project. You can tell Hardhat where your tests are located by setting the `paths.tests.mocha` field in your config, like this:

```ts
export default {
  paths: {
    tests: {
      mocha: "./paths/to/your/tests",
    },
  },
};
```

Additionally, you can configure Mocha itself by providing an object to the `test.mocha` field, like this:

```ts
export default {
  test: {
    mocha: {
      timeout: 20000, // Set the timeout for tests to 20 seconds
    },
  },
};
```

:::tip

All options available in Mocha can be used here. You can find more information in the [Mocha documentation](https://mochajs.org/#configuring-mocha-nodejs).

:::

### Typechain configuration

The Ethers toolbox comes with Typechain support out of the box. You can configure it by providing an object to the `typechain` field in your config, like this:

```ts
export default {
  typechain: {
    /**
     * The absolute path to the folder where the generated types will be stored.
     * By default, this is set to the "types" folder in the root of your Hardhat project.
     */
    outDir: "./types",

    /**
     * Determines whether overloads with full signatures (e.g., deposit(uint256))
     * should always be generated, even if there are no overloads.
     * Defaults to false.
     */
    alwaysGenerateOverloads: false,

    /**
     * Indicates whether TypeChain should be skipped during compilation.
     * If true, TypeChain will not be executed during the compilation process.
     * Defaults to false.
     */
    dontOverrideCompile: false,

    /**
     * Generates basic union types for overloaded functions without adding extra
     * properties to help TypeScript identify specific cases.
     * Defaults to false.
     */
    discriminateTypes: false,

    /**
     * Skips type-checking in the generated files.
     * Defaults to false.
     */
    tsNocheck: false,
  },
};
```
