const express=require('express');
require("dotenv").config();
const router=express();
const bcrypt=require('bcryptjs')
const User=require('../models/User')
const Movie=require('../models/Movie');
const List=require('../models/List');
const mongoose=require('mongoose');
const { body, validationResult } = require('express-validator');
const { isNull } = require('lodash');
const jwt=require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const jwt_sec="hellomehediharea@7427778";
router.use(express.json())

router.get('/',(req,res)=>{
    res.send("hello");
})

//saving function
const savewithid =async(id,mid,req,res)=>{
    const data=await List.findOne({"user":id});
    if(data!=null)
    {
        if(data.mid.includes(mid)){
            return res.status(401).send({error:"already exists"});
        }
        if(data.mid.includes(mid)===false){
         await data.mid.push(mid);
        await List.findOneAndUpdate({"user":id},{mid:data.mid},{new:true}).then((err,doc)=>{
            if (err) {
               res.send(err);
              } else {
                res.send(doc);
              }
        })}
    }
    else{
        list = await List.create({
                user:id,
                mid:mid
               } ).then(async list=>{
                 await list.save();
                 res.send("done");
               })
    }
}
//its about  signup
router.post("/api/signup",[
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long').trim().escape(),
],async(req,res)=>{
    console.log("hello");
    const errors = await validationResult(req);
    const salt= await bcrypt.genSalt(10);
    const pass= await bcrypt.hash(req.body.password,salt);
   if(errors.isEmpty()){
    const check=await User.findOne({"email":req.body.email});
    if(check){return res.status(400).send({error:"user already exists"});}
   user = await User.create({
        name: req.body.name,
        password: pass,
        email: req.body.email
   }).then((user)=>{
    const data={
        user:user.id
    }
     const token=jwt.sign(data,jwt_sec);
     res.send({auth:token,name:req.body.name});
     user.save();
   }).catch(err=>res.send(err))
  console.log("bye"); 
}
else{
    return res.status(400).json({ errors: errors.array()});
}
}
)
//its about login


router.post("/api/signin",
    [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long').trim().escape()
   ],async (req,res)=>{
    const errors = await validationResult(req);
    if(errors.isEmpty()){
    try {
    const {email,password} =req.body; 
    const c= await User.findOne({"email" : email})
    if(!c){
         return res.status(400).send({"error":"wrong credentials"});
    }
    else {
        const pwd_comp= await bcrypt.compare(password,c.password);
        if(!pwd_comp){
            return res.status(400).send({"error":"wrong credentials"});
        }
        const data={
            user:c.id
        }
        const token=jwt.sign(data,jwt_sec);
        res.json({auth:token,name:c.name});
    }
    } catch (error) {
        return res.send(error);
    }
}
else{
    return res.status(400).json({ errors: errors.array()});
}
})



//its about getting the results
router.get('/api/getuser',fetchuser,async(req,res)=>{
  const {id}=req.body;
  const data=await User.findById(id).select("-password");
  if(!id){
   res.status(401).send("use valid token");
  }
  else res.send(data);
})

// its about adding the movie data

router.post('/api/adddata',fetchuser,async(req,res)=>{
const mid=req.body.imdbID;
const data= await Movie.findOne({"mid":mid})
if(!data){
const movie= await Movie.create({
     mid: req.body.mid,
     name: req.body.name,
     src: req.body.src,
     actor: req.body.actor,
     director: req.body.director,
     date: req.body.date
}).then(async movie=>{
   await movie.save();
   savewithid(req.body.id,req.body.mid,req,res);
  // console.log("done");
})}
else{
    savewithid(req.body.id,req.body.mid,req,res);
}
})
// this is for getting movies
router.get('/api/data',fetchuser,async(req,res)=>{
    var data=await List.findOne({"user": req.body.id});
    let fmovies=[];
    if(data){
    await Promise.all(data.mid.map(async(curr)=>{
       const compo= await Movie.findOne({"mid":curr}) 
        fmovies.push(compo);
    }))
}
    res.send(fmovies);
})
router.post('/api/del',fetchuser,async(req,res)=>{
    let hello=await List.findOne({"user":req.body.id})
  let  l=hello.mid;
    const ans=l.filter((item) => item !== req.body.mid);
    await List.findOneAndUpdate({"user":req.body.id},{mid:ans},{new:true}).then((err,doc)=>{
        if (err) {
           res.send(err);
          } else {
            res.send(doc);
          }
    })
})
module.exports=router;


