/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';
import { Card, Form, FormControl } from 'react-bootstrap'
import BookingSummary from './BookingSummary'
const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [isSubmitted,setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const currentUser = localStorage.getItem("userEmail")
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail:currentUser,
        checkInDate:"",
        checkOutDate:"",
        numOfAdults:"",
        numOfChildren:"",


    })
    

    const [roomInfo, setRoomInfo] = useState({
        photo:"",
        roomType:"",
        roomPrice:""
    })

    const {roomId} = useParams()
    const navigate = useNavigate()

    const handleInputChange =(e) =>{
        const{name,value} = e.target
        setBooking({...booking, [name]: value})
        setErrorMessage("")

    }

    const getRoomPriceByRoomId = async(roomId) =>{
        try{
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        }catch(error){
            throw new Error(error)
        }
    }

    useEffect(()=>{
        getRoomPriceByRoomId(roomId)
    },[roomId])

    const calculatePayment = () =>{
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate,"days")
        const paymentPricePerDay = roomPrice ? roomPrice: 0
        return diffInDays * paymentPricePerDay
    }

    const isGuestCountValid = () =>{
        const adultsCount = parseInt(booking.numOfAdults)
        const chidlrenCount = parseInt(booking.numOfChildren)
        const totalCount = adultsCount + chidlrenCount
        return totalCount >= 1 && adultsCount >= 1  
    }

    const isCheckOutDateValid = () =>{
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check-out date must come before check-in date")
            return false
        }else{
            setErrorMessage("")
            return true
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()){
            e.stopPropagation()
        }else{
            setIsSubmitted(true)
        }
        setIsValidated(true)
    }
    const handleBooking = async() =>{
        try{
            
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", {state: { message:confirmationCode }})//gui lai confirmationcode ve home


        }catch(error){
            setErrorMessage(error.message)
            navigate("/booking-success", {state: { error:errorMessage }})//gui lai errorMessage ve home
        }
    }

    const handleBack = () => {
        window.history.back()
    }
  return (
    <>
       <div className='container mb-5'>
            <div className='row'>
                <div className='col-md-5 '>
                    <div className='card card-body mt-5'>
                        <Card.Title><legend>Reverse Room </legend></Card.Title>
                        <Form noValidate validated = {isValidated} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label className='hotel-color' htmlFor='guestFullName'>FullName: </Form.Label>
                                <FormControl
                                required
                                type='text'
                                id='guestFullName'
                                name='guestFullName'
                                value={booking.guestFullName}
                                placeholder='Enter your full name:'
                                onChange={handleInputChange}
                                />

                                <Form.Control.Feedback type='invalid'>
                                    Please enter your full name:
                                </Form.Control.Feedback>
                                
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className='hotel-color' htmlFor='guestEmail'>Email: </Form.Label>
                                <FormControl
                                required
                                type='text'
                                id='guestEmail'
                                name='guestEmail'
                                value={booking.guestEmail}
                                placeholder='Enter your Email:'
                                onChange={handleInputChange}
                                />

                                <Form.Control.Feedback type='invalid'>
                                    Please enter your email
                                </Form.Control.Feedback>
                                
                            </Form.Group>
                            <br />
                            <fieldset type={{border:"2px"}}>
                                <Card.Title >Lodging period:</Card.Title>
                                <div className='row'>
                                    <div className='col-6'>
                                            <Form.Label className='hotel-color' htmlFor='checkInDate'>Check-In Date: </Form.Label>
                                            <FormControl
                                            required
                                            type='date'
                                            id='checkInDate'
                                            name='checkInDate'
                                            value={booking.checkInDate}
                                            placeholder='Check-In Date:'
                                            onChange={handleInputChange}
                                            />

                                            <Form.Control.Feedback type='invalid'>
                                                Please select check-in date
                                            </Form.Control.Feedback>
                            
                                    </div>
                                    <div className='col-6'>
                                            <Form.Label className='hotel-color' htmlFor='checkOutDate'>Check-Out Date: </Form.Label>
                                            <FormControl
                                            required
                                            type='date'
                                            id='checkOutDate'
                                            name='checkOutDate'
                                            value={booking.checkOutDate}
                                            placeholder='Check-Out Date:'
                                            onChange={handleInputChange}
                                            />

                                            <Form.Control.Feedback type='invalid'>
                                                Please select check-out date
                                            </Form.Control.Feedback>
                            
                                    </div>
                                    {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}


                                </div>
                            </fieldset>

                            <br />
                            <fieldset>
                                <Card.Title>Number of Guest:</Card.Title>
                                <div className='row'>
                                        <div className='col-6'>
                                                <Form.Label className='hotel-color' htmlFor='numOfAdults'>Adults: </Form.Label>
                                                <FormControl
                                                required
                                                type='number'
                                                id='numOfAdults'
                                                name='numOfAdults'
                                                value={booking.numOfAdults}
                                                min={1}
                                                aria-placeholder='0'
                                                onChange={handleInputChange}
                                                />

                                                <Form.Control.Feedback type='invalid'>
                                                    Please select at least 1 adults
                                                </Form.Control.Feedback>
                                
                                        </div>
                                        <div className='col-6'>
                                                <Form.Label className='hotel-color' htmlFor='numOfChildren'>Children: </Form.Label>
                                                <FormControl
                                                required
                                                type='number'
                                                id='numOfChildren'
                                                name='numOfChildren'
                                                value={booking.numOfChildren}
                                                min={0}
                                                aria-placeholder='0'
                                                onChange={handleInputChange}
                                                />                                                    
                                        </div>
                                </div>
                            </fieldset>
                            <div className='form-group mt-2 mb-2'>
                                <button type="submit" className='btn btn-hotel'>Continue</button>
                                &nbsp;
                                <button type="button" onClick={handleBack} className='btn btn-outline-info ml-5'>Back</button>
                            </div>
                        </Form>
                    </div>

                </div>
                <div className='col-md-4'>
                    {isSubmitted && (
                        <BookingSummary 
                        booking={booking}
                        payment={calculatePayment()}
                        isFormValid={isValidated}
                        onConfirm={handleBooking}
                        />
                    )}

                </div>
            </div>
        </div> 
    </>
  )
}

export default BookingForm