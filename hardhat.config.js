require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
const endpoint = process.env.SEPOLIA_RPC_URL;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: endpoint ? {
    sepolia: {
      url: endpoint,
      accounts: privateKey ? [`0x${privateKey}`] : [],
    }
  } : {},
  etherscan: {
    apiKey: etherscanApiKey
  },
};
