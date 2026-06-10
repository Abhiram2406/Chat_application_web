import message from "@/app/models/message"
import mongoose from "mongoose"

export async function GET(req) {
    await mongoose.connect("mongodb+srv://abhiramnalla2406_db_user:3jDXTSq6tyya4FkC@cluster0.0bsac1c.mongodb.net/Chatapp")
    const Model = message
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    console.log(id)
    const requ=await Model.find({room:id}).sort({ created_at: -1 })
    return Response.json(requ)
}