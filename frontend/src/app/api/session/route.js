import mongoose from "mongoose";
import users_info from "@/app/models/users_info";
import room from "@/app/models/room";
import message from "@/app/models/message";

await mongoose.connect("mongodb+srv://abhiramnalla2406_db_user:3jDXTSq6tyya4FkC@cluster0.0bsac1c.mongodb.net/Chatapp")
const Model = users_info
const Model2= room
const Model3=message

export async function GET(request) {
    const url=new URL(request.url)
    const type=url.searchParams.get("type")
    const id=url.searchParams.get("id");
    console.log(id)
    if(type=="user") {
        const required=await Model.findOne({_id:id})
        return Response.json(required || {})
    }else if(type=="rooms") {
        const required=await Model2.find({members:id})
        return Response.json(required || [])
    }else if(type=="fetchid") {
        console.log("okok")
        const required=await Model2.findOne({_id:id})
        return Response.json(required || {})
    }
}
export async function DELETE(request) {
    const url=new URL(request.url)
    const id=url.searchParams.get("id");
     
    const req=await Model2.deleteOne({_id:id})
    const req2=await Model3.deleteMany({room:id})

    return Response.json({})
}