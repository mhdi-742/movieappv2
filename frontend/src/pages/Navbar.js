import React, { useEffect } from 'react'
import { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import './Navbar.css'
import { useGlobalContext } from '../contex'
import loginimg from '../../src/assets/log-in.png'
import signedin from'../../src/assets/singed.png'
import bookmark from'../../src/assets/bookmark.png'
const Navbar=()=> {
  const {query,SetQuery,isError,search,SetSearch,loged,SetLoged,fetchuser,usrename,Setusername}=useGlobalContext();
  const navigate=useNavigate();

  if(localStorage.getItem('token')!=null)
  {
    Setusername(localStorage.getItem('name'));
    SetLoged(true);
  }
   useEffect(()=>{
    if(loged) fetchuser()
   },[loged])
  const signout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
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
    <div className={search+" search-area"} >
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
    <div className="watch-button"><NavLink className="signin1" to="/watchlist" ><img className='watchlist-img' src={bookmark}></img><div className='del'>WATCHLIST</div></NavLink></div>
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
     <div className='heading'>
    <NavLink className="active" to="/">The Movie Site</NavLink>
    </div>
    <div className={search+" search-area"}>
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
    <div className="watch-button"><NavLink className="signin1" to="/watchlist" ><img className='watchlist-img' src={bookmark}></img><div className='del'>WATCHLIST</div></NavLink></div>
    </div>
    <div className='sign'>
      <div className="sign-in-button"><NavLink className="signin" to="/signin"><img className='signin-img' src={loginimg}></img></NavLink></div>
    </div>
    
  </div>
  </div>
  )
}
export default Navbar;


