import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './signin.css';
import './Navbar'
import Navbar from './Navbar';
import { AppContext, useGlobalContext } from '../contex';
import { useEffect } from 'react';
const Signup = (props) => {
  const navigate=useNavigate();
 const {movie,isloading,SetSearch,fmovie,fetchwatchlist,signin,signup}=useGlobalContext();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')


  const onButtonClick = async(e) => {
    const hello=await signup(name,email,password);
    if(hello===1) { navigate("/");}
    else {alert("wrong credentials");localStorage.removeItem('token');}
  }
  return (
    <>
    <Navbar/>
    <div className="main">
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Signup</div>
      </div>
      <br />
     <hr className='hhhr'></hr>
      <div className={'inputContainer'}>
      <label htmlFor ="name">NAME</label>
        <input
          value={name}
          placeholder="Enter your name here" id="name"
          onChange={(ev) => setName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
        
      </div>
      <br/>
        <br/>
      <div className={'inputContainer'}>
      <label htmlFor ="email">EMAIL</label>
        <input
          value={email}
          placeholder="Enter your email here" id="email"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
      <label htmlFor ="password">PASSWORD</label>
        <input
          value={password}
          placeholder="Enter your password here" id="password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <br/>
      <div className="buttom2">
        <button className='loog' onClick={onButtonClick}>Sing In</button>
      </div>
    </div>
    </div>
    
    </>
  )
}

export default Signup