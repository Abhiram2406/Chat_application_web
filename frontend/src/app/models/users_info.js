import mongoose from "mongoose";
const users_info_schema=new mongoose.Schema({ 
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        first_name:{
            type:String,
            required:true
        },
        last_name:{
            type:String,
            required:true
        },
        userid : {
            type: String,
            required:true
        },
        rooms : {
            type: Number,
            default:0
        }
})
    export default mongoose.models.users_info || mongoose.model("users_info", users_info_schema);
