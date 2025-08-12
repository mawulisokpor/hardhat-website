---
title: Migrate from Hardhat 2
description: How to migrate from Hardhat 2 to Hardhat 3
---

# Migrate from Hardhat 2

## Overview

Hardhat 3 is a complete rewrite of Hardhat 2. While many features are familiar, several fundamental changes mean HH3 is not compatible with HH2 projects out of the box:

- **ESM-first**: Your Hardhat config must be an ES module. Scripts and JavaScript/TypeScript tests can still be CommonJS, but ESM is the default.
- **Declarative config**: Plugins, tasks, and other extensions are configured explicitly in your config file instead of being registered by side effects.
- **Explicit network connections**: You create and manage network connections yourself, allowing multiple concurrent connections in one process, but meaning that globals like `hre.ethers` and `hre.network` don't exist anymore.
- **Extensibility through hooks**: In Hardhat 3, hooks are the main way to extend functionality. Features like `extendConfig`, `extendEnvironment`, and subtask overriding are no longer available.

Because these changes are significant, this guide recommends starting with a clean config and migrating features step by step, rather than trying to adapt an Hardhat 2 project in place.

## Before starting the migration

Before making any changes, prepare your project so that installing and running Hardhat 3 won’t conflict with leftover dependencies, configs, or build artifacts from Hardhat 2.

1. **Check node.js version**

   Make sure you are using Node.js v22 or later:

   ```bash
   node --version
   ```

2. **Clear caches and artifacts**

   Run the `clean` task to avoid issues with stale artifacts or caches:

   ::::tabsgroup{options=npm,pnpm}

   :::tab{value=npm}

   ```bash
   npx hardhat clean
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm hardhat clean
   ```

   :::

   ::::

3. **Remove Hardhat 2 dependencies**

   Start by removing these packages from your `package.json`:

   - `hardhat`
   - Any packages starting with `hardhat-`, `@nomicfoundation/`, or `@nomiclabs`
   - `solidity-coverage`

   Then reinstall and check for remaining packages that depend on Hardhat:

   ::::tabsgroup{options=npm,pnpm}

   :::tab{value=npm}

   ```bash
   npm install && npm ls hardhat
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm install && pnpm why hardhat
   ```

   :::

   ::::

   Repeat until no Hardhat-related dependencies remain.

4. **Rename your old config**

   Keep your old config for reference, but rename it so you can create a new one alongside it:

   ```bash
   mv hardhat.config.js hardhat.config.old.js
   ```

5. **Make your project ESM**

   Add this to your package.json:

   ```json
   {
     "type": "module"
   }
   ```

## Migrating compilation settings

The first step is to create a minimal config that’s just enough to compile your contracts.

1. **Create an empty config file**

   Create a `hardhat.config.ts` file with the following content:

   ```ts
   import type { HardhatUserConfig } from "hardhat/config";

   const config: HardhatUserConfig = {};

   export default config;
   ```

2. **Run the help command**

   Verify that Hardhat 3 is working by running the help command:

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

3. **Add a `solidity` entry**

   Copy the `solidity` entry from your old config as-is. The format is backwards-compatible in Hardhat 3, so it should just work:

   ```ts
   const config: HardhatUserConfig = {
     solidity: {
       /* your solidity config */
     },
   };
   ```

4. **Compile your contracts**

   Run the `build` task to verify that your config is working:

   ::::tabsgroup{options=npm,pnpm}

   :::tab{value=npm}

   ```bash
   npx hardhat build
   ```

   :::

   :::tab{value=pnpm}

   ```bash
   pnpm hardhat build
   ```

   :::

   ::::
