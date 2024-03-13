/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { Link, useParams } from "react-router-dom";
import RoomTypeSelection from "../common/RoomTypeSelection";
export const EditRoom = () => {
    const[room, setRoom] = useState({
        photo:null,
        roomType:"",
        roomPrice: ""
    })

    const [imagePreview, setImagePreview] = useState("");
    const[successMessage, setSuccessMessage] = useState("");
    const[errorMessage, setErrorMessage] = useState("")
    const{roomId} = useParams("roomId")
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setRoom({...room, photo:selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage));
    }
    const handleRoomInputChangne = (e) =>{
        const name =  e.target.name
        let value = e.target.value
        let parsedValue = value;
        if(name === "roomPrice"){
            if(!isNaN(parseInt(value))){
                parsedValue = parseInt(value);
            }else{
                parsedValue = ""; 
            }
        }
        setRoom({...room, [name]: parsedValue})
    }
    const handleSubmit = async(event) => {
        event.preventDefault()
        try{
            const response = await updateRoom(roomId, room)
            if(response.status === 200){
                setSuccessMessage("Room updated successfully!")
                const updateRoomData = await getRoomById(roomId)
                setRoom(updateRoomData)
                setImagePreview(updateRoomData.photo)
                setErrorMessage("")
            }else{
                setErrorMessage("Error Updating room")

            }
        }catch(e){
            console.error(e)
            setErrorMessage(e.message)
        }
        setTimeout(()=>{
            setSuccessMessage("")
            setErrorMessage("")
        }, 3000)
    }
     //fetch rooms 
     useEffect(() => {
        const fetchRooms = async() =>{
            try{
                const roomData = await getRoomById(roomId)
                setRoom(roomData)
                setImagePreview(roomData.photo)
    
            }catch(err){
                setErrorMessage(err.message)
            }
        }
        fetchRooms()

    },[roomId])
    
  return (
    <div>
        <div className='row justify-content-center'>
                <div className='col-md-8 col-lg-6'>
                    <h2 className='mt-5 mb-2'>Edit Room</h2>
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
                    
                    <form onSubmit={handleSubmit} action="">
                        <div className='mb-3'>
                            <label className='form-label' htmlFor="roomType">Room Type: </label>
                            <div>
                                <RoomTypeSelection 
                                handleRoomInputChange={handleRoomInputChangne} 
                                newRoom={room}/>
                            </div>
                        </div>
                        <div className='mt-3'>
                            <label className='form-label' htmlFor="roomPrice">Room Price: </label>
                            <input 
                                type='number'
                                className='form-control' 
                                required 
                                id='roomPrice' 
                                name='roomPrice' 
                                value={room.roomPrice} 
                                onChange={handleRoomInputChangne} 
                            />
                        </div>
                        <div className='mt-3'>
                            <label className='form-label' htmlFor="photo">Room Photo: </label>
                            <input 
                                id='photo'
                                name='photo'
                                type='file'
                                className='form-control'
                                accept='image/*'
                                onChange={handleImageChange}

                            />
                            {imagePreview && (
                                <img src={`data:image/jpeg;base64, ${imagePreview}`} 
                                alt='Preview Room Photo' 
                                className='mt-3' 
                                style={{maxWidth:"400px", maxHeight: "400px"}}/>
                            )}
                            
                        </div>

                        <div className='d-grid d-md-flex mt-2'>
                            
                            <button className='btn btn-outline-primary ml-5'>
                                Save Room
                            </button>
                            &nbsp;
                            <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                                Back
                            </Link>
                        </div>
                    </form>
                </div>

            </div>
    </div>
  )
}
