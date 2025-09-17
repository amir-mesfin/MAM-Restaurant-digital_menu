import mongoose  from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName:{
    type:String,
    require:true,
  },
  foodDescription:{
    type:String,
  },
  foodPrice:{
    type:Number,
    require:true,
  },
  foodUrl:{
    type:String,
    require:true,
  },
  foodCategory:{
    type:String,
    require:true
  }
},{timestamps:true});

const food = mongoose.model('Food',foodSchema);

export default food;