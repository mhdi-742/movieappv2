import React, { useContext } from 'react'
import { AppContext, useGlobalContext } from './contex';
import { NavLink } from 'react-router-dom';
import Navbar from'./pages/Navbar'
import './card.css'
const Home = () => {
  const {movie,isloading,SetSearch}=useGlobalContext();
  SetSearch('search-container');
  if(isloading)
    {
      return(
        <>
          <Navbar></Navbar>
          <h1>LOADING...</h1>
        </>
      )
    }
    else
  return ( 
   <>
   <Navbar></Navbar>
   <div className='items'>
   {movie.map((curr)=>
   {
    if(curr.Title.length>27) curr.Title=curr.Title.substring(0,27)+"...";
    return(
      <>
      <NavLink to={`singlepage/${curr.imdbID}`} key={curr.imdbID} className={"card"}>
      <div className="nnn">
          <div className='poster1'>
          <img src={curr.Poster} id="image" className="thumbnail"/>
          </div>
          <div className="name"><h3 className="title">{curr.Title}</h3></div>
      </div>
      </NavLink>
      </>
    );
   })}
   </div>
   </>
  )
}

export default Home;
