/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

const RoomFilter = ({data,setFilteredData}) => {
    
    const[filter, setFilter] = useState("")
    
    const handleSelectChange = (e) => {
        const selectedRowType = e.target.value;
        setFilter(selectedRowType);
        const filteredRooms = data.filter((room)=> room.roomType.toLowerCase().includes(selectedRowType.toLowerCase()));
        setFilteredData(filteredRooms);

    }
    const clearFilter = () =>{
        setFilter("");
        setFilteredData(data);

    }
    const roomTypes = [""].concat(Array.from(new Set(data.map((room) => room.roomType)))).filter(roomType => roomType !== "");//load room type into array
  return (
    <div className='input-group mb-3'>
        
        <Form.Select 
        value={filter}
        onChange={handleSelectChange}>
            <option value={""}>Select a room type to filter...</option>
            {roomTypes.map((type, index)=>(
                <option key={index} value={type}> {type}</option>
                ))}
        </Form.Select>
        <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
    </div>
  )
}

export default RoomFilter