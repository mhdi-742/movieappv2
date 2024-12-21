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
      <div className={'inputContainer'}>
        <input
          value={name}
          placeholder="Enter your name here"
          onChange={(ev) => setName(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
        
      </div>
      <br/>
        <br/>
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <br/>
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'signup'} /> 
      </div>
    </div>
    </div>
    
    </>
  )
}

export default Signup