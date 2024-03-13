/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react'
import { getRoomTypes } from '../utils/ApiFunctions'

const RoomTypeSelection = ({ handleRoomInputChange, newRoom }) => {
    const[roomTypes, setRoomTypes] = useState([""])
    const[showRoomTypesInput, setShowRoomTypesInput] = useState(false)
    const[newRoomType, setNewRoomType] = useState("")
    const roleUser = localStorage.getItem("userRole")
    useEffect(()=>{
        getRoomTypes().then((data) => {
            setRoomTypes(data)
        })
    },[])
    const handleNewRoomTypeInputChange= (e) =>{
        setNewRoomType(e.target.value);

    }
    const handleAddNewRoomType = () => {
        if(newRoomType !== ""){
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowRoomTypesInput(false)
        }
    }
  return (
    <>
        {roomTypes.length > 0 && (
            <div className=''>

                <select 
                className='form-select'
                name="roomType" 
                id="roomType"
                value={newRoom.roomType}
                onChange={(e)=>{
                    if(e.target.value === "Add New"){
                        setShowRoomTypesInput(true)
                    }else{
                        handleRoomInputChange(e)
                    }
                }}>
                    <option value={""}>Select a room type</option>
                    {roleUser === 'ROLE_ADMIN' && <option value={"Add New"}> Add New</option>}
                    {roomTypes.map((type, index)=>(

                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
                <br />
                {showRoomTypesInput && (
                    <div className='input-group'>
                        <input 
                            className='form-control'
                            type='text'
                            placeholder='Enter a new Room type'
                            onChange={handleNewRoomTypeInputChange}
                        />
                        <button
                        className='btn btn-hotel'
                        type='button'
                        onClick={handleAddNewRoomType}
                        >
                            Add
                        </button>

                    </div>
                )}


            </div>
        )}
    </>
  )
}

export default RoomTypeSelection