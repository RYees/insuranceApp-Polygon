import React from 'react';
import {
  banner3, 
  tire,
  car1,
  car2,
  car3,
  car4,
  car5,
  car6,
  truck,
  bus,
} from "../assets/index";

const Dashboard = () => {
  return (
    <div className='my-12'>
      <div>
        <img src={tire} alt="" className='relative h-[20rem] w-[60rem] py-1 bg-cover bg-green-900 rounded-xl'/>
        <div class="absolute top-0 my-14 h-[20rem] w-[60rem] flex justify-center items-center rounded-xl backdrop-brightness-50">
            <span class="text-white text-4xl w-1/2 text-center">Here</span>
        </div>
      </div>
      <h1 className='my-10 text-xl'>Available Policies</h1>
      
      <div className='flex flex-wrap gap-10'>
        <div 
          className='bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
        >
          <img src={car6} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
            <div>
              <h1 className='transform uppercase text-center text-xl'>auto liability coverage</h1>
            </div>
        </div>

        <div 
          className='bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
        >
          <img src={truck} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
            <div>
              <h1 className='transform uppercase text-center text-xl'>collision coverage</h1>
            </div>
        </div>

        <div 
          className='bg-green-100 h-72 w-72 my-5 cursor-pointer transition duration-700 ease-in-out font-semibold hover:scale-110 hover:brightness-110'
        >
          <img src={car5} alt="" className='mx-auto py-2 h-48 rounded-xl'/>
            <div>
              <h1 className='transform uppercase text-center text-xl'>comprehensive coverage</h1>
            </div>
        </div>

      </div>

    </div>
  )
}

export default Dashboard