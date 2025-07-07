---
prev: false
---

# Alpha Version Limitations

Thanks for trying out Hardhat 3! Please note that the alpha version is still in development and may contain bugs, missing features, and rough edges.

This page outlines some of the limitations and issues present in the alpha version. These will be addressed in upcoming releases.

Since Hardhat 3 is still in development, things will continue to evolve, and your feedback can make a big difference. Let us know what you think and what you need! To stay up to date with the latest changes and share your feedback, join our [Hardhat 3 Alpha Telegram group](https://hardhat.org/hardhat3-alpha-telegram-group).

## Missing Plugins and Features

- Hardhat 3 doesn't currently support `hardhat-shorthand` or `hh`.
- Gas reporting and gas snapshots are not yet supported.
- Both Solidity and JavaScript tests will offer alternative trace formats that users can choose from. Currently, only Solidity stack traces are supported.
- Ledger device support is not yet available but will be added soon.
- The output printed by different types of tests will be more integrated, improving their UX and readability.

## Solidity Tests

- Solidity tests don't support Chain Types yet.

## Build System

- The compilation cache is not yet optimized and doesn't fully support incremental compilation.
- The build process may run out of memory when compiling large projects.
- The build system isn't yet extensible through plugins, but improvements are planned.
- Vyper is not yet supported.

## Hardhat Ignition

- The following tasks haven't been ported to Hardhat 3 yet: `hardhat ignition verify`, `hardhat ignition visualize`.
- Deployments made with Hardhat 2 are not yet compatible with Hardhat 3. In the near future, they will be compatible and/or a migration tool will be provided to convert them to the new format.
