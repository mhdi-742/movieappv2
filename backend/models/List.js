const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ListSchema= new Schema({
 mid:{
    type:[String],
    required:true,
 },
 user:{
    type:String,
    required:true,
    unique:true
}
},{timestamps:true});
const List=mongoose.model('List',ListSchema);
module.exports=List; 