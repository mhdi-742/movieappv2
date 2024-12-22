import React, { useContext, useEffect } from 'react'
import { AppContext, useGlobalContext } from '../contex';
import { NavLink } from 'react-router-dom';
import Navbar from'../pages/Navbar'
import '../card.css'
import Remove from './Remove';
const Watchlist = () => {
  const {movie,isloading,SetSearch,fmovie,fetchwatchlist,loged,fetchuser}=useGlobalContext();
  SetSearch('haha');
  //console.log(fmovie);
  if(loged){
    
  return ( 
   <>
   <Navbar key={"watchlist"}></Navbar>
   <div className='items'>
   {
    fmovie.map((curr)=>
   {
    if(curr.name.length>27) curr.name=curr.name.substring(0,27)+"...";
    return(
      <div key={curr.name}>
      <NavLink to={`http:/localhost:3000/singlepage/${curr.mid}`} key={curr.mid} className={"card"}>
      <div className="nnn" >
          <div className='poster1'>
          <img src={curr.src} id="image" className="thumbnail"/>
          </div>
          <div className="name"><h3 className="title">{curr.name}</h3></div>
      </div>
      </NavLink>
      <div className="remove"><Remove id={curr.mid}/></div>
      </div>
      
    );
   })}
   </div>
   </>
  )}
  else{
    fetchuser();
    return(
      <div>
        <Navbar key={"watchlist"}></Navbar>
        <div class="nt">
          SIGN IN TO ACCESS
        </div>
      </div>
    )
  }
}

export default Watchlist;