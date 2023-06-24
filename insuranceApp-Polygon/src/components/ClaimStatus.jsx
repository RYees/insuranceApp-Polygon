import React,{useContext} from 'react';
import { ClaimContext } from '../context/Claim';
import { useLocation, Link } from "react-router-dom";
import '../css/Style.css';

const ClaimStatus = () => {
    const { updateClaimStatus, message, payAcceptedClaim } = useContext(ClaimContext);
    const status = React.useRef();

    const { state } = useLocation();
    const { index } = state || {};
    const { item } = state || {};
    
    const handleSubmit = (e) => {    
        e.preventDefault();
        let val = status.current.value; 
        if (val == 'Accepted') {
            val = 1;
        } else if (val == 'Rejected') { val = 2; }
        updateClaimStatus(item.claimId, val);
    };

    return (
        <>
        <div className='flex flex-col my-40 mx-20'>
         <div  className='container contain-1 text-gray-600 font-serif flex justify-center '>
            <form className='form-status status-form text-black shadow-2xl px-5 mx-20 bg-white flex'>
                <div className='fields px-10'>
                    <div className='mb-10 py-3 text-3xl text-black'><h1 className='tit'>Change Claim Status</h1></div>
                        <div className=''>    
                            <div className='mb-4'>
                            <label className='text-lg'>Update Status</label><br></br>
                                <select ref={status} className='w-96 mt-5 border h-10'>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <div className='py-3'>
                                <button onClick={handleSubmit} className='mt-5 w-28 py-3 bg-green-700 rounded text-white text-lg cursor-pointer'>Change</button>
                            </div>   
                            <div className='text-xl text-gray-500'>{message}</div>                     
                        </div>
                </div>    
            </form>       
        </div>

        <div className=' text-center'>
        <Link to={{ pathname:`/payamount/${item.claimId}`}}  state={{item,index}}>
            <button className='py-3 transform underline text-green-700 rounded text-lg cursor-pointer'>
                transfer money to claim accepted user
            </button>
        </Link>
        </div> 

        </div>
    </>
  )
}

export default ClaimStatus