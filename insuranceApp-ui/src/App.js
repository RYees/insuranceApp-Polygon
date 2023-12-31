import React, {useContext} from "react";
import { Route, Routes} from 'react-router-dom';
import Layout from "./layout/Layout";
import { car3, car4 } from './assets'
import {
  Dashboard, 
  ClaimSubmission, 
  Allvehicle, 
  InsurancePolicyRegister, 
  VehicleRegisteration,
  AllClaims,
  Policies,
  MyClaim,
  MyVehicle,
  PolicyDetails,
  ClaimDetails
} from "./pages/index";
import { InsuranceContext } from './context/InsurancePolicy';
import ClaimStatus from "./components/ClaimStatus";
import PayAcceptedClaim from "./components/PayAcceptedClaim";

function App() {
  const { connectWallet, currentAccount } = useContext(InsuranceContext);
  console.log("marsh", currentAccount);
  return (
    <>
    <div className="flex flex-col gap-2 my-2 2xl:flex-row 2xl:gap-16 md:flex-row ">
        <Layout></Layout>
        <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/claimsubmission/:id' element={<ClaimSubmission />} />
            <Route path='/allclaims' element={<AllClaims/>} />
            <Route path='/allvehicle' element={<Allvehicle/>} />
            <Route path='/myclaims' element={<MyClaim/>} />
            <Route path='/myvehicles' element={<MyVehicle/>} />
            <Route path='/vehicleregisteration/:id' element={<VehicleRegisteration/>} />
            <Route path='/insurancepolicyregister' element={<InsurancePolicyRegister />} />
            <Route path='/allpolicies' element={<Policies/>}/>
            <Route path='/policydetail/:id' element={<PolicyDetails/>}/>
            <Route path='/claimdetail/:id' element={<ClaimDetails/>}/>
            <Route path='/claimstatus/:id' element={<ClaimStatus/>}/>
            <Route path='/payamount/:id' element={<PayAcceptedClaim/>}/>
        </Routes>
          <div className='text-center mr-1'>
            <button
                onClick={connectWallet}
                className='bg-green-900 p-2 w-32 rounded text-white hover:brightness-110'>
                Connect Wallet
            </button>

            <div className="my-5">
              {currentAccount? <p className="text-green-500">CONNECTED</p>: <p className="text-red-500">NOT CONNECTED</p>}
            </div>
          </div>
    </div>
    </>
  )
}

export default App
