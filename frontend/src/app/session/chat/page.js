"use client"
import Reply from "../../components/reply";
import Message from "../../components/message";
import { Send,Share2,Users,ArrowRight } from "@deemlol/next-icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import Loading from "@/app/components/loading";
import { Trash2 } from "@deemlol/next-icons"
import { useRouter } from "next/navigation";
export default function() {
    const router=useRouter()
    const [room_user_id,setroom_user_id]=useState("")
    const [socket,setsocket]=useState(null)
    const [sender_user_id,setsender_user_id]=useState("")
    const [participants,setparticipants]=useState([])
    const [chats,setchats]=useState([])
    const [msg,setmsg]=useState("")
    const searchParams = useSearchParams();
    const {data:session,status}=useSession()
    const id = searchParams.get("id");
    
    useEffect(()=>{
        const req=async()=>{
            const requ=await fetch(`/api/session/chat?id=${id}`)
            const reque=await requ.json()
            const room_i=await fetch(`/api/session?type=fetchid&id=${id}`)
            const room_id=await room_i.json()
            if(session) {
            const sendr_id=await fetch(`/api/socket?id=${session?.user?.email}`)
            const sender_id=await sendr_id.json()
            setsender_user_id(sender_id.userid)
            }
            setroom_user_id(room_id.id)
            setchats(reque)
            const store=new Set()
            reque.forEach(e => {
                store.add(e.sender_user_id)
            });
            setparticipants([...store])
        }
        req()
    },[id,session])
    useEffect(()=>{
        const sock = io("https://chatapplicationwebserver-production.up.railway.app/");
        setsocket(sock)
        sock.on("connect",()=>{
            console.log(sock.id)
        })
        sock.emit("join_room",id)
        sock.on("reply",(arg1)=>{
            setchats(prev=>[arg1,...prev])
        })
        return ()=>{
            sock.disconnect()
        }

    },[])

    if (status === "loading") {
        return <Loading/>
    }
    const sendmessage=()=>{
        if (!socket || !sender_user_id || !msg) return
        socket.emit("broadcast",id,msg,sender_user_id,session.user.email)
        setmsg("")
    }
    const deletechat=async ()=>{
        const res = await fetch(`/api/session?id=${id}`, {
            method: "DELETE",
        })
        if(res.ok) {
            router.push("/session")
        }
    }
    function checkkey(e) {
        if(e.key=="Enter") {
            sendmessage()
        }
    }
    
    return(
        <div className="flex flex-col h-screen">
        <div className="flex items-center justify-between gap-2 mb-1 p-3 border-b">
            <div className="flex items-center gap-2">
                <button onClick={deletechat} className="hover:cursor-pointer"><Trash2></Trash2></button>
                <Share2  size={24} color="#1D546D" /><span className="p-1.5 bg-[#22617e] rounded-r-3xl">{room_user_id}</span>
            
            </div>
            
            <div className="flex items-center flex-row-reverse gap-2"><Users size={24} color="#1D546D" /><div className="bg-gray-500 rounded-3xl scrollbar-hide overflow-x-auto w-3xs p-2 h-9 flex gap-2">
                {participants.map(e => (
                <span key={e}>{e} </span>
                ))}
                </div><ArrowRight size={16} color="#1D546D" /><span className="bg-gray-500 rounded-full p-2">{participants.length}</span></div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
            {chats.map(e=>{
                if(e.sender===session?.user?.email) {
                    return <Message key={e._id} time={e.created_at} text={e.text}></Message>
                }else{
                    return <Reply key={e._id} user={e.sender_user_id} time={e.created_at} text={e.text}></Reply>
                }
        })}
        </div>
        <div className="flex items-center gap-2 p-3 border-t">
            <input onChange={(e)=>setmsg(e.target.value)} onKeyDown={(e)=>checkkey(e)} type="text" name="msg" id="msg" placeholder="Enter a message" className="border-2 border-dashed w-[95%] text-left px-1.5 rounded-3xl align-bottom border-black" value={msg} />
            <button onClick={sendmessage} className=" p-0.6 hover:cursor-pointer"><Send size={24} color="#1D546D" /></button>
        </div>
        </div>
    )
}