import React, {useEffect, useContext} from 'react'
import { car2 } from '../assets'
import { NavLink, useLocation } from 'react-router-dom';
import { InsuranceContext } from '../context/InsurancePolicy';
const PolicyDetails = () => {
    const { monthlyAmount, monthlyamount,checkOwnership, isAdmin } = useContext(InsuranceContext);
    const { state } = useLocation();
    const { index } = state || {};
    const { item } = state || {};
    //console.log("coco", item); 
    useEffect(() => {
       
    });

    return (
        <>
                    
        <div className='my-32 border rounded-xl mx-20 py-5 shadow'>
           {!isAdmin ? <div>
           <NavLink to={{ pathname:`/vehicleregisteration/${item.policyId}`}} state={{item, index}}>
                <button
                    className='text-green-500 float-right w-40 rounded hover:brightness-110 transform underline'>
                    Register Your Vehicle
                </button>
            </NavLink>
            </div> : null }

            <div>
                <h1 className='transform uppercase text-2xl text-center my-5' 
                onClick={checkOwnership}
                >{item.policyname}</h1>
                <h1 className='transform lowercase text-xl font-bold'>{monthlyamount}</h1>
            </div>
            
            <div className='mx-2 md:mx-10 xl:mx-20 2xl:mx-40'>            
                <p className='text-justify text-lg leading-10 text-gray-600'>
                   {item.description}
                </p>
            </div>
    
            <div className='flex justify-center mx-10 '>
                <div><img src={item.image} alt="" className='mx-auto rounded-xl'/></div>
            </div>
        </div>
       </>
      )
}

export default PolicyDetails