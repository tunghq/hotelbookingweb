/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions'
import { Col, Row } from 'react-bootstrap'
import RoomFilter from '../common/RoomFilter'
import RoomPaginator from '../common/RoomPaginator'
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';

export const ExistingRooms = () => {
    const[rooms, setRooms] = useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[roomsPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredRooms, setFilteredRooms] = useState([])
    const[selectedRoomType, setSelectedRoomType] = useState("")
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")                                    
  
    //fetch rooms 
    useEffect(() => {
        fetchRooms()

    },[])
    const fetchRooms = async() =>{
        setIsLoading(true)
        try{
            const result = await getAllRooms()
            setRooms(result)
            setIsLoading(false)

        }catch(err){
            setErrorMessage(err.message)
        }
    }
    //filter with roomtype
    useEffect(()=>{
        if(selectedRoomType === ""){
            setFilteredRooms(rooms)
        }
        else{
            const filtered = rooms.filter((room)=> room.roomType === selectedRoomType)
            setFilteredRooms(filtered)

        }
        setCurrentPage(1)
    },[rooms,selectedRoomType])
    //get page Number
    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //delete 
    const handleDelete = async(roomId) => {
        try {
            const result = await deleteRoom(roomId)
            if(result === ""){
                setSuccessMessage(`Room No ${roomId} was deleted`)
                fetchRooms()
            }else{
                setErrorMessage(`Error deleting room: ${result.message}`)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        },2000)
    
    }
    const calculateTotalPage = (filteredRooms, roomPerPage, rooms) =>{
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms / roomPerPage)
        
    }

    const indexOfLastRoom = currentPage * roomsPerPage
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom)
    
    return (
    <>
        {isLoading ? (
            <p>Loading existing rooms</p>
        ) : (
            <>
            <section className='mt-5 mb-5 container'>
                <div className='d-flex justify-content-center mb-3 mt-5'>
                    <h2>Existing Rooms</h2>
                    
                </div>
                {successMessage && (
                                <div className='alert alert-success fade show'>
                                    {successMessage}
                                </div>
                            )}
                    {errorMessage && (
                                <div className='alert alert-danger fade show'>
                                    {errorMessage}
                                </div>
                            )} 
                <Row>
                    <Col md = {6} className='mb-3 mb-md-0'>
                        <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                    </Col>
                    <Col md = {6} className='d-flex justify-content-end'>
                        <Button variant="success">
                            <Link  to={"/add-room"} style={{
                                textDecoration:"none",
                                color:"white"
                            }}>
                                <FaPlus/> Add room
                            </Link>
                        </Button>
                    </Col>
                </Row>
                <br />
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr className='text-center'>
                            <th>No.</th>
                            <th>Room Id</th>
                            <th>Room Type</th>
                            <th>Room Price ($)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.map((room,index) => (
                            <tr key={index+1} className='text-center'>
                                <td>{index+1}</td>
                                <td>{room.id}</td>
                                <td>{room.roomType}</td>
                                <td>{room.roomPrice}</td>
                                <td className='gap-2'>
                                    <Link to={`/edit-room/${room.id}`} >
                                        <span className='btn btn-info btn-sm'>
                                            <FaEye/> 
                                            </span>
                                    </Link>
                                    &nbsp;
                                    <Link to={`/edit-room/${room.id}`}>
                                        <span className='btn btn-warning btn-sm'>
                                            <FaEdit/> 
                                            </span>
                                    </Link>
                                    &nbsp;
                                    <button 
                                    className='btn btn-outline-danger btn-sm' 
                                    onClick={()=>handleDelete(room.id)}
                                    ><FaTrashAlt/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <RoomPaginator 
                currentPage={currentPage}
                totalPages={calculateTotalPage(filteredRooms,roomsPerPage,rooms)}
                onPageChange={handlePaginationClick}
                />
            </section>
            </>
        )}
    </>
  )
}
