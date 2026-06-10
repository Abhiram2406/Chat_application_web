import mongoose from "mongoose"
import users_info from "@/app/models/users_info"
import room from "@/app/models/room"

export async function GET(req) {
    await mongoose.connect(process.env.MONGO_URI)
    const Model=users_info
    const {searchParams}=new URL(req.url)
    const id=searchParams.get("id")
    const required=await Model.findOne({_id:id})
    return Response.json(required)
}

export async function POST(req) {
    await mongoose.connect("mongodb+srv://abhiramnalla2406_db_user:3jDXTSq6tyya4FkC@cluster0.0bsac1c.mongodb.net/Chatapp")
    const Model=room
    const body = await req.json()
    await Model.insertOne(body)
    return Response.json("success")
}