import React,{useState, useContext} from 'react';
import { FaPlus, FaTimes } from "react-icons/fa";
import { InsurancePolicy } from '../context/InsurancePolicy';
import { Link } from 'react-router-dom';
//import '../css/Style.css';

const InsurancePolicyRegister = () => {
  //const { connectWallet, currentAccount} = useContext(InsurancePolicy); 

  const[show, setShow] = useState(false); 
  const premiumAmount = React.useRef();
  const description = React.useRef();

  const handleSubmit = (e) => {
    //const { address, ownerIPname, bidvalue, bidderaddress } = bidformData;    
    e.preventDefault();
    //if (!address || !ownerIPname || !bidvalue || !bidderaddress ) return;
    //depositBid(item.tokenId, ipadd.current.value, ipname.current.value, bidval.current.value);
  };

  return (
    <>
      <div>
         <Link className="arrow mb-6 bg-gradient-to-r from-black via-gray-300" 
         to="/"
         //onClick={routeChange}
         >Back</Link>
      </div>

  <div data-testid='show'
    className='regcont contain-1 text-gray-600 font-serif flex justify-between'>
      <form className='bidform px-5 mx-20 mt-28 bg-white flex justify-center'>
       <div className='fields px-10'>
        <div className='mb-6 py-3 text-center text-sm text-black'><h1>Register Policy</h1></div>
          <div className=''>    
            <div className="mb-4">
            <label className='text-xl'>Premium Amount</label><br></br>
                <input className='input-box text-gray-700 border py-2 px-2 rounded' ref={premiumAmount} type="text" name="premiumAmount" placeholder="setup premiumAmount"/>
            </div>

            <div className='mb-4'>
            <label className='text-xl'>Description</label><br></br>
                <input className='input-box text-gray-700 border py-2 px-2 rounded' ref={description} type="text" name="ownerIPname" placeholder='policy description'/>
            </div>

            <div className='py-3'>
              <button onClick={handleSubmit} className='mt-5 w-28 py-3 bg-black rounded text-white text-lg cursor-pointer'>Register</button>
              {/* {isLoading?<p className='text-red-600 text-sm'>loading...</p>:null} */}
          </div> 
        </div>
       </div>      
      </form>  
    
      {/* <div className=''>
        <FaTimes data-testid='close' size={35} onClick={closeView} className="cursor-pointer bg-red-500 -ml-20 mt-4"/>
      </div>  */}
    </div>
    </>
  )
}

export default InsurancePolicyRegister