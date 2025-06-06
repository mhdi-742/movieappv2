import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink, useParams } from 'react-router-dom'
import './signin.css';
import './Navbar'
import Navbar from './Navbar';
import { AppContext, useGlobalContext } from '../contex';
import { useEffect } from 'react';
const Signin = (props) => {
  const navigate=useNavigate();
 const {movie,isloading,SetSearch,fmovie,fetchwatchlist,signin,token,fetchuser}=useGlobalContext();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const onButtonClick = async(e) => {
    const hello=await signin(email,password);
    if(hello===1) {await navigate("/");fetchuser()}
    else {alert("wrong credentials");localStorage.removeItem('token');}
    
  }
  return (
    <>
    <Navbar/>
    <div className="main">
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Signin</div>
      </div>
      <br />
      <hr className='hhhr'></hr>
      <br/>
      <div className={'inputContainer'}>
        <label htmlFor ="email">EMAIL</label>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'} id="email"
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
      <label htmlFor ="password">PASSWORD</label>
        <input
          value={password} id="password"
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className="buttom">
        <button className='loog' onClick={onButtonClick}>Sing In</button>
        <NavLink to="/signup"><button className='loog'>Sing Up</button></NavLink>
      </div>
    </div>
    </div>
    
    </>
  )
}

export default Signin