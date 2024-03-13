/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ExistingRooms } from './components/room/ExistingRooms';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import AddRoom from './components/room/AddRoom';
import { Footer } from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import CheckOut from './components/booking/CheckOut';
import BookingSuccess from './components/booking/BookingSuccess';
import Bookings from './components/booking/Bookings';
import FindBooking from './components/booking/FindBooking';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import Logout from './components/auth/Logout';
import { AuthProvider } from './components/auth/AuthProvider';
import RequireAuth from './components/auth/RequireAuth';
import { EditRoom } from './components/room/EditRoom';
function App() {

  return (
    <AuthProvider>
      <main>
        <BrowserRouter>
          <NavBar/>
          <Routes>

            <Route path='/' element={<Home/>}/>
            <Route path='/edit-room/:roomId' element={<EditRoom/>}/>
            <Route path='/existing-rooms' element={<ExistingRooms/>}/>
            <Route path='/add-room' element={<AddRoom/>}/>
            <Route path='/browse-all-rooms' element={<RoomListing/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route 
              path='/book-room/:roomId' 
              element={
                <RequireAuth>
                  <CheckOut/>
                </RequireAuth>
              }
            />
            <Route path='/booking-success' element={<BookingSuccess/>}/>
            <Route path='/existing-bookings' element={<Bookings/>}/>
            <Route path='/find-booking' element={<FindBooking/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Registration/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </main>
      
      
    </AuthProvider>
  )
}

export default App
