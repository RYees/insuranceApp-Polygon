import React, { useEffect, useContext } from 'react'
import {
  car5,
  car6,
  truck
} from "../assets/index";
import '../css/Style.css';
import { VehicleContext } from '../context/Vehicle';
import { Link } from 'react-router-dom';

const MyVehicles = () => {
  const { getMyVehicles, myvehicledata } = useContext(VehicleContext);

  useEffect(() => {
    getMyVehicles();
  });

  return (
    <div>
      <h1 className='my-10 text-xl ml-2'>My  Vehicles</h1>      
      <div className='flex flex-wrap gap-10 ml-24 md:ml-0'>   
      
      {myvehicledata.map((item, index) => (     
        <div 
          className='card bg-green-100 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
        >
          <div>
              <h1 className='card transform uppercase text-center text-xl'>{item.licensePlate}</h1>
           </div>
          <img src={item.image} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
            <div>
              <h1 className='card transform uppercase text-center text-xl'>{item.model}</h1>
              <h1 className='card transform uppercase text-center'>Color: {item.color}</h1>
            </div>
            <div className='text-center my-3'>
             <Link to={{ pathname:`/claimsubmission/${index+1}`}}  state={{item,index}}>
              <button className='btn-box px-10 py-4 shadow-sm'>Claim</button></Link> 
            </div>
        </div>
        ))}

      </div>
    </div>
  )
}

export default MyVehicles