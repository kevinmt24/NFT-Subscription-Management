const { ethers } = require("ethers");
const { abi } = require("../contracts/Medium.json");

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// Transactions are signed by the visitor's own wallet (MetaMask), so no private key lives in the app.
export default function getContract() {
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
}
