const { ethers } = require("ethers");

const endpoint = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;

const provider = new ethers.providers.JsonRpcProvider(endpoint);
const CONTRACT_ADDRESS = '0xacfC02A653BdD5B9C3607445d3e905c44f21EfB4'

const { abi } = require("../contracts/Medium.json");
const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_SIGNER_PRIVATE_KEY,provider);


const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

export default contract;
