const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const MovieSchema= new Schema({
 mid:{
    type:String,
 },
 name:{
    type:String, },
 src:{
    type:String, },
 actor:{
    type:String, },
 director:{
    type:String, },
 date:{
   type:String }
},{timestamps:true});
const Movie=mongoose.model('Movie',MovieSchema);
module.exports=Movie; 