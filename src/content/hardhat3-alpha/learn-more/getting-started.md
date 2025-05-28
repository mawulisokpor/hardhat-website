---
prev: true
---

# Getting started with Hardhat

Hardhat is a flexible and extensible development environment for Ethereum software. It helps you write, test, debug and deploy your smart contracts with ease, whether you're building a simple prototype or a complex production system.

This guide will walk you through the installation of our recommended setup, but as most of Hardhat's functionality comes from plugins, you are free to customize it or choose a completely different path.

## Installation

:::tip

[Hardhat for Visual Studio Code](/hardhat-vscode) is the official Hardhat extension that adds advanced support for Solidity to VSCode. If you use Visual Studio Code, give it a try!

:::

To get started with Hardhat 3, you’ll need [Node.js](https://nodejs.org/) v22 or later installed on your system, along with a package manager such as [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/).

First, create a new directory for your project:

```bash
mkdir hardhat-example
cd hardhat-example
```

Once that's done, initialize your Hardhat project by running:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat@next --init
```

:::

:::tab{value=pnpm}

```bash
pnpm dlx hardhat@next --init
```

:::

::::

This command will prompt you with a few configuration options. You can accept the default answers to quickly scaffold a working setup.

Using the defaults will:

1. Initialize the project in the current directory.
2. Use the example project that includes the [Node.js test runner](https://nodejs.org/api/test.html) and [viem](https://viem.sh/).
3. Automatically install all the required dependencies.

After the setup is complete, you’ll have a fully working Hardhat 3 project with everything you need to get started. Run the Hardhat help to verify the project was set up correctly:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat --help
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat --help
```

:::

::::

## Project structure

The Hardhat project initialization from the previous section creates the following file structure:

```
hardhat.config.ts

contracts
├── Counter.sol
└── Counter.t.sol

test
└── Counter.ts

ignition
└── modules
    └── Counter.ts

scripts
├── check-predeploy.ts
└── send-op-tx.ts
```

Here’s a quick overview of these files and directories:

- `hardhat.config.ts`: The main configuration file for your project. It defines settings like the Solidity compiler version, network configurations, and the plugins and tasks your project uses.

- `contracts`: Contains your project's Solidity contracts. You can also include Solidity test files here. Any file ending in `.t.sol` will be treated as a test file.

- `test`: Used for TypeScript integration tests. You can also include Solidity test files here.

- `ignition`: Holds your [Hardhat Ignition](https://hardhat.org/ignition) deployment modules, which describe how your contracts should be deployed.

- `scripts`: A place for any custom scripts that interact with your contracts or automate parts of your workflow. Scripts have full access to Hardhat’s runtime and can use plugins, connect to networks, deploy contracts, and more.

## Writing a smart contract

Writing a smart contract with Hardhat is as easy as writing a Solidity file inside the `contracts` directory. For example, your `contracts/Counter.sol` should look like this:

```solidity
pragma solidity ^0.8.28;

contract Counter {
  uint public x;

  event Increment(uint by);

  function inc() public {
    x++;
    emit Increment(1);
  }

  function incBy(uint by) public {
    require(by > 0, "incBy: increment should be positive");
    x += by;
    emit Increment(by);
  }
}
```

Hardhat will automatically detect it, and compile it with the correct version of Solidity based on its `pragma` statment and your Hardhat configuration. All you need to do is running:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat compile
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat compile
```

:::

::::

You can learn more about how to customize your Solidity version and settings in [this guide](./configuring-the-compiler.md).

## Testing your contracts

Tests are a critical part of any Ethereum project. Hardhat lets you write tests in both **Solidity** and **TypeScript**, giving you flexibility to choose the right tool for each situation.

Solidity tests run directly on the EVM and are great for unit tests. They execute in a controlled environment, making them fast and deterministic. They also have access to test-related EVM extensions, normally called cheatcodes, which allow you to build complex tests in Solidity.

TypeScript tests, on the other hand, use a fully-simulated local blockchain and interact with it through JSON-RPC. This allows you to write more complex or end-to-end tests using the full power of a general-purpose programming language and a realistic blockchain simulation. You can use any Ethereum TypeScript library, like [viem](https://viem.sh/) or [ethers.js](https://docs.ethers.org/v5/) to write your tests.

Use Solidity when you want low-level, efficient, EVM-native tests. Use TypeScript when you want richer tooling, more flexible assertions, or to test blockchain-level interactions, like workflows involving multiple transactions.

### Solidity tests

Hardhat 3 has full support for writing Solidity tests. The example project includes a Solidity test file at `contracts/Counter.t.sol`:

```solidity
import { Counter } from "./Counter.sol";
import { Test } from "forge-std/Test.sol";

contract CounterTest is Test {
  Counter counter;

  function setUp() public {
    counter = new Counter();
  }

  function test_InitialValue() public view {
    require(counter.x() == 0, "Initial value should be 0");
  }

  function testFuzz_Inc(uint8 x) public {
    for (uint8 i = 0; i < x; i++) {
      counter.inc();
    }
    require(counter.x() == x, "Value after calling inc x times should be x");
  }

  function test_IncByZero() public {
      vm.expectRevert();
      counter.incBy(0);
  }
}
```

You can run all the test in your project — both Solidity and TypeScript — using the `test` task:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat test
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test
```

:::

::::

If you only want to run your Solidity tests, you can use this instead:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat test solidity
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test solidity
```

:::

::::

When you run this command, Hardhat will:

- Compile your contracts and tests.
- Treat all `.t.sol` files in the `contracts/` directory and all `.sol` files in the `test/` directory as test files.
- Deploy each test contract defined in those files.
- Call every function that starts with `test`. If any of these calls revert, the corresponding test is marked as failed.

In the example above:

- `test_InitialValue` and `test_IncByZero` are **unit tests**: they take no parameters and run once per test execution.
- `testFuzz_Inc` is a **fuzz test**: since it takes a parameter, Hardhat will run it multiple times using random inputs. If any of those runs revert, the fuzz test fails and the failing input is printed.

If any of your tests fails, Hardhat will provide detailed **Solidity stack traces** to help you understand why. To see them in action, first comment out the `vm.expectRevert();` line in `test_IncByZero`:

```solidity
function test_IncByZero() public {
    // vm.expectRevert();
  counter.incBy(0);
}
```

Then run the last command again and you’ll get a stack-trace along with the test failure:

```
Failure (1): test_IncByZero()
Reason: revert: incBy: increment should be positive
  at Counter.incBy (contracts/Counter.sol:15)
  at CounterTest.test_IncByZero (contracts/Counter.t.sol:30)
```

This lets you quickly pinpoint the issue, even across deeply nested calls.

Learn more at [writing Solidity tests here](./writing-solidity-tests.md).

### TypeScript tests

Solidity tests are ideal for fast, focused unit testing, but they fall short in certain situations:

- **Complex test logic**, where a general-purpose language like TypeScript is more expressive and ergonomic than Solidity.
- **Tests that require realistic blockchain behavior**, such as advancing blocks or working with gas costs or multiple transactions. While cheatcodes can simulate this to some extent, excessive mocking is hard to maintain and can lead to inaccurate assumptions.
- **End-to-end scenarios**, where you want to test your contracts as they would behave in production—across multiple transactions, clients, and user interactions.

To support these cases, Hardhat lets you write tests in TypeScript (or JavaScript), using the Node.js test runner or other frameworks like Mocha. These tests run in a real Node.js environment and interact with your contracts through RPC, making them more representative of actual usage.

The example project includes a TypeScript test file at `test/Counter.ts`:

```tsx
describe("Counter", async function () {
  const { viem } = await network.connect();
  const publicClient = await viem.getPublicClient();

  it("The sum of the Increment events should match the current value", async function () {
    const counter = await viem.deployContract("Counter");

    // run a series of increments
    for (let i = 1n; i <= 10n; i++) {
      await counter.write.incBy([i]);
    }

    const events = await publicClient.getContractEvents({
      address: counter.address,
      abi: counter.abi,
      eventName: "Increment",
      fromBlock: 0n,
      strict: true,
    });

    // check that the aggregated events match the current value
    let total = 0n;
    for (const event of events) {
      total += event.args.by;
    }

    assert.equal(total, await counter.read.x());
  });
});
```

To run only your TypeScript tests, use the `test node` task:

::::tabsgroup{options=npm,pnpm}

:::tab{value=npm}

```bash
npx hardhat test node
```

:::

:::tab{value=pnpm}

```bash
pnpm hardhat test node
```

:::

::::

This test deploys the `Counter` contract, calls `incBy` multiple times (each in a separate transaction), collects all the emitted `Increment` events, and verifies that their sum matches the contract's final value.

Writing this same test in Solidity is possible, but less convenient, and the test would be executed in a different context — closer to a single transaction calling the contract multiple times, than different users interacting with it over time. This makes TypeScript a better fit for scenarios that depend on realistic transaction flows or blockchain behavior.

You can write any TypeScript code you want in your tests, as they are normal TypeScript files with access to Hardhat. In this example, we use `viem` to interact with the contracts and test the expected behavior. To learn more about how to use `viem` with Hardhat, read [this guide](./using-viem.md).

## Using scripts

- What scripts are
- Example script

## Deploying contracts

- Short explanation about Ignition
- Example module explanation
- Running a deployment in a Hardhat node
- Connecting a wallet to a Hardhat node

## Learn more

To learn more about Hardhat, check out these other guides:

- [Writing Solidity tests](../learn-more/writing-solidity-tests.md)
- [Using Viem with Hardhat](../learn-more/using-viem.md)
- [Configuring the compiler](../learn-more/configuring-the-compiler.md)
- [Differences with Hardhat 2](../learn-more/comparison.md)

and join our [Hardhat 3 Alpha](https://hardhat.org/hardhat3-alpha-telegram-group) Telegram group to share feedback and stay updated on new releases.

<!--

TODO:

- Code coverage
- Viem assertions
- Verification

-->
