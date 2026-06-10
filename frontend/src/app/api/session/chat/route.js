import message from "@/app/models/message"
import mongoose from "mongoose"

export async function GET(req) {
    await mongoose.connect(process.env.MONGO_URI)
    const Model = message
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    console.log(id)
    const requ=await Model.find({room:id}).sort({ created_at: -1 })
    return Response.json(requ)
}