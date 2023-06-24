import React, {useContext, useEffect} from 'react'
import '../css/Style.css';
import { NavLink } from 'react-router-dom';
import { InsuranceContext } from '../context/InsurancePolicy';

const AllPolicy = () => {
  const { getAllPolicies, policydata } = useContext(InsuranceContext);
  // console.log("apolicy", policydata);
  useEffect(() => {
    getAllPolicies();
  })

  return (
    <div>
      {/* <h1 className='my-10 text-xl'>All Policies</h1> */}
      
      <div className='flex flex-wrap gap-10 ml-24 md:ml-0'>
            {policydata.map((item, index) => (
            <NavLink to={{ pathname:`/policydetail/${item.policyId}`}}  state={{item,index}} >
            <div 
            key={`${index}`}
              className='card bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
            >
              <img src={item.image} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
                <div>
                  <h1 className='card transform uppercase text-center text-xl'>{item.policyname}</h1>
                </div>

                <div className='mx-5 text-center'>
                  <p>Yearly Premium Amount: <br></br> <strong>{item.premiumAmount} ether</strong> </p>
                </div>
            </div>
            </NavLink>  
          ))}            
             
      </div>

    </div>
  )
}

export default AllPolicy