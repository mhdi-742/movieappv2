import React, { useEffect, useState } from 'react'
import { AppContext, useGlobalContext } from '../contex';
const Remove = (props) => {
    const {fmovie,fetchwatchlist,fSetMovie,delmovies}=useGlobalContext();
    let l=[{}];
    const deleteMovie=async(curr)=>{
        l=fmovie;
        //console.log(curr);
        const ans = l.filter((item) => item.mid !== curr);
         await fSetMovie(ans);
         await delmovies({"mid":curr});
      }
  return (
    <div>
      <div><button onClick={()=>deleteMovie(props.id)}>Remove</button></div>
    </div>
  )
}

export default Remove
