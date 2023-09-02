import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  paths: { tests: "tests" },
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.gateway.pokt.network/v1/lb/ae75c2b1",
      accounts: [
        "864a495edcc12a90eaa1e083caa1e8f904f8a3c55d07a1b48a4f32019942ffdb",
      ],
    },
  },
};

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

export default config;
