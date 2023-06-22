import React, {useEffect, useState, useContext} from 'react'
import ReactPaginate from 'react-paginate';
import '../css/Style.css';
import { ClaimContext } from '../context/Claim';
import { ShortenAddress } from './ShortenAddress';
import { Link } from 'react-router-dom';
const AllClaimsTable = () => {
  const { listAllClaims, claimdata } = useContext(ClaimContext);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    listAllClaims();
  })

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(claimdata.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(claimdata.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, claimdata]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % claimdata.length;
    setItemOffset(newOffset);
  };

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
    <div className='mx-20 mb-32'>
      <table className='table table-striped'>
        <thead>
          <tr className=''>
            <th className='text-white'>ID</th>
            <th className='text-white'> Claim Id</th>
            <th className='text-white'> Policy Id</th>
            <th className='text-white'> Claimant </th>                      
            <th className='text-white'> Reason</th>
            <th className='text-white'> Status</th>
            <th className='text-white'> Date </th>  
            <th className='text-white'> Medical Report </th>  
            <th className='text-white'> Crash Image </th>
            <th className='text-white'> Description </th>  
          </tr>
        </thead>
        <tbody className='bg-gray-100'>
        
        {claimdata.map((item,index) => ( 
            <tr key={index}> 
              <td >{index}</td>
              <td >{item.claimId}</td>    
              <td className='text-black'>{item.policyId}</td>             
              <td>{ShortenAddress(item.claimant)}</td>            
              <td className='text-center'>{item.cause}</td>
              <td>{status(item.status)}</td>
              <td>{item.date}</td>
              <td><img src={item.medicalevidence} className='h-10 w-10'/></td>
              <td><img src={item.image} className='h-10 w-10'/></td>
              <td className='text-center'>
                <Link to={{ pathname:`/claimdetail/${item.claimId}`}}  state={{item,index}}>
                  <button className='transform underline'>
                    details
                  </button>
                </Link>
              </td>
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

export default AllClaimsTable