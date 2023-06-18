import React, { useState } from "react";
import { AiFillCar, AiOutlineCar, AiOutlineFolderView } from "react-icons/ai";
import { GiNewspaper } from "react-icons/gi";
//import { GrUpdate } from "react-icons/gr";
import { SiAcclaim } from "react-icons/si";
import {BsArrowBarDown, BsCloudArrowDownFill} from "react-icons/bs";
import { Link } from 'react-router-dom';
import { car3, car4 } from '../../assets'

export default function Sidebar() {
   const [show, setShow] = useState(false);
   function changeShow() {
      setShow(!show);
   }
	return (
	   <div className="py-2 mt-3 px-2 text-green-900 mx-2 inset-10 w-64 border rounded shadow bg-gray-50">
        <div className="flex gap-10">
            <div>
               <Link className="flex" to="/">
                  {/* <AiOutlineCar className="mt-1 mr-1 bg-cyan-900 text-white" size={30}/> */}
                  <img src={car3} alt="" className='py-2 h-14 rounded-xl'/>
                  <p className="mt-5 ml-1 text-xl">Insurance</p> 
               </Link><br></br>
            </div>

            <div 
            className="mt-2 bg-green-700 h-12 rounded hover:brightness-110 cursor-pointer" 
            onClick={changeShow}
            >
               <BsCloudArrowDownFill className="text-white " size={50}/>
            </div>
        </div>
        <hr />
        {show ? <nav className=''>
            <ul className='flex-col mt-3 text-xl font-serif'>
                {/* <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiFillCar className="mt-1"/> <Link className='ml-2 hover:text-black text-green-800' to="/vehicleregisteration">Vehicle Registration</Link>
                </li> */}

                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-green-800' to="/myvehicles">My Vehicles</Link>
                </li>

                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-green-800' to="/myclaims">My Claims</Link>
                </li>

                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-green-800' to="/payment
                   ">Monthly Payment</Link>
                </li>


                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-green-800' to="/allvehicle">All Vehicles</Link>
                </li>

                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                    <GiNewspaper className="mt-1"/> <Link className='ml-2 hover:text-black text-green-800' to="/insurancepolicyregister">Policy Registration</Link>
                </li>

                {/* <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-green-800' to="/allpolicies">All Policies</Link>
                </li> */}

            
                {/* <li className="flex cursor-pointer hover:brightness-110">
                   <SiAcclaim className="mt-1"/> <Link className='ml-2 hover:text-black text-green-800' to="/claim">Submit Claim</Link>
                </li>   */}
                
                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-green-800' to="/allclaims">All Claims</Link>
                </li>          
            </ul>
      </nav> : null}
    </div>
	);
}