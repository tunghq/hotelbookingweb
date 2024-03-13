/* eslint-disable no-unused-vars */
import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../common/Header'

const BookingSuccess = () => {
    
    const location = useLocation()
    const message = location.state?.message
    const error = location.state?.message
    console.log(location);
    return (
    <div className='container'>
        <Header title="Booking Success"/>
        <div className='mt-5'>
            {message ? (
                <div>
                    <h3 className='text-success'> Booking Success!!</h3>
                    <p className='text-success'>{message}</p>
                </div>
            ):(
                <div>
                    <h3 className='text-danger'> Error Booking Room!!</h3>
                    <p className='text-danger'>Sorry..., This room is not available for the selected dates</p>
                </div>
            )}

        </div>
    </div>
  )
}

export default BookingSuccess