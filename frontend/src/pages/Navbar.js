import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import './Navbar.css'
import { useGlobalContext } from '../contex'
const Navbar=()=> {
  const {query,SetQuery,isError,search,SetSearch,loged,SetLoged,fetchuser,usrename}=useGlobalContext();
  const navigate=useNavigate();

  if(localStorage.getItem('token')!=null)
  {
    SetLoged(true);
  }
   useEffect(()=>{
    if(loged) fetchuser()
   },[loged])
  const signout=()=>{
    localStorage.removeItem('token');
    SetLoged(false);
    navigate("/")
  }
  if(loged){
    return(
      <div>
    <div className="topnav">
     <div>
    <NavLink className="active" to="/">The Movie Site</NavLink>
    </div>
    <div className={search}>
      <form role="search" id="form" onSubmit={(e)=>e.preventDefault()}>
        <input type="search" id="query" name="q" placeholder={query} onChange={(e)=>
        {
          SetQuery(e.target.value);
        }}></input>
      </form>
      <div>
        <p className='error'>{isError.show && isError.msg}</p>
      </div>
    </div>
    <div className='sign'>
    <NavLink className="signin" to="/watchlist">watchlist</NavLink>
    </div>
    <div className="dropdown"><button className="dropbtn" onClick={signout}>{usrename}</button>
  <div class="dropdown-content">
    <div onClick={signout}>SIGN OUT</div>
  </div></div>
    </div></div>
    )
  }
  return (
    <div>
    <div className="topnav">
     <div>
    <NavLink className="active" to="/">The Movie Site</NavLink>
    </div>
    <div className={search}>
      <form role="search" id="form" onSubmit={(e)=>e.preventDefault()}>
        <input type="search" id="query" name="q" placeholder={query} onChange={(e)=>
        {
          SetQuery(e.target.value);
        }}></input>
      </form>
      <div>
        <p className='error'>{isError.show && isError.msg}</p>
      </div>
    </div>
    <div className='sign'>
    <NavLink className="signin" to="/watchlist" >watchlist</NavLink>
    </div>
    <div className='sign'>
    <NavLink className="signin" to="/signin">Sign In</NavLink>
    </div>
    
  </div>
  </div>
  )
}
export default Navbar;


