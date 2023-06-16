import { AiFillCar, AiOutlineCar, AiOutlineFolderView } from "react-icons/ai";
import { GiNewspaper } from "react-icons/gi";
//import { GrUpdate } from "react-icons/gr";
import { SiAcclaim } from "react-icons/si";

import { Link } from 'react-router-dom';


export default function Sidebar() {
	return (
	   <div className="py-2 px-2 bg-gray-100 w-64">
         <Link className="flex" to="/">
				<AiOutlineCar className="mt-1 mr-1 bg-cyan-900 text-white" size={30}/>
                <p className="mt-3 text-xl">Insurance</p> 
		   </Link><br></br>

        <nav className=''>
            <ul className='flex-col mt-3 text-xl font-serif'>
                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiFillCar className="mt-1"/> <Link className='ml-2 hover:text-black text-gray-800' to="/vehicleregisteration">Vehicle Registration</Link>
                </li>

                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-gray-800' to="/viewvehicles">My Vehicles</Link>
                </li>

                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-gray-800' to="/viewvehicles">All Vehicles</Link>
                </li>

                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                    <GiNewspaper className="mt-1"/> <Link className='ml-2 hover:text-black text-gray-800' to="/insurancepolicyregister">Insurance Policy</Link>
                </li>

                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-gray-800' to="/allclaims">All Policy</Link>
                </li>

                <li className="flex cursor-pointer hover:brightness-110">
                   <SiAcclaim className="mt-1"/> <Link className='ml-2 hover:text-black text-gray-800' to="/claim">Submit Claim</Link>
                </li>  
                
                <li className="flex mb-2 cursor-pointer hover:brightness-110">
                   <AiOutlineFolderView className="mt-1"/> <Link className='ml-2 hover:text-black text-gray-800' to="/allclaims">All Claims</Link>
                </li>          
            </ul>
      </nav>
    </div>
	);
}