import React,{useContext, useState} from 'react';
import { ClaimContext } from '../context/Claim';
import { useLocation } from "react-router-dom";
import '../css/Style.css';

const PayAcceptedClaim = () => {
    const { message, payAcceptedClaim } = useContext(ClaimContext);
    const [payamount, setAmount] = useState({
        amount : ''
      });

    const { state } = useLocation();
    const { item } = state || {};
    
    const handleSubmit = (e) => {    
        e.preventDefault();
        console.log(
            "sis", payamount.amount
        );
        payAcceptedClaim(item.claimId, payamount.amount, item.claimant);
    };

    return (
        <>
         <div  className='container contain-1 text-gray-600 font-serif flex justify-center '>
            <form className='form-status status-form text-black shadow-2xl px-5 mx-20 my-40 bg-white flex'>
                <div className='fields px-10'>
                    <div className='mb-10 py-3 text-3xl text-black'><h1 className='tit'>Pay Policyholder</h1></div>
                        <div className=''>    
                            <div className="mb-4">
                            <label className=''>Amount </label><br></br>
                                <input className='text-gray-700 border py-2 px-2 rounded w-72 mr-5' 
                                placeholder="amount to transfer" type="number" step={0.1} name="amount" 
                                onChange={e => setAmount({...payamount, amount: e.target.value})} 
                                value={payamount.amount}
                                />
                            </div>
                            <div className='py-3'>
                                <button onClick={handleSubmit} className='mt-5 w-28 py-3 bg-green-700 rounded text-white text-lg cursor-pointer'>
                                    Pay
                                </button>
                            </div>   
                            <div className='text-xl text-gray-500'>{message}</div>                     
                        </div>
                </div>    
            </form>        
        </div>
    </>
  )
}

export default PayAcceptedClaim