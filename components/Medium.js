const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const {abi} = require("../artifacts/contracts/Medium.sol/Medium.json");
const signer = provider.getSigner();

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

export default contract;