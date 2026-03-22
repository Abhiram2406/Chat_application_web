import mongoose from "mongoose";
const msgSchema = new mongoose.Schema({
  sender : {
    type:mongoose.Schema.Types.ObjectId,
        ref:"users_info",
        required:true
  },
  sender_user_id : {
    type:String
  },
  room : {
    type:mongoose.Schema.Types.ObjectId,
        ref:"room",
        required:true
  },
  created_at : {
    type:Date,
    default:Date.now
  },
  text: {
    type: String,
    required:true
  }
});

export default mongoose.models.message || mongoose.model("message", msgSchema);