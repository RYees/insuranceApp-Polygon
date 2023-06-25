import { ethers } from "hardhat";
import {
  VehicleContract__factory,
  InsurancePolicyContract__factory,
  ClaimContract__factory
  //InsuranceTokenContract__factory,
} from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

const main = async () => {
     const [deployer] = await ethers.getSigners();
    // console.log("Deploying contracts with the accounts", deployer.address);
    // console.log("Account balance:", (await deployer.getBalance()).toString());

    // const IPFactory = await hre.ethers.getContractFactory("ContractIp");
    // const IPContract = await IPFactory.deploy();
    // await IPContract.deployed();
  
    // console.log("Transactions deployed to: ", IPContract.address);

    const insurancePolicyContractFactory = new InsurancePolicyContract__factory(
        deployer
      );
      const insurancePolicyContract = await insurancePolicyContractFactory.deploy();
      const insurancePolicyContractTx =
        await insurancePolicyContract.deployTransaction.wait();
    
      console.log(
        `Insurance Policy Contract is deployed at address ${insurancePolicyContract.address} at block ${insurancePolicyContractTx.blockNumber}`
      );
    
    
      const vehicleContractFactory = new VehicleContract__factory(deployer);
      const vehicleContract = await vehicleContractFactory.deploy(insurancePolicyContract.address);
      const vehicleContractTx = await vehicleContract.deployTransaction.wait();
    
      console.log(
        `Vehicle Contract is deployed at address ${vehicleContract.address} at block ${vehicleContractTx.blockNumber}`
      );
      
    
      const claimContractFactory = new ClaimContract__factory(deployer);
      const claimContract = await claimContractFactory.deploy(
        insurancePolicyContract.address,
        vehicleContract.address
      );
      const claimContractTx = await claimContract.deployTransaction.wait();
    
      console.log(
        `Claim Contract is deployed at address ${claimContract.address} at block ${claimContractTx.blockNumber}`
      );

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();