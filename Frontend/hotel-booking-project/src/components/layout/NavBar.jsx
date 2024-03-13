/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/AuthProvider'

const NavBar = () => {
    const[showAccount, setShowAccount] = useState(false)
    const [selectedLeftItem, setSelectedLeftItem] = useState(null);
    const [selectedRightItem, setSelectedRightItem] = useState(null);

    const {user} = useContext(AuthContext)
    const handleAccountClick = () =>{
        setShowAccount(!showAccount)
    }

    const isLoggedIn = localStorage.getItem("token")
    const userRole = localStorage.getItem("userRole")
    // Hàm xử lý sự kiện khi một mục menu được click
    const handleLeftItemClick = (index) => {
        // Cập nhật chỉ mục của mục menu được chọn
        setSelectedLeftItem(index);
        setSelectedRightItem(null)
    };
    const handleRightItemClick = (index) => {
        setSelectedLeftItem(null);
        setSelectedRightItem(index)
    }
    const menuLeftItems = ['Browse all rooms'];
    // Tạo một mảng các mục menu
    if (userRole === 'ROLE_ADMIN') {
        menuLeftItems.push('Admin');
    }
    const menuRightItems = ['Find My Booking']


    // Hàm xử lý sự kiện khi người dùng click vào liên kết Thousand-Star Hotel
    const handleThousandStarHotelClick = () => {
        // Đặt selectedItem thành null
        setSelectedLeftItem(null);
        setSelectedRightItem(null)
    };

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
        <div className='container-fluid'>
            <Link 
            to={"/"} 
            style={{
                textDecoration:"none"
            }}
            onClick={handleThousandStarHotelClick}
            >
                <span style={{fontWeight: "bold"}} className='hotel-color'>
                Thousand-Star Hotel
                </span>
            
            </Link>
            <button 
            className='navbar-toggler'
            type='button'
            data-bs-toggle = "collapse"
            data-bs-target = "#navbarScroll"
            aria-controls="#navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
                <span className='navbar-toggler-icon'></span>
                

            </button>
            <div className='collapse navbar-collapse' id='navbarScroll'>
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        {/* Duyệt qua từng mục menu và hiển thị chúng */}
                        {menuLeftItems.map((item, index) => (
                            <li className='nav-item' key={index}>
                            <Link
                                className={`nav-link ${selectedLeftItem === index ? 'fw-bold' : ''}`}
                                aria-current="page"
                                to={index === 0 ? "/browse-all-rooms" : "/admin"}
                                onClick={() => handleLeftItemClick(index)}
                            >
                                {item}
                            </Link>
                            </li>
                        ))}
                    </ul>
                {/* <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                    <li className='nav-item'>
                        <Link  className='nav-link' aria-current="page" to={"/browse-all-rooms"}>
                            Browse all rooms
                        </Link>
                    </li>
                    <li className='nav-item'>
                    <Link className='nav-link' aria-current="page" to={"/admin"}>
                            Admin
                        </Link>
                    </li>
                </ul> */}

                <ul className='d-flex navbar-nav'>
                    {menuRightItems.map((item, index) => (
                            <li className='nav-item' key={index}>
                            <Link
                                className={`nav-link ${selectedRightItem === index ? 'fw-bold' : ''}`}
                                aria-current="page"
                                to={"/find-booking"}
                                onClick={() => handleRightItemClick(index)}
                            >
                                {item}
                            </Link>
                            </li>
                        ))}
                    {/* <li className='nav-item'>
                        <Link className='nav-link' to = {"/find-booking"}>
                            Find My Booking
                        </Link>
                    </li> */}
                    
                    <li className="nav-item dropdown">
							<a
								className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								onClick={handleAccountClick}>
								{" "}
								Account
							</a>

							<ul
								className={`dropdown-menu ${showAccount ? "show" : ""}`}
								aria-labelledby="navbarDropdown">
								{isLoggedIn ? (
									<Logout />
								) : (
									<li>
										<Link className="dropdown-item" to={"/login"}>
											Login
										</Link>
									</li>
								)}
							</ul>
					</li>


                </ul>
            </div>

        </div>
        
    </nav>
  )
}

export default NavBar