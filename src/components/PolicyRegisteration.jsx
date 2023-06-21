import React,{useState, useContext, useRef} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { InsuranceContext } from '../context/InsurancePolicy';
import { uploadFileToIPFS } from "../pinata";
import { FaHourglass } from "react-icons/fa";
import '../css/Style.css';

const PolicyRegisteration = () => {
  const { currentAccount, CreatePolicy, formParams, updateFormParams } = useContext(InsuranceContext);
  const [amount, setAmount] = useState({
    premiumAmount : ''
  });
  const [fileURL, setFileURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
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
     //console.log("ready", amount.premiumAmount, fileURL);   
     CreatePolicy(amount.premiumAmount, fileURL);
   };

  return (
    <>
    <div>
        <div className='flex flex-wrap gap-10 mx-40 mb-32 my-20'>
                <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
                <h3 className="text-sm text-gray-600 flex justify-between"> Total Policies <FaHourglass className="text-green-900 text-3xl"/></h3> 
                <br></br><span className='text-bold text-green-900 text-4xl'>14</span></div>
                <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
                <h3 className="text-sm text-gray-600 flex justify-between"> Total Claims <FaHourglass className="text-green-900 text-3xl"/></h3>
                <br></br><span className='text-bold text-green-900 text-4xl'>3</span></div>
                <div className='box hover:brightness-105 transition duration-150 ease-out hover:ease-in border border-10 border-gray-300 rounded-lg bg-white w-56 p-2'>
                <h3 className="text-sm text-gray-600 flex justify-between"> Total Vehicles<FaHourglass className="text-green-900 text-3xl"/></h3> 
                <br></br><span className='text-bold text-green-900 text-4xl'>5</span></div>     
        </div>
    
        <div className='flex flex-col 2xl:flex-row xl:flex-row lg:flex-row rounded-xl my-10 bg-green-100 mx-1'>
            <div 
                className='text-gray-600 font-serif flex justify-between'>
                <form className='flex justify-center py-4'>
                <div className='fields px-10'>
                    <div className='mb-6 text-sm text-black'>
                        <h1 className='text-2xl'>Register Policy</h1>
                    </div>
                    <div className=' flex flex-wrap'>    
                        
                        <div className="mb-4">
                        <label className=''>Premium Amount </label><br></br>
                            <input className='text-gray-700 border py-2 px-2 rounded w-72 mr-5' 
                            placeholder="premimum amount" type="number" step={0.1} name="premimum amount" 
                            //ref={premiumAmount}
                            onChange={e => setAmount({...amount, premiumAmount: e.target.value})} 
                            value={amount.premiumAmount}
                            />
                        </div>

                        <div className="mb-4">
                        <label className=''>Policy Name </label><br></br>
                            <input className='text-gray-700 border py-2 px-2 rounded w-72' 
                            placeholder="policy name" type="text" name="policy name" 
                            onChange={e => updateFormParams({...formParams, policyname: e.target.value})} 
                            value={formParams.policyname}/>
                        </div>

                        <div className="mb-4">
                        <label className=''>Description</label><br></br>
                            <textarea className='text-gray-700 border py-2 px-2 rounded w-96' 
                            placeholder="policy description" type="text" name="description" 
                            onChange={e => updateFormParams({...formParams, description: e.target.value})} 
                            value={formParams.description}/>
                        </div>

                        <div>
                            <label className="block text-black mb-2" htmlFor="image">Upload</label>
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
                        <li>Policy Name</li>
                        <p>coverage</p>
                        </div>

                        <div className='flex justify-between mb-6'>
                        <li>Premimum Account</li>
                        <p>0.001</p>
                        </div>

                        <div className='flex justify-between mb-6'>
                        <li>Description</li>
                        <p>lorem fine so... </p>
                        </div>

                        <div className='flex justify-between'>
                        <li>Upload File</li>
                        <p>cov.png</p>
                        </div>                                     

                    </ul>
                </div>
            </div>

        </div>
    </div>
    </>
  )
}

export default PolicyRegisteration