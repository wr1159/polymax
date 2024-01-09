import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";

// Load environment variables from .env file
dotenvConfig();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
    }
  },
  etherscan: {
    apiKey:{
      sepolia: process.env.ETHERSCAN_API_KEY as string
    } 
  },
  sourcify: {
    enabled: true
  }
};

export default config;
