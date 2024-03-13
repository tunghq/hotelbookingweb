/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Pagination from 'react-bootstrap/Pagination'; 


const RoomPaginator = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = Array.from({length: totalPages}, (_,i)=> i+1)
  return (
    <nav aria-label='Page navigation'>
        <ul className=''>
        <Pagination className='justify-content-center'> 
            {pageNumbers.map((pageNumber)=>(
                    <li 
                        key={pageNumber}
                        className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                        >
                            <button  onClick={() => onPageChange(pageNumber)} className='page-link' type="button">
                                {pageNumber}
                            </button>
                    </li>
                ))}
        </Pagination>
            

        </ul>
    </nav>
  )
}

export default RoomPaginator