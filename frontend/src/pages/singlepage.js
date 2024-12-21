import React, { useContext,useState,useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useGlobalContext } from '../contex'
import { AppContext } from '../contex'
import { ApiUrl } from '../contex';
import  './singlepage.css'
import Navbar from './Navbar';
const Singlepage = () => {
  const {search,SetSearch,fmovie,fSetMovie,fetchwatchlist,loged}=useGlobalContext();
  SetSearch('haha');
    const {id}=useParams();
    const[movie,SetMovie]=useState([]);
    const[watch,Setwatch]=useState("hello");
    const[isloading,Setloading]=useState(true);
    const addwatchlist=(curr)=>{
      const m={name: curr.Title, date: curr.Year, mid: curr.imdbID, Type: curr.Type, src: curr.Poster, actor:curr.Actors, director:curr.Director};
      fetchwatchlist(m);
    }
    const getMovies= async(url)=>
    {
      Setloading(true);
       try{
        const res= await fetch(url);
        const data= await res.json();
        if(data.Response==='True')
        {
        //console.log("working");
        Setloading(false);
        SetMovie(data);
        }
       }catch(error){
        console.log(error);
       }
    }
    useEffect(()=>
    {
      // let time=setTimeout(()=>{
      getMovies(`${ApiUrl}i=${id}`);
     // return ()=>clearTimeout(time);
    },[id]) 
      if(isloading)
          {
            return(
        <div key={"loadng"}>
          <Navbar></Navbar>
          <div className='loading'>
          <h1>LOADING...</h1>
          </div>
        </div>
          )}
        else if(loged){  
        return(
        <div key={"kj"}>
       <Navbar></Navbar>
       <div className='outer'>
       <div className='box'>
        <div className='poster'>
         <img src={movie.Poster}></img>
        </div>
        <div className='details' key={"kjl"}>
         <div>Actors:{movie.Actors}</div>
         <div>Director:{movie.Director}</div>
         <div>Release Date:{movie.Year}</div>
         <div>Genre:{movie.Genre}</div>
         <div>IMDB:{movie.imdbRating}</div>
         <div><NavLink to={`https://www.imdb.com/title/${id}/`}><button>IMDB PAGE</button></NavLink><NavLink to="/"><button>GO BACK</button></NavLink></div>
         <div><button onClick={()=>addwatchlist(movie)} >+</button>add to watchlist</div>
        </div>
        </div>
       </div>
    </div>
        )}
        else{
        return(
          <div key={"kj"}>
       <Navbar></Navbar>
       <div className='outer'>
       <div className='box'>
        <div className='poster'>
         <img src={movie.Poster}></img>
        </div>
        <div className='details' key={"kjl"}>
         <div>Actors:{movie.Actors}</div>
         <div>Director:{movie.Director}</div>
         <div>Release Date:{movie.Year}</div>
         <div>Genre:{movie.Genre}</div>
         <div>IMDB:{movie.imdbRating}</div>
         <div><NavLink to={`https://www.imdb.com/title/${id}/`}><button>IMDB PAGE</button></NavLink><NavLink to="/"><button>GO BACK</button></NavLink></div>
         <NavLink to='/signin'><div><button >+</button>Sign in to access watchlist</div></NavLink>
        </div>
        </div>
       </div>
    </div>
        )}
  }

export default Singlepage;
