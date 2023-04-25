import { ethers } from 'ethers';

const GAS_LIMIT = 3000000;
const token = require('../contracts/Token.json');
const bytecode = token.bytecode;
const abi = token.abi;

export const createToken = async (arg: {
  tokenName: string;
  symbol: string;
  initialSupply: number;
  decimals: number;
}) => {
  // Create a provider instance using the node URL
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  const signer = provider.getSigner();
  const args = [arg.tokenName, arg.symbol, arg.initialSupply, arg.decimals];
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const options = {
    gasLimit: GAS_LIMIT, // The gas limit for deploying the smart contract (if needed)
  };
  // Deploy the smart contract using the contract factory instance
  const contract = await factory.deploy(...args, options);
  // Wait for the transaction to be confirmed
  await contract.deployed();

  return contract;
  // alert(`Contract was deployed at address ${contract.address}`);
};
