import React, { useEffect, useState } from "react";
import axios from "axios";
import { contractABI, contractAddress } from "../utils/Insurancepolicy";
import {ethers} from 'ethers';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import { data } from "autoprefixer";

export const InsuranceContext = React.createContext();
//const ethers = require("ethers");

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const InsuranceContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  //console.log('Insurancecontract', InsuranceContract);
  return InsuranceContract;
};

export const InsuranceProvider = ({ children }) => {
  const [formParams, updateFormParams] = useState({ policyname: '', description: '' });
  const [currentAccount, setCurrentAccount] = useState("");
  const [policydata, updateData] = useState([]);
  const [monthlyamount, setMonthlyAmount] = useState([]);
  const [textmessage, setupMessage] = useState('');
  const [isAdmin, setCheckAdmin] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return setupMessage("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      //window.location.reload();
      console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        //getAllTransactions();
        console.log("accounts found");
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return setupMessage("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });
      setCurrentAccount(accounts[0]);
      setupMessage('You are Connected!');
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    } 
  };

  const CheckOwner = async () => {
    try {
      if(ethereum){
        const policyContract = createEthereumContract();
        const transactionHash = await policyContract.checkOwnership();
        setCheckAdmin(transactionHash);
        //console.log("success", transactionHash);
      }
    } catch (error) {
      console.log(error);
     //throw new Error("No ethereum object");
    }
  };

  async function uploadMetadataToIPFS(fileURL) {
    const {policyname, description, date} = formParams;
    if( !policyname || !description || !fileURL)
        return;

    const nftJSON = {
      policyname, description, image:fileURL
    }

    try {
        const response = await uploadJSONToIPFS(nftJSON);
        if(response.success === true){
            console.log("Uploaded JSON to Pinata: ", response)
            return response.pinataURL;
        }
    }
    catch(e) {
        setupMessage("Error with loading");
        console.log("error uploading JSON metadata:", e)
    }
  }

  const CreatePolicy = async (premiumAmount, fileURL) => {
    try {
      if(ethereum){
        const metadataURL = await uploadMetadataToIPFS(fileURL);
        const policyContract = createEthereumContract();
        const transactionHash = await policyContract.createPolicy(ethers.utils.parseUnits(premiumAmount), metadataURL);
        window.location.reload();
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

         window.location.reload();
        console.log('success')
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
     //throw new Error("No ethereum object");
    }
  };

  async function getAllPolicies() {
    try {
      if(ethereum){
      //Pull the deployed contract instance
      const policyContract = createEthereumContract();
      //create an NFT Token
      let transaction = await policyContract.listInsurancePolicies()

      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(transaction.map(async i => {
          const tokenURI = await i.dataUrl;
          let meta = await axios.get(tokenURI);
          meta = meta.data;
          // IPname, description, fullname, country, street\  
          let item = {
              policyId: i.policyId.toNumber(),
              owner: i.owner,
              premiumAmount: ethers.utils.formatEther(i.premiumAmount.toString()),
              status: i.status,
              policyname: meta.policyname,
              description: meta.description,
              image: meta.image
          }
          return item;
      }))
      updateData(items);
      //console.log("fetchPolciy", policydata);
      if(items) {setupMessage('');}
      setIsLoading(false);
      } else { 
        console.log("Error with loading");
        setupMessage("Error with loading"); 
      }
    }
    catch(e) {
        console.log( "Upload error"+e );
        setupMessage("Error with loading");
    }
  }

  // Monthly Payments
  const PayMonthly = async (amount, _policyId) => {
    //Upload data to IPFS
    try {
      if(ethereum){
        const policyContract = createEthereumContract();
        const transactionHash = await policyContract.monthlyPayment(_policyId, { value: ethers.utils.parseUnits(amount) });

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        window.location.reload();
        console.log('success')
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
    //throw new Error("No ethereum object");
    }
  };

  const checkPaymentPeriod = async (currentTimestamp) => {
    //Upload data to IPFS
    try {
      if(ethereum){
        const policyContract = createEthereumContract();
        const transactionHash = await policyContract.checkPaymentPeriod(currentTimestamp) ;
      console.log("george", transactionHash);
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        window.location.reload();
        console.log('success');
        return transactionHash;
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
    //throw new Error("No ethereum object");
    }
  };

  const updateNextTime = async (index) => {
    //Upload data to IPFS
    try {
      if(ethereum){
        const policyContract = createEthereumContract();
        const transactionHash = await policyContract.updateNextTime(index);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        window.location.reload();
        console.log('success')
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
    //throw new Error("No ethereum object");
    }
  };

  const monthlyAmount = async (policyId) => {
    //Upload data to IPFS
    try {
      if(ethereum){
        const policyContract = createEthereumContract();
        const transactionHash = await policyContract.monthlyAmountofPolicy(policyId);
        setIsLoading(true);
        //console.log("fak", transactionHash);
        
        console.log(`Loading - ${transactionHash.hash}`);
        console.log(`Success - ${transactionHash.hash}`);

        setIsLoading(false);
        setMonthlyAmount(transactionHash);
        
        window.location.reload();
        console.log('success');
        
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
    //throw new Error("No ethereum object");
    }
  };

  async function listAllUserPayments() {
    try {
      if(ethereum){
      //Pull the deployed contract instance
      const policyContract = createEthereumContract();
      //create an NFT Token
      let transaction = await policyContract.listAllUserPayments()

      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(transaction.map(async i => {
          let item = {
              policyId: i.policyId.toNumber(),
              usersVechice: i.usersVechice,
              moneyBalance: ethers.utils.formatEther(i.moneyBalance.toString()),
              timestamp: i.timestamp,
              endtime: i.endtime,
              monthlyPaid: i.monthlyPaid
          }
          return item;
      }))
      updateData(items);
      if(items) {setupMessage('');}
      setIsLoading(false);
      } else { 
        console.log("Error with loading");
        setupMessage("Error with loading"); 
      }
    }
    catch(e) {
        console.log( "Upload error"+e );
        setupMessage("Error with loading");
    }
  }

  function datetoepoch(date, index) {
    let time = Math.trunc(new Date(date).getTime()/1000);
    let val = checkPaymentPeriod(time);
    console.log("uptop", val);
    if(val == false || val == true){
      updateNextTime(index);
    }   
    return time;
  }
 
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <InsuranceContext.Provider
      value={{    
        CreatePolicy,
        connectWallet,
        currentAccount,
        updateFormParams,
        formParams,
        getAllPolicies,
        policydata,
        datetoepoch,
        monthlyAmount,
        monthlyamount,
        PayMonthly,
        CheckOwner,
        isAdmin
        }}
      >
      {children}
    </InsuranceContext.Provider>
  );
      }
