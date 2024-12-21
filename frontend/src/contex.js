import React, { useEffect, useState, useContext } from "react";
import { json } from "react-router";
const AppContext=React.createContext();

export const ApiUrl=`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_KEY}&`;
const AppProvider =({children})=>{
  
    const[movie,SetMovie]=useState([]);
    const[fmovie,fSetMovie]=useState([]);
    const[isloading,Setloading]=useState(true);
    const[isError,SetError]=useState({show:false,msg:""});
    const[query,SetQuery]=useState('batman');
    const[search,SetSearch]=useState('search-container');
    const[loged,SetLoged]=useState(false);
    const[usrename,Setusername]=useState('unknown');
    let token1=-1,token2=-1;
    //fetch movies
    const delmovies=async(l)=>{
        const response=fetch("https://movieappv2.onrender.com/api/del",{
          method: 'post',
          headers:{
            'Content-Type':'application/json',
            'token':localStorage.getItem('token'),
            'Access-Control-Allow-Origin': '*' 
          },
          body:JSON.stringify(l)
        });
        if(!response.error)
           console.log("done");
    }
    const fetchwatchlist=async(l)=>{
       var k=fmovie;
       k.push(l)
       const response=await fetch("https://movieappv2.onrender.com/api/adddata",{
        method: 'post',
        headers:{
          'Content-Type':'application/json',
          'token':localStorage.getItem('token'),
          'Access-Control-Allow-Origin': '*' 
        },
        body:JSON.stringify(l)
      });
      if(!response.error)
      {
         fSetMovie(k);
        // console.log(k);
      }
    }
    //signup
    const signup=async(name,email,password)=>{
      await fetch ("https://movieappv2.onrender.com/api/signup",{
        method: 'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:
          JSON.stringify({
            name:name,
            email:email,
            password:password
           })
      }).then( async data=>data.json().then(async(data)=>{
        if(data.auth)
        {
          localStorage.setItem('token',data.auth);
          localStorage.setItem('name',data.name);
          Setusername(data.name);
          SetLoged(true);
          token2=1;
        }
        else token2=false;
      }))
     return token2;
  }

    //fetch user details
    const fetchuser=async()=>{
      let token=localStorage.getItem('token');
      await fetch ("https://movieappv2.onrender.com/api/data",{
        method: 'get',
        headers:{
          'Content-Type':'application/json',
          "token": token,
          'Access-Control-Allow-Origin': '*' 
        }
      }).then( async data=>data.json().then(async(data)=>{
        if(!data.error)
           fSetMovie(data);
      }))
  }    



    //sign in
    const signin=async(email,password)=>{
        await fetch ("https://movieappv2.onrender.com/api/signin",{
          method: 'post',
          headers:{
            'Content-Type':'application/json'
          },
          body:
            JSON.stringify({
              email:email,
              password:password
             })
        }).then( async data=>data.json().then(async(data)=>{
          if(data.auth)
          {
            localStorage.setItem('token',data.auth);
             localStorage.setItem('name',data.name);
            Setusername(data.name);
            SetLoged(true);
            if(!data.auth) {token1= 0;}
            else  token1=1;
          }
        }))
       return token1;
    }
    const getMovies= async(url)=>
    {
      Setloading(true);
       try{
        const res= await fetch(url);
        const data= await res.json();
       // console.log(data);
        if(data.Response==='True')
        {
        // console.log("working");
        Setloading(false);
        SetMovie(data.Search);
        SetError({show:false,msg:data.Error});
        }
        else{
          SetError({show:true,msg:data.Error});
        }
       }catch(error){
        console.log(error);
       }
    }
    useEffect(()=>
    {
      let time=setTimeout(()=>{
      getMovies(`${ApiUrl}s=${query}`);
      },1000);
      return ()=>clearTimeout(time);
    },[query]) 
    return <AppContext.Provider value={{movie ,isError ,isloading,SetQuery,query,search,SetSearch,fSetMovie,fmovie,fetchwatchlist,delmovies,signin,signup,fetchuser,loged,SetLoged,usrename}}>{children}</AppContext.Provider>
};
const useGlobalContext = () => {
    return useContext(AppContext);
  };
export{ AppContext,AppProvider,useGlobalContext};
