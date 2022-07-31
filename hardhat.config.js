require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const privateKey = process.env.NEXT_PUBLIC_SIGNER_PRIVATE_KEY;
const endpoint = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks : {
    rinkeby: {
      url: endpoint,
      accounts: [`0x${privateKey}`],
      gas: 2100000,
      gasPrice: 8000000000,
      saveDeployments: true,
    }
  },
  etherscan: {
    apiKey: etherscanApiKey
  },
};
