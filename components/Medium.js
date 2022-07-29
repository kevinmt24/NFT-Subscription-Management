const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const CONTRACT_ADDRESS = '0xE77C2DF6c51696dd6Aad37D12d8327EC2dbE0cA5'

const { abi } = require("../contracts/Medium.json");
const signer = provider.getSigner();

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

export default contract;
