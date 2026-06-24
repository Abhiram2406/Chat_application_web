import express from "express"
import { Server } from "socket.io"
import { createServer } from "http"
import mongoose from "mongoose"
import message from "./message.js"
import dotenv from "dotenv"
import crypto from "crypto"
dotenv.config()

await mongoose.connect(`${process.env.MONGO_URI}`)
const Model=message
const PORT=process.env.PORT || 4000
const encrypt_secret= Buffer.from(
  process.env.ENCRYPTION_KEY,
  'hex'
);

const app = express()
const httpServer=createServer(app)
const io=new Server(httpServer,{
    cors: {
    origin: [
      `${process.env.CLIENT_URL}`
    ]
  }

})

const save_to_db=async(arg1,arg2,arg3,arg4)=>{
    const iv=crypto.randomBytes(12)
    const cipher=crypto.createCipheriv("aes-256-gcm",encrypt_secret,iv)
    let encrypted_msg=cipher.update(arg2,"utf-8","hex")
    encrypted_msg+=cipher.final("hex")
    const tag=cipher.getAuthTag()
    const obj=await Model.create({
        sender:arg4,
        sender_user_id:arg3,
        room:arg1,
        text:encrypted_msg,
        text_iv:iv.toString("hex"),
        auth_tag:tag.toString("hex")
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