require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require("dotenv").config();

const privateKey = process.env.SIGNER_PRIVATE_KEY;
const endpoint = process.env.INFURA_PROJECT_ID;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks : {
    rinkeby: {
      url: endpoint,
      accounts: [`0x${privateKey}`]
    }
  }
};
