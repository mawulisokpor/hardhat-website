#!/bin/bash
set -e

# cd into the root of the repository
cd "$(dirname "$0")/.."

# cd one level up, to avoid being in this same npm project
cd ..

if [ ! -d "websites-version-of-hardhat" ]; then
  git clone --depth=1 https://github.com/nomiclabs/hardhat.git websites-version-of-hardhat
fi

cd websites-version-of-hardhat
git fetch origin
git reset --hard origin/main

pnpm install --prefer-offline --frozen-lockfile
pnpm build
