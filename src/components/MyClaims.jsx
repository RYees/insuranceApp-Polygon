import React,{useEffect, useContext} from 'react'
import {
  acc1,
  acc3
} from "../assets/index";
import '../css/Style.css';
import { Link } from 'react-router-dom';
import { ClaimContext } from '../context/Claim';

const MyClaims = () => {
  const { getMyClaim, claimMydata } = useContext(ClaimContext);

  useEffect(()=> {
    getMyClaim()
  })

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
    <div>
      <h1 className='my-10 text-xl mx-10'>My Claims</h1>
      
      <div className='flex flex-wrap gap-10 mx-10'>
        {claimMydata.map((item,index) => (
          <Link to={{ pathname:`/claimdetail/${item.claimId}`}}  state={{item,index}}>
            <div 
              className='card bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
            >
              <div><h1>{status(item.status)}</h1></div>
              <img src={item.image} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
                <div>
                  <h1 className='card transform uppercase text-center text-xl'>{item.cause}</h1>
                </div>
                <div>
                  <h1 className='card transform uppercase text-center text-xl'>{item.location}</h1>
                </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  )
}

export default MyClaims