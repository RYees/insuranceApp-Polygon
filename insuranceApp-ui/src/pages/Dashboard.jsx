import React, {useContext, useEffect} from 'react';
import {
  tire
} from "../assets/index";
import '../css/Style.css';
import AllPolicy from '../components/AllPolicy'
import { InsuranceContext } from '../context/InsurancePolicy';
import { ClaimContext } from '../context/Claim';
import { VehicleContext } from '../context/Vehicle';

const Dashboard = () => {
  const { getAllPolicies } = useContext(InsuranceContext);
  const { getAllVehicles } = useContext(VehicleContext);
  const { listAllClaims } = useContext(ClaimContext);

  useEffect(()=>{
    getAllPolicies();
    getAllVehicles();
    listAllClaims();
  })

  return (
    <div className='my-12'>
      <div>
          <img src={tire} alt="" className='relative md:h-[20rem] md:w-[60rem] py-1 bg-cover bg-green-900 rounded-xl'/>
          <div className="absolute w-full h-[30.6rem] sm:h-[45.3rem] md:w-[28rem] lg:w-[43.4rem] xl:w-[53rem]  md:h-[20rem] text-2xl -mt-[30.6rem] sm:-mt-[45.5rem] md:first-letter md:first-letter md:top-0 md:first-letter md:my-14 xl:h-[20rem] 2xl:w-[60rem] flex justify-center items-center rounded-xl backdrop-brightness-50">
              <span className="text-white md:text-4xl md:w-1/2 text-center">Nothing Works Better Than an Insurance</span>
          </div>
          <p className='text-center md:text-4xl text-gray-400 italic'>Lucky, you crashed into us</p>
      </div>
      <h1 className='my-10 text-xl ml-2'>Available Policies</h1>
      
      <div className=''>
        <AllPolicy/>
      </div>

    </div>
  )
}

export default Dashboard