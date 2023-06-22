import React from 'react'
import { acc1, acc3 } from '../assets'
import { useLocation } from 'react-router-dom';

const ClaimDetails = () => {
    const { state } = useLocation();
    const { index } = state || {};
    const { item } = state || {};

  return (
    <div className='my-32 border rounded-xl mx-20 py-5 shadow'>
        <div>
            <h1 className='transform uppercase text-2xl text-center'>{item.cause}</h1>
        </div>
        <div className='flex justify-center gap-10 mx-2 text-xl my-5 text-gray-500'>
            <p>Date: <strong>{item.date}</strong></p>
            <p>Location: <strong>{item.location}</strong></p>
        </div>

        <div className='flex justify-between gap-40 mx-20 my-20'>
            <div>
                <p className='text-xl'>Medical Report</p>
                <img src={item.medicalevidence} alt="" className='mx-auto py-2 h-48 rounded-xl'/>                
            </div>
            <div>
                <p className='text-xl'>Crash Image</p>
                <img src={item.image} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
            </div>
        </div>

        <h1 className='text-xl mx-20 my-4'>Details</h1>
        <div className='mx-5 md:mx-10 xl:mx-20 2xl:mx-20'>           
            <p className='text-justify text-lg leading-10 text-gray-600'>
                {item.description}
            </p>
        </div>

        
    </div>
  )
}

export default ClaimDetails