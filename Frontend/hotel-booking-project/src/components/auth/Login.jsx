/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { loginUser } from '../utils/ApiFunctions'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from './AuthProvider'

const Login = () => {
    const[errorMessage, setErrorMessage] = useState("")
    const[login, setLogin] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    const {handleLogin} = useContext(AuthContext)
    const handleInputChange = (e) => {
        setLogin({...login, [e.target.name] : e.target.value})

    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const success = await loginUser(login)
        if(success){
            const token = success.token
            handleLogin(token)          
            navigate("/")
            
        }else{
            setErrorMessage("Invalid username or password. Please try again.")
        }
        setTimeout(()=>{
            setErrorMessage("")
        },2000)
    }
  return (
    <section className='container col-6 mt-5 mb-5'>

        {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        <h2>Login</h2>
        <form action="" onSubmit={handleSubmit}>
            <div className='row mb-3'>
                <label htmlFor="email" className='col-sm-2 col-form-label'>Email</label>
                <div>
                    <input id='email' name='email' type='email' className='form-control' value={login.email} onChange={handleInputChange}/>
                </div>
            </div>
            <div className="row mb-3">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={login.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>
            <div className='mb-3' >
                <button
                type='submit'
                className='btn btn-hotel'
                style={{
                    marginRight:"10px"
                }}>
                    Login
                </button>
                <span className='' style={{marginLeft:"10px"}}>
                    Not have an account yet? <Link to={"/register"} style={{textDecoration:"none"}}>register here!</Link>
                </span>
            </div>
        </form>
    </section>

  )
}

export default Login