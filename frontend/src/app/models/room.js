import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  id: String,
  name: {
    type:String,
    required:true
  },
  type: {
    type:String,
    enum:["Public","Private"],
    required:true
  },
  password: {
    type:String,
  },
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users_info",
    required:true
  },
  members:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users_info"
  }]
});

export default mongoose.models.room || mongoose.model("room", roomSchema);