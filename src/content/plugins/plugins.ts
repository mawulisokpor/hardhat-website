// This list of plugins is automatically sorted by the numbers of downloads
// that the plugin got on npm in the last 30 days. Please add yourself to the
// bottom of the list.
//
// If your plugin's `name` is not it's package name, you can add an optional
// `npmPackage` field.
import fs from "fs";
import path from "path";

export const COMMUNITY_PLUGIN_DOWNLOADS_FILE = path.join(
  __dirname,
  "../../../temp/community-plugins-downloads.json"
);

export interface IPlugin {
  name: string;
  npmPackage?: string;
  author: string;
  authorUrl: string;
  description: string;
  tags: string[];
  slug?: string;
}

const communityPlugins: IPlugin[] = [
  {
    name: "hardhat-deploy",
    author: "Ronan Sandford",
    authorUrl: "https://twitter.com/wighawag",
    description:
      "A Hardhat Plugin For Replicable Deployments And Easy Testing",
    tags: ["Deployment", "Testing", "Scripts"],
  },
];

const officialPlugins: IPlugin[] = [
  {
    name: "@nomicfoundation/hardhat-toolbox-viem",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Nomic Foundation's recommended bundle of Hardhat plugins (viem based)",
    tags: ["Hardhat setup", "template", "viem"],
  },
  {
    name: "@nomicfoundation/hardhat-toolbox-mocha-ethers",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Nomic Foundation's recommended bundle of Hardhat plugins (ethers based)",
    tags: ["Hardhat setup", "template", "Ethers.js"],
  },
  {
    name: "@nomicfoundation/hardhat-keystore",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "This plugin adds an encrypted keystore to Hardhat, to handle secret values (e.g. API keys and private keys) in your config securely.",
    tags: ["Secrets", "Keystore", "Key management"],
  },
  {
    name: "@nomicfoundation/hardhat-verify",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Automatically verify contracts",
    tags: ["Verification", "Etherscan", "Blockscout"],
  },
  {
    name: "@nomicfoundation/hardhat-network-helpers",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "A plugin that provides a set of utility functions to interact with locally simulated networks.",
    tags: ["Network", "Simulation", "Helpers", "Testing"],
  },
  {
    name: "@nomicfoundation/hardhat-viem",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Integrates viem into a Hardhat project",
    tags: ["viem", "Testing", "Tasks", "Scripts"],
  },
  {
    name: "@nomicfoundation/hardhat-viem-assertions",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Adds a set of viem-based testing assertions to Hardhat",
    tags: ["viem", "Testing", "Assertions"],
  },
  {
    name: "@nomicfoundation/hardhat-ethers",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Integrates Ethers.js into a Hardhat project",
    tags: ["Ethers.js", "Testing", "Tasks", "Scripts"],
  },
  {
    name: "@nomicfoundation/hardhat-ethers-chai-matchers",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Adds a set of ethers-based matchers to chai",
    tags: ["Ethers.js", "chai", "Testing", "Assertions"],
  },
  {
    name: "@nomicfoundation/hardhat-typechain",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Generates TypeChain bindings for smart contracts",
    tags: ["TypeChain", "TypeScript", "Bindings", "Contracts"],
  },
  {
    name: "@nomicfoundation/hardhat-ignition",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Hardhat's official deployment solution",
    tags: ["Ignition", "Deployment"],
  },
  {
    name: "@nomicfoundation/hardhat-ignition-viem",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Adds support for viem to Hardhat Ignition",
    tags: ["Ignition", "viem", "Deployment", "Testing"],
  },
  {
    name: "@nomicfoundation/hardhat-ignition-ethers",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Adds support for Ethers.js to Hardhat Ignition",
    tags: ["Ignition", "Ethers.js", "Deployment", "Testing"],
  },
  {
    name: "@nomicfoundation/hardhat-mocha",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description: "Integrates Mocha into a Hardhat project",
    tags: ["Mocha", "Testing", "Test runner"],
  },
  {
    name: "@nomicfoundation/hardhat-node-test-runner",
    author: "Nomic Foundation",
    authorUrl: "https://twitter.com/NomicFoundation",
    description:
      "Integrates Node.js' builtin test runner into a Hardhat project",
    tags: ["Node.js test runner", "node:test", "Test runner"],
  },

  // Don't add community plugins here. They should be placed in the other array.
];

const generateSlug = (pluginName: string): string =>
  pluginName.replace(/^@/, "").replace(/\//g, "-");

function normalize(plugin: IPlugin): Required<IPlugin> {
  return {
    ...plugin,
    slug: generateSlug(plugin.name),
    npmPackage: plugin.npmPackage ?? plugin.name,
  };
}

const sortCommunityPluginsByDownloads = (plugins: Required<IPlugin>[]) => {
  let downloads: Record<string, number> = {};

  try {
    const downloadsJson = fs.readFileSync(
      COMMUNITY_PLUGIN_DOWNLOADS_FILE,
      "utf-8"
    );

    downloads = JSON.parse(downloadsJson);
  } catch {
    return plugins;
  }

  return plugins.sort((p1, p2) => {
    const p1Downloads = downloads[p1.npmPackage] ?? 0;
    const p2Downloads = downloads[p2.npmPackage] ?? 0;

    return p2Downloads - p1Downloads;
  });
};

export const plugins = {
  communityPlugins: sortCommunityPluginsByDownloads(
    communityPlugins.map(normalize)
  ),
  officialPlugins: officialPlugins.map(normalize),
};
