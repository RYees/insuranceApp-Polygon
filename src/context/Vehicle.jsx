import React, { useEffect, useState } from "react";
import axios from "axios";
import { contractABI, contractAddress } from "../utils/Vehicle";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import {ethers} from 'ethers';
export const VehicleContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const VehicleContract = new ethers.Contract(contractAddress, contractABI, signer);
  
  console.log('Vehiclecontract', VehicleContract);
  return VehicleContract;
};

export const VehicleProvider = ({ children }) => {
   const [formParams, updateFormParams] = useState({ ownername:'', model: '', color:''});
   const [textmessage, setupMessage] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [vehicledata, updateData] = useState([]);
   const [myvehicledata, updatemyData] = useState([]);
   
  // const handleChanges = (e, name) => {
  //   setbidformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  // };

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS(fileURL) {
    const {ownername, model, color} = formParams;
    //Make sure that none of the fields are empty
    if(!ownername || !model || !color || !fileURL)
        return;

    const nftJSON = {
      ownername, model, color, image:fileURL
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

  const RegisterVehicle = async (plate, policyId, fileURL) => {
   // console.log("forrk", fileURL); 
    //Upload data to IPFS
    try {
      if(ethereum){
        const metadataURL = await uploadMetadataToIPFS(fileURL);
        const vehicleContract = createEthereumContract();
        
        const transactionHash = await vehicleContract.createVehicle(plate, policyId, metadataURL);

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

  async function getAllVehicles() {
    try {
      if(ethereum){
        console.log("vehicle");
      //Pull the deployed contract instance
      const vehicleContract = createEthereumContract();
      //create an NFT Token
      let transaction = await vehicleContract.getAllVehicles()
      
      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(transaction.map(async i => {
          const tokenURI = await i.vehicledata;
          let meta = await axios.get(tokenURI);
          meta = meta.data;
            
          let item = {
              policyId: i.policyId.toNumber(),
              vehicleOwnerAddress: i.vehicleOwnerAddress,
              licensePlate: i.licensePlate,
              vehicledata: i.vehicledata,
              ownername: meta.ownername,  
              model: meta.model,            
              color: meta.color,
              image: meta.image
          }
          return item;
      }));
      updateData(items);
      console.log("vehicle", vehicledata);
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

  async function getMyVehicles() {
    try {
      if(ethereum){
        console.log("vehicle");
      //Pull the deployed contract instance
      const vehicleContract = createEthereumContract();
      //create an NFT Token
      let transaction = await vehicleContract.getMyVehicles()
      
      //Fetch all the details of every NFT from the contract and display
      const items = await Promise.all(transaction.map(async i => {
          const tokenURI = await i.vehicledata;
          let meta = await axios.get(tokenURI);
          meta = meta.data;
            
          let item = {
              policyId: i.policyId.toNumber(),
              vehicleOwnerAddress: i.vehicleOwnerAddress,
              licensePlate: i.licensePlate,
              vehicledata: i.vehicledata,
              ownername: meta.ownername,  
              model: meta.model,            
              color: meta.color,
              image: meta.image
          }
          return item;
      }));
      updatemyData(items);
      console.log("myvehicle", myvehicledata);
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
    //createEthereumContract();
  }, []);

  return (
    <VehicleContext.Provider
      value={{    
          RegisterVehicle,
          formParams,
          updateFormParams,
          textmessage,
          isLoading,
          getAllVehicles,
          vehicledata,
          myvehicledata,
          getMyVehicles
        }}
      >
      {children}
    </VehicleContext.Provider>
  );
      }


