import React from 'react'
import { acc1, acc3 } from '../assets'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ClaimDetails = () => {
    const { state } = useLocation();
    const { index } = state || {};
    const { item } = state || {};

    function status(status) {
        if(status == 0){
          return <h1>Submitted</h1>
        } else if(status == 1) {
          return <h1>Accepted</h1>
        } else if(status == 2) {
          return <h1>Rejected</h1>
        }
      }
  
      
  return (
    <>      
        <div className='my-32 border rounded-xl mx-20 py-5 shadow'>
            <div>
                <h1 className='transform uppercase text-xl font-bold mx-2'>{status(item.status)}</h1>
            </div>
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

            <div className='my-10 mx-20'>
                <Link to={{ pathname:`/claimstatus/${item.claimId}`}}  state={{item,index}}>
                    <button className='transfrom uppercase bg-green-700 p-2 rounded text-white'>
                        claim status
                    </button>
                </Link>
            </div>
        </div>

    </>
  )
}

export default ClaimDetails