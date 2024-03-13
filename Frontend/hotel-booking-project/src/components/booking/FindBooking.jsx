/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { cancelBooking, getBookingByConfirmationCode } from '../utils/ApiFunctions';
import moment from 'moment';

const FindBooking = () => {
    const [confirmationCode,setConfirmationCode] = useState("");
    const [error,setError] = useState(null)
    const [successMassage,setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [bookingInfo, setBookingInfo] = useState({
        id:"",
        room:{id:"", roomType: ""},
        bookingConfirmatioNCode:"",
        roomNumber:"",
        checkInDate:"",
        checkOutDate:"",
        guestFullName:"",
        guestEmail:"",
        numOfAdults:"",
        numOfChildren:"",
        totalNumOfGuest:""
    })
    const clearBookingInfo ={
        id:"",
        room:{id:"", roomType: ""},
        bookingConfirmatioNCode:"",
        roomNumber:"",
        checkInDate:"",
        checkOutDate:"",
        guestFullName:"",
        guestEmail:"",
        numOfAdults:"",
        numOfChildren:"",
        totalNumOfGuest:""
    }

    const [isDeleted,setIsDeleted] = useState(false)
    const handleInputChange=(e)=>{
        setConfirmationCode(e.target.value)
    }
    const handleFormSubmit = async(e) =>{
        e.preventDefault()
        setIsLoading(true)
        try{
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
        }catch(error){
            setBookingInfo(clearBookingInfo)
            setError(error.message);

            // if(error.response && error.response.status === 404){
            //     setError(error.response.data.message)

            // }else{
            //     setError(error.response)
            // }


        }
        setTimeout(()=>{
            setIsLoading(false)
        },2000)
    }
    const handleBookingCancellation = async(bookingId) =>{
        try{
            await cancelBooking(bookingId)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(clearBookingInfo)
            setConfirmationCode("")
            setError("")
        }catch(error){
            setError(error.message)
            
        }
        setTimeout(()=>{
            setIsDeleted(false)
            setSuccessMessage("")
        },2000)
    } 
  return (
    <>
        <div className='container mt-5 d-flex flex-column justify-content-center align-items-center'>
            <h2 className='hotel-color'>Find Your Booking</h2>
            <form action="" onSubmit={handleFormSubmit} className='col-md-6'>
                <div className='input-group mb-3'>
                    <input type="text" 
                    className='form-control'
                    id='confirmationCode'
                    name='confirmationCode'
                    value={confirmationCode}
                    onChange={handleInputChange}
                    placeholder='Enter the booking confirmation code.....'          
                    />
                    <button className='btn btn-hotel input-group-text'>Find Booking</button>

                </div>

            </form>
            {isLoading ? (
                <div>
                    Finding your booking....
                </div>
            ): error ? (
                <div className='text-danger'>
                    {error}
                </div>
            ) : bookingInfo.bookingConfirmationCode ? (
                <div className='col-md-6 mt-4 mb-5'>
                    <h3>Booking Information</h3>
                    <p>Booking Confirmation Code: {bookingInfo.bookingConfirmationCode}</p>
                    <p>Booking ID: {bookingInfo.id}</p>
                    <p>Room Number: {bookingInfo.room.id}</p>
                    <p>Room Type : {bookingInfo.room.roomType}</p>
                    <p>
							Check-in Date:{" "}
							{moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
						</p>
						<p>
							Check-out Date:{" "}
							{moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
						</p>
                    <p>Guest Full Name: {bookingInfo.guestFullName}</p>
                    <p>Guest Email: {bookingInfo.guestEmail}</p>
                    <p>Adults: {bookingInfo.numOfAdults}</p>
                    <p>Children: {bookingInfo.numOfChildren}</p>
                    <p>Total Guest: {bookingInfo.totalNumOfGuest}</p>
                    {!isDeleted && (
                        <button
                        className='btn btn-danger'
                        onClick={()=>handleBookingCancellation(bookingInfo.id)}
                        >Cancel Booking</button>
                    )}
                </div>
            ): (
                <div>
                    Find booking....
                </div>
            )}

            {isDeleted && (
                <div className='alert alert-success mt-3 ' role='alert'>{successMassage}</div>
            )}
        </div>
    </>
  )
}

export default FindBooking