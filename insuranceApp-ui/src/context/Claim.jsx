import React, { useEffect, useState } from "react";
import axios from "axios";
import { contractABI, contractAddress } from "../utils/Claim";
import { uploadJSONToIPFS } from "../pinata";
import {ethers} from 'ethers';
export const ClaimContext = React.createContext();
//const ethers = require("ethers");

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const ClaimContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  console.log('Claimcontract', ClaimContract);
  return ClaimContract;
};

export const ClaimProvider = ({ children }) => {
  const [formParams, updateFormParams] = useState({ cause:'', description:'', date: '', location:''});
  const [textmessage, setupMessage] = useState('');
  const [message, updateMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [claimdata, updateData] = useState([]);
  const [claimMydata, updateMyData] = useState([]);
 
  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS(dataURL, fileURL) {
    const { cause, description, date, location } = formParams;
    //Make sure that none of the fields are empty
    if(!cause || !description || !date || !location)
        return;

    const nftJSON = {
      cause, description, date, location, medicalevidence:dataURL, image:fileURL
    }

    try {
        //upload the metadata JSON to IPFS
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

  const SubmitClaim = async (index, policyId, dataURL, fileURL) => {
    console.log("forrk", fileURL);  uploadMetadataToIPFS(dataURL, fileURL)
    //Upload data to IPFS
    try {
      if(ethereum){
        const metadataURL = await uploadMetadataToIPFS(dataURL, fileURL);
        const claimContract = createEthereumContract();
        
        const transactionHash = await claimContract.submitClaim(index, policyId, metadataURL);
        window.location.reload();
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

       // window.location.reload();
        console.log('success')
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
      //throw new Error("No ethereum object");
    }
  };
  
  async function listAllClaims() {
    try {
      if(ethereum){
      //Pull the deployed contract instance
      const claimContract = createEthereumContract();
      //create an NFT Token
      let transaction = await claimContract.listAllClaims()
      
      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(transaction.map(async i => {
          const tokenURI = await i.description;
          let meta = await axios.get(tokenURI);
          meta = meta.data;
            
          let item = {
              claimId: i.claimId.toNumber(),
              policyId: i.policyId.toNumber(),
              claimant: i.claimant,             
              status: i.status,
              description: meta.description,
              cause: meta.cause,  
              location: meta.location,            
              date: meta.date,
              medicalevidence: meta.medicalevidence,
              image: meta.image
          }
          return item;
      }));
      updateData(items);
     // console.log("claim", claimdata);
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


  async function getMyClaim() {
    try {
      if(ethereum){
      //Pull the deployed contract instance
      const claimContract = createEthereumContract();
      //create an NFT Token
      let transaction = await claimContract.getMyClaim()
      
      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(transaction.map(async i => {
          const tokenURI = await i.description;
          let meta = await axios.get(tokenURI);
          meta = meta.data;
                 
          let item = {
              claimId: i.claimId.toNumber(),
              policyId: i.policyId.toNumber(),
              claimant: i.claimant,             
              status: i.status,
              description: meta.description,
              cause: meta.cause,  
              location: meta.location,            
              date: meta.date,
              medicalevidence: meta.medicalevidence,
              image: meta.image
          }
          return item;
      }));
      updateMyData(items);
      //console.log("claim", claimdata);
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

  const updateClaimStatus = async (id,val) => {
    // console.log('success',id,val)
    try {  
      if (ethereum) {
        //const { id, val } = statusformData;
        const claimContract = createEthereumContract();        
        const transactionHash = await claimContract.updateClaimStatus(id,val);
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        //  window.location.reload();
         updateMessage("Claim status changed successfully!");
        console.log('success')
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
     // throw new Error("No ethereum object");
    }
  };

  const payAcceptedClaim = async (index, amount, _claimerAddress) => {
    //console.log('success',index, ethers.utils.parseUnits(amount), _claimerAddress)
    try {  
      if (ethereum) {
        //const { id, val } = statusformData;
        const claimContract = createEthereumContract();        
        const transactionHash = await claimContract.claimPaid(index, _claimerAddress, { value: ethers.utils.parseUnits(amount) }) ;
        window.location.reload();
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        // window.location.reload();
        updateMessage("Money is transferred!");
        console.log('success')
      } else {
        console.log("No ethereum object now");
      }
    } catch (error) {
      console.log(error);
     // throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    //checkIfBidderExists();
    createEthereumContract();
  }, []);

  return (
    <ClaimContext.Provider
      value={{    
        SubmitClaim,
        formParams,
        updateFormParams,
        textmessage,
        isLoading,
        listAllClaims,
        claimdata,
        getMyClaim,
        claimMydata,
        updateClaimStatus,
        payAcceptedClaim,
        message
        }}
      >
      {children}
    </ClaimContext.Provider>
  );
      }
