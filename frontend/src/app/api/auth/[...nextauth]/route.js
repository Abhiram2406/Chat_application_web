import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import users_info from "@/app/models/users_info";

await mongoose.connect("mongodb://localhost:27017/Chatapp")
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
                console.log("yeh yeh")
                const client = await Model.findOne({
                username:id
            })
            if(client) {
                console.log("entered")
                return null
            }else{
                console.log("yeh yeh2")
                console.log(credentials)
                try{
                await Model.create({
                    username:id,
                    password:pass,
                    first_name:credentials.first_name.trim(),
                    last_name:credentials.last_name.trim(),
                    userid:credentials.user_id
                })
                }catch(err) {
                    console.log(err)
                }
                const client2 = await Model.findOne({
                username:id
                })
                console.log(client2)
                return {    id: client2._id.toString(),
                            name: client2.first_name,
                            email: client2.username}
            }}
            const client = await Model.findOne({
                username:id
            })
            if(client==null) {
                console.log("client not found")
            }
            if(client!=null && client.password==pass) {
                return {id: client._id.toString(),
                            name: client.first_name,
                            email: client._id.toString()}
            }
            console.log("incorrect password")
            return null;
        }

    })
]})

export { handler as GET, handler as POST };