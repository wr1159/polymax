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
    },
    snowtrace: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
    },
    moonbaseAlpha: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
    },
    ftmTestnet: {
      url: 'https://rpc.testnet.fantom.network/',
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
    },
    polygonMumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
    }

  },
  etherscan: {
    apiKey:{
      sepolia: process.env.ETHERSCAN_API_KEY as string,
      snowtrace: "snowtrace",
      alfajores: process.env.CELOSCAN_API_KEY as string,
      moonbaseAlpha: process.env.MOONSCAN_API_KEY as string,
      ftmTestnet: process.env.FTMSCAN_API_KEY as string,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY as string
    },
    customChains: [
      {
        network: "snowtrace",
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://avalanche.testnet.routescan.io"
        }
      },
      {
        network: "alfajores",
        chainId: 44787,
        urls: {
            apiURL: "https://api-alfajores.celoscan.io/api",
            browserURL: "https://alfajores.celoscan.io",
        },
    },
    ]
  },
  sourcify: {
    enabled: true
  }
};

export default config;
