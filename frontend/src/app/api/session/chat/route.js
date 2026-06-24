import message from "@/app/models/message"
import mongoose from "mongoose"
import crypto from "crypto"

export async function GET(req) {
    await mongoose.connect(`${process.env.MONGO_URI}`)
    const Model = message
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const requ=await Model.find({room:id}).sort({ created_at:1 })
    const encrypt_secret=Buffer.from(process.env.ENCRYPTION_KEY,'hex')
    requ.forEach((e)=>{
        if(e) {
        const iv=Buffer.from(e.text_iv,"hex")
        const tag=Buffer.from(e.auth_tag,"hex")
        const encrypted_text=e.text
        const decipher=crypto.createDecipheriv("aes-256-gcm",encrypt_secret,iv)
        decipher.setAuthTag(tag)
        let decrypted_msg=decipher.update(encrypted_text,'hex','utf-8')
        decrypted_msg+=decipher.final("utf-8")
        e.text=decrypted_msg
        }
    })
    return Response.json(requ)
}
export async function POST(req) {
    const body=await req.json();
    const encrypt_secret=Buffer.from(process.env.ENCRYPTION_KEY,'hex')
    const iv=Buffer.from(body.iv,'hex')
    const tag=Buffer.from(body.tag,'hex')
    const encrypted_text=body.cipher
    const decipher=crypto.createDecipheriv("aes-256-gcm",encrypt_secret,iv)
    decipher.setAuthTag(tag)
    let decrypted_msg=decipher.update(encrypted_text,'hex','utf-8')
    decrypted_msg+=decipher.final("utf-8")

    return Response.json(decrypted_msg)
}