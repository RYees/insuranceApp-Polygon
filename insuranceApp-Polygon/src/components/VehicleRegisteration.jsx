import React,{useState, useContext} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { VehicleContext } from '../context/Vehicle';
import { uploadFileToIPFS } from "../pinata";
import { car1 } from "../assets/index";
import '../css/Style.css';
import { useLocation } from 'react-router-dom';

const VehicleRegisteration = () => {
  const { RegisterVehicle, formParams, updateFormParams } = useContext(VehicleContext); 
  const [ infos, setInfo ] = useState({
    plate : ''
  });
  const [fileURL, setFileURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { state } = useLocation();
  const { index } = state || {};
  const { item } = state || {};
  console.log("coco", item);

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    setIsLoading(true)
    var file = e.target.files[0];
    try {
        //setFileURL(file);
        const response = await uploadFileToIPFS(file);
        if(response.success === true) {
            console.log("Uploaded image to Pinata: ", response.pinataURL)
            setFileURL(response.pinataURL);
            setIsLoading(false)
        }
    }
    catch(e) {
        console.log("Error during file upload", e);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    RegisterVehicle(infos.plate, item.policyId, fileURL);
  };

  return (
    <> 
    <div>
        <div className=''>
          <img src={car1} alt="" className='mx-auto py-2 h-72 my-10 rounded-xl'/>
         </div>

        <div className='flex flex-col 2xl:flex-row xl:flex-row lg:flex-row rounded-xl bg-green-100 mx-1'>
            <div 
                className='text-gray-600 font-serif flex justify-between'>
                <form className='flex justify-center py-4'>
                <div className='fields px-10'>
                    <div className='mb-6 text-sm text-black'>
                        <h1 className='text-2xl'>Insure Your Vehicle</h1>
                    </div>
                    <div className=' flex flex-wrap'>    
                        
                        <div className="mb-4">
                        <label className=''>Vehicle Owner </label><br></br>
                        <input className='text-gray-700 border py-2 px-2 rounded w-96' 
                            placeholder="owner name" type="text" name="ownername" 
                            onChange={e => updateFormParams({...formParams, ownername: e.target.value})} 
                            value={formParams.ownername}/>
                        </div>

                        <div className="mb-4 mr-2">
                        <label className=''>Vehicle Model</label><br></br>
                            <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-5' 
                            placeholder="vehicle model" type="text" name="model" 
                            onChange={e => updateFormParams({...formParams, model: e.target.value})} 
                            value={formParams.model}
                            />
                        </div>

                        <div className="mb-4">
                        <label className=''>Vehicle Color</label><br></br>
                            <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-2' 
                            placeholder="vehicle color" type="text" name="color" 
                            onChange={e => updateFormParams({...formParams, color: e.target.value})} 
                            value={formParams.color}
                            />
                        </div>
                        
                        <div className="mb-4">
                        <label className=''>License Plate</label><br></br>
                            <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-5' 
                            placeholder="license plate" type="text" name="licenseplate" 
                            onChange={e => setInfo({...infos, plate: e.target.value})} 
                            value={infos.plate}
                            />
                        </div>

                        <div className="mb-4">
                        <label className=''>Date</label><br></br>
                          <input className='text-gray-700 border py-2 px-2 rounded w-96 mr-5 mb-3' 
                          placeholder="occurance date" type="date" name="date" 
                          onChange={e => updateFormParams({...formParams, date: e.target.value})} 
                          value={formParams.date}
                          />
                      </div>

                        <div>
                            <label className="block text-black mb-2" htmlFor="image">Vehicle Photo</label>
                            <input type={"file"} onChange={OnChangeFile}></input>
                            {isLoading?<p className='text-red-600 text-sm'>loading...</p>:null}
                        </div>

                        <div className='py-3'>
                        <button onClick={handleSubmit} 
                        className='mt-5 w-28 py-2 bg-green-900 rounded hover:brightness-110 text-white text-lg cursor-pointer'>
                            Register
                        </button>
                        {/* {isLoading?<p className='text-red-600 text-sm'>loading...</p>:null} */}
                    </div> 
                    </div>
                </div>      
                </form>
            </div>

            <div className='bg-green-900 text-white rounded-r-xl'>
                <div className='mx-4 py-4'>
                    <h1 className='text-2xl mb-6 w-96'>Summary</h1>
                    <ul className='text-lg'>
                        <div className='flex justify-between mb-6'>
                        <li>Vehicle Owner</li>
                        <p>{formParams.ownername}</p>
                        </div>

                        <div className='flex justify-between mb-6'>
                        <li>Vehicle Model</li>
                        <p>{formParams.model}</p>
                        </div>

                        <div className='flex justify-between mb-6'>
                        <li>Vehicle Color</li>
                        <p>{formParams.color}</p>
                        </div>

                        <div className='flex justify-between mb-6'>
                        <li>License Plate</li>
                        <p>{infos.plate}</p>
                        </div>    

                        <div className='flex justify-between mb-6'>
                        <li>Vehicle Photo</li>
                        <p><img src={fileURL} className='h-20 w-20'/></p>
                        </div>                                   

                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default VehicleRegisteration