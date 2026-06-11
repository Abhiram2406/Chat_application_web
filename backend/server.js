import express from "express"
import { Server } from "socket.io"
import { createServer } from "http"
import mongoose from "mongoose"
import message from "./message.js"
import dotenv from "dotenv"
dotenv.config()

await mongoose.connect(`${process.env.MONGO_URI}`)
const Model=message
const PORT=process.env.PORT || 4000

const app = express()
const httpServer=createServer(app)
const io=new Server(httpServer,{
    cors: {
    origin: [
      "http://localhost:3000",
      "https://spilltea-web-client.vercel.app"
    ]
  }

})

const save_to_db=async(arg1,arg2,arg3,arg4)=>{
    const obj=await Model.create({
        sender:arg4,
        sender_user_id:arg3,
        room:arg1,
        text:arg2
    })
    return obj
}

io.on("connection",(socket)=>{
    // console.log("connected "+socket.id)
    socket.on("join_room",(arg)=>{
        socket.join(arg)
    })
    socket.on("broadcast",async(arg1,arg2,arg3,arg4)=>{
        try{
        const add=await save_to_db(arg1,arg2,arg3,arg4)
        io.to(arg1).emit("reply",add)
        }catch(err) {
            console.log(err)
        }
    })
})

console.log("server listening on 4000")
httpServer.listen(PORT)