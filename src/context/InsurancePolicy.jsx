import React, { useEffect, useState } from "react";
import axios from "axios";
import { contractABI, contractAddress } from "../utils/Insurancepolicy";
import {ethers} from 'ethers';
export const InsuranceContext = React.createContext();
//const ethers = require("ethers");

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const InsuranceContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  console.log('Insurancecontract', InsuranceContract);
  return InsuranceContract;
};

export const InsuranceProvider = ({ children }) => {
  // const [formParams, updateFormParams] = useState({ IPname: '', description: '', fullname:'', country:'', street:''});
  // const [textmessage, setupMessage] = useState('');
  // const [bidformData, setbidformData] = useState({ tokenId: '', address:"", ownerIPname: "", bidvalue: "", bidderaddress: ""});
  // const [bidData, getbidders] = useState([]);
  // const [bidsData, getmybids] = useState([]);
  // const [countbids, bidsCounts] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
   
  // const handleChanges = (e, name) => {
  //   setbidformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  // };

  // const checkIfWalletIsConnect = async () => {
  //   try {
  //     if (!ethereum) return setupMessage("Please install MetaMask.");
  //     const accounts = await ethereum.request({ method: "eth_accounts" });
  //     //window.location.reload();
  //     console.log(accounts);
  //     if (accounts.length) {
  //       setCurrentAccount(accounts[0]);
  //       //getAllTransactions();
  //       console.log("accounts found");
  //     } else {
  //       console.log("No accounts found");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     }
  // };

  // const checkIfBidderExists = async () => {
  //   try {
  //     if (ethereum) {
  //       const bidderContract = createEthereumContract();
  //       console.log('Connect to your sepolia metamask account!');
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error("No ethereum object");
  //   }
  // };

  // const depositBid= async (tokenId, address, ownerIPname, amount) => {
  //   console.log('success')
  //   try {  
  //     if (ethereum) {
  //       //const { address, ownerIPname, bidvalue, bidderaddress } = bidformData;
  //       const bidderContract = createEthereumContract();
        
  //       const transactionHash = await bidderContract.bidderDeposit(tokenId, address, ownerIPname, { value: ethers.utils.parseEther(amount)});

  //       setIsLoading(true);
  //       console.log(`Loading - ${transactionHash.hash}`);
  //       await transactionHash.wait();
  //       console.log(`Success - ${transactionHash.hash}`);
  //       setIsLoading(false);

  //        window.location.reload();
  //       console.log('success')
  //     } else {
  //       console.log("No ethereum object now");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("No ethereum object");
  //   }
  // };

  // const refundBid= async (amount, tokenId) => {
  //   try {  
  //     if (ethereum) {
  //       //const { address, ownerIPname, bidvalue, bidderaddress } = bidformData;
  //       const bidderContract = createEthereumContract();
        
  //       const transactionHash = await bidderContract.refundDeposit(ethers.utils.parseEther(amount), tokenId);

  //       setIsLoading(true);
  //       console.log(`Loading - ${transactionHash.hash}`);
  //       await transactionHash.wait();
  //       console.log(`Success - ${transactionHash.hash}`);
  //       setIsLoading(false);

  //        window.location.reload();
  //       console.log('success')
  //     } else {
  //       console.log("No ethereum object now");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("No ethereum object");
  //   }
  // };

  // const epochTohumanReadble = (timestamp) => {        
  //   let date = new Intl.DateTimeFormat('en-US', 
  //   { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: 
  //   '2-digit', second: '2-digit' }).format(timestamp * 1000)
  //   return date;  
  // }

  // const getBidders = async () => {
  //   try {
  //     if (ethereum) {
  //       const bidderContract = createEthereumContract();

  //       const availableBidders = await bidderContract.getMyBidders();        
  //       const items = await Promise.all(availableBidders.map(async i => {
  //         let item = {
  //           tokenID: i.tokenID.toNumber(),
  //           owneraddress: i.owneraddress,
  //           ownerIPname: i.ownerIPname,
  //           bidValue: ethers.utils.formatEther(i.bidValue),
  //           bidderAddress: i.bidderAddress,
  //           bidAccepted: i.bidAccepted.toString(),
  //           timestamp: epochTohumanReadble(parseInt(i.timestamp['_hex']))            
  //         }

  //         return item;          
  //     }))
  //     console.log('successvid', items);
  //       getbidders(items);
  //     } else { 
  //       console.log("Ethereum is not present");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }  
  // };

  // const getMyBids = async () => {
  //   try {
  //     if (ethereum) {
  //       const bidderContract = createEthereumContract();

  //       const availableBidders = await bidderContract.getMyBids();        
  //       const items = await Promise.all(availableBidders.map(async i => {
  //         let item = {
  //           tokenID: i.tokenID.toNumber(),
  //           owneraddress: i.owneraddress,
  //           ownerIPname: i.ownerIPname,
  //           bidValue: ethers.utils.formatEther(i.bidValue),
  //           bidderAddress: i.bidderAddress,
  //           bidAccepted: i.bidAccepted.toString(),
  //           timestamp: epochTohumanReadble(parseInt(i.timestamp['_hex']))            
  //         }

  //         return item;          
  //     }))
  //     console.log('friendd', items);
  //       getmybids(items);
  //     } else { 
  //       console.log("Ethereum is not present");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }  
  // };


  useEffect(() => {
    //checkIfBidderExists();
    createEthereumContract();
  }, []);

  return (
    <InsuranceContext.Provider
      value={{    
        // handleChanges,  
        // bidformData,
        // depositBid,
        // refundBid,
        // getBidders,
        // bidData,
        // countbids,
        // isLoading,
        // textmessage, 
        // setupMessage,
        // getMyBids,
        // bidsData
        }}
      >
      {children}
    </InsuranceContext.Provider>
  );
      }
