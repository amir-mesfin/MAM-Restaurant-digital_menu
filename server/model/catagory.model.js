import mongoose from 'mongoose'

const catagorySchema = new mongoose.Schema({
  catagoryName:{
    type:String,
    unique:true,
    require:true
  },
  url:{
    type:String,
    unique:true,
    require:true,
  }
},{timestamps:true}) 

const catagory = mongoose.model('Catagory',catagorySchema);

export default catagory