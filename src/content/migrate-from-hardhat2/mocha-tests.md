# Migrating Mocha tests

This page covers the changes needed to migrate your Mocha tests from Hardhat 2 to Hardhat 3.

## ESM

Hardhat 3 is ESM-first, so files with a `.js` extension are treated as ES modules. If your tests are written in JavaScript, this means that you have to update them to use ESM syntax or change their extension to `.cjs`.

### Updating the syntax to ESM

Check [this guide](https://deno.com/blog/convert-cjs-to-esm) to learn how to convert CommonJS code to ESM, but here's a summary:

- Convert statements like `const x = require("x")` to `import x from "x"`.
- When importing a relative path, you always have to include the file extension. For example, `const x = require("./x")` becomes `import x from "./x.js"`, not `import x from "./x"`.
- Convert `module.exports = x` to `export default x` and `module.exports.x = 1` to `export const x = 1`.

### Changing the extension to .cjs

Alternatively, you can rename your test files so that they have a `.cjs` extension. This way, they will be treated as CommonJS modules and you won't have to change any syntax. However, this has a limitation: you can't require Hardhat as a top-level module. This code:

```js
const hre = require("hardhat");

it("some test", async function () {
  // use the hre
});
```

has to be changed to:

```js
it("some test", async function () {
  const hre = await import("hardhat");
  // use the hre
});
```

Notice that this can only be done inside async functions.

## Network connections

In Hardhat 3, you don't have a single, global network connection. Instead, you create and manage network connections explicitly. For example, if you have a test that uses the JSON-RPC provider:

```ts
it("some test", async function () {
  const blockNumber = await hre.network.provider.send("eth_blockNumber");
});
```

You now have to create a network connection first:

```ts
it("some test", async function () {
  const { provider } = await hre.network.connect();
  const blockNumber = await provider.send("eth_blockNumber");
});
```

Most of the time you probably want to use the same provider for multiple tests. If you are using ESM syntax, you can use top-level await and define it as a shared variable:

```ts
const { provider } = await hre.network.connect();

it("some test", async function () {
  const blockNumber = await provider.send("eth_blockNumber");
});
```

If you are using CommonJS modules instead, you can define the provider in a `before` block:

```ts
let provider;

before(async function () {
  ({ provider } = await hre.network.connect());
});

it("some test", async function () {
  const blockNumber = await provider.send("eth_blockNumber");
});
```

## The ethers.js object

In Hardhat 2, the `hardhat-ethers` plugin adds an `ethers` object to the Hardhat Runtime Environment, meaning you can do things like this in a test:

```ts
const hre = require("hardhat");

it("some test", async function () {
  const contract = await hre.ethers.deployContract("MyContract");
});
```

In Hardhat 3, this same `ethers` object is included as part of each created network connection:

```ts
import hre from "hardhat";

it("some test", async function () {
  const { ethers } = await hre.network.connect();
  const contract = await ethers.deployContract("MyContract");
});
```
