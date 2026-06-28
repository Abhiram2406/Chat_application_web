import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import users_info from "@/app/models/users_info";
import bcrypt from "bcrypt"


await mongoose.connect(`${process.env.MONGO_URI}`)
const Model = users_info

const handler=NextAuth({
providers: [
    CredentialsProvider({
        name:"credentials",
        credentials:{
            username:{},
            password:{},
            method:{},
            first_name:{},
            last_name:{},
            user_id:{},
        },
        async authorize(credentials,req) {
            const id=credentials.username.trim()
            const pass=credentials.password.trim()
            if(credentials.method=="signup") {
                const client = await Model.findOne({
                username:id
            })
            if(client) {
                return null
            }else{
                try{
                    const hashed_password=await bcrypt.hash(pass,12)
                    await Model.create({
                    username:id,
                    password:hashed_password,
                    first_name:credentials.first_name.trim(),
                    last_name:credentials.last_name.trim(),
                    userid:credentials.user_id
                    })
                }catch(err) {
                    console.log(err)
                }
                const client2 = await Model.findOne({username:id})
                return {id: client2._id.toString(),
                        name: client2.first_name,
                        email: client2.username}
            }}
            const client = await Model.findOne({
                username:id
            })
            if(client!=null ) {
                const allow=await bcrypt.compare(pass,client.password)
                if(!allow) {
                    return null;
                }
                return {id: client._id.toString(),
                            name: client.first_name,
                            email: client._id.toString()
                        }
            }
        }

    })
]})

export { handler as GET, handler as POST };