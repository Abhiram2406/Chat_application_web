import mongoose from "mongoose";
import room from "@/app/models/room";

 await mongoose.connect(process.env.MONGO_URI).then(console.log("connected to db"));
const Model=room
 

export async function GET(request) {

  console.log("request occhindi")
    const getparams= new URL(request.url)
    const roomid=getparams.searchParams.get("id");
    const details=await Model.findOne({id:roomid})
    if(details==null) {
      return Response.json("No data found")
    }
    return Response.json(details)
}
export async function PATCH(request) {
  console.log("patch called")
  const { roomId, userId } = await request.json()
  await Model.updateOne(
    {id:roomId},
    { $addToSet: { members: userId } }
  )
  return Response.json({ success: true })
}