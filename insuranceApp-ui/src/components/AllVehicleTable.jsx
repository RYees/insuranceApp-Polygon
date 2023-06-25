import React, {useEffect, useState, useContext} from 'react'
import ReactPaginate from 'react-paginate';
import '../css/Style.css';
import { VehicleContext } from '../context/Vehicle';


const AllVehicleTable = () => {
  const { getAllVehicles, vehicledata } = useContext(VehicleContext);
  //console.log("vdata", vehicledata);
  useEffect(() => {
    getAllVehicles();
  })
  
  const [currentItems, setCurrentItems] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(vehicledata.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(vehicledata.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, vehicledata]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % vehicledata.length;
    setItemOffset(newOffset);
  };
  

  return (
    <div className='mx-20 mb-32'>
      <table className='table table-striped'>
        <thead>
          <tr className=''>
            <th className='text-white'>ID</th>
            <th className='text-white'> Owner Name</th>
            <th className='text-white'> Model </th>
            <th className='text-white'> Color </th>
            <th className='text-white'> Image </th>
            <th className='text-white'> PolicyId </th>            
            <th className='text-white'> OwnerAddress</th>
            <th className='text-white'> LicensePlate</th>
          </tr>
        </thead>
        <tbody className='bg-gray-100'>           

        {vehicledata.map((item,index) => ( 
            <tr key={index}> 
              <td >{index}</td>
              <td className='text-center'>{item.ownername}</td>
              <td>{item.model}</td>
              <td className='text-center'>{item.color}</td>
              <td><img src={item.image} className='h-10 w-10'/></td>
              <td>{item.policyId}</td>
              <td >{item.vehicleOwnerAddress}</td>    
              <td className='text-black'>{item.licensePlate}</td>             
              {/* <td className='text-center'>
                <button 
                className='bg-black text-white py-1 px-6 rounded' 
                onClick={(event) => acceptBidding(item.tokenID, item.bidderAddress, item.bidValue, event)}
                >
                Accept
                </button>
              </td> */}
            </tr>
         ))
         }         
        </tbody>
      </table> 
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        //onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
     </div>
  )
}

export default AllVehicleTable