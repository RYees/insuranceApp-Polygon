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
  const [isLoading, setIsLoading] = useState(false);
  const [claimdata, updateData] = useState([]);
 
 
  // const handleChanges = (e, name) => {
  //   setbidformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  // };

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
          console.log("ashely", meta);
            
          let item = {
              claimId: i.claimId.toNumber(),
              policyId: i.policyId.toNumber(),
              claimant: i.claimant,
              description: i.description,
              status: i.status,
              cause: meta.cause,  
              location: meta.location,            
              date: meta.date,
              medicalevidence: meta.medicalevidence,
              image: meta.image
          }
          return item;
      }));
      updateData(items);
      console.log("claim", claimdata);
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
        claimdata
        }}
      >
      {children}
    </ClaimContext.Provider>
  );
      }
