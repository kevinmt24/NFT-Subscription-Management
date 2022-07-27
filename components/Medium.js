const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

// const CONTRACT_ADDRESS = "0xf2dFDc70e400cFda63a724b1F58Ed0b1FA4fB7E5";
const CONTRACT_ADDRESS = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'

const { abi } = require("../artifacts/contracts/Medium.sol/Medium.json");
const signer = provider.getSigner();

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

export default contract;
