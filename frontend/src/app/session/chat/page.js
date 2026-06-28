"use client"
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Reply from "../../components/reply";
import Message from "../../components/message";
import { Send,Share2,Users,ArrowRight } from "@deemlol/next-icons";
import { useRef } from "react";
import { useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import Loading from "@/app/components/loading";
import Typing_indicator from "@/app/components/typing_indicator";
import { Trash2 } from "@deemlol/next-icons"
import { useRouter } from "next/navigation";


function ChatPage(){
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
    const [typing_users,settyping_users]=useState(new Set())
    const [hidden,sethidden]=useState(true)
    const bottomRef=useRef(null)
    
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
        }
        req()
    },[id,session])
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        // const store=new Set()
        //     chats.forEach(e => {
        //         store.add(e.sender_user_id)
        //     });
            setparticipants([typing_users])
    }, [chats,typing_users])
    useEffect(()=>{
        if (!sender_user_id) return;
        const sock = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
        setsocket(sock)
        sock.on("connect",()=>{
        })
        sock.emit("join_room",id)
        sock.on("reply",async (arg1)=>{
                const res = await fetch("/api/session/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    iv:arg1.text_iv,
                    tag:arg1.auth_tag,
                    cipher:arg1.text
                })
                });

                const data = await res.json();
                arg1.text=data
            setchats(prev=>[...prev,arg1])
        })
        sock.on("typing_indicator_update",(sender_id,msg)=>{
            if(msg=="close" && sender_id!=sender_user_id) {
                settyping_users(prev=>{
                    let temp=new Set(prev);
                    temp.delete(sender_id);
                    return temp;
                })
                if(typing_users.size===0) {
                    sethidden(true)
                }
            }else if(msg=="open" && sender_id!=sender_user_id) {
                settyping_users(prev=>{
                    let temp=new Set(prev);
                    temp.add(sender_id);
                    return temp;
                })
                sethidden(false)
            }
        }) 
        return ()=>{
            sock.disconnect()
        }

    },[sender_user_id])

    if (status === "loading") {
        return <Loading/>
    }
    const sendmessage=()=>{
        if (!socket || !sender_user_id || !msg) return
        socket.emit("broadcast",id,msg,sender_user_id,session.user.email)
        setmsg("")
        socket.emit("typing_indicator","close",sender_user_id,id)
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
    function setchange(e) {
        if (!socket || !sender_user_id) return
        setmsg(e);
        if(e=="") {
            socket.emit("typing_indicator","close",sender_user_id,id)
        }else{
            socket.emit("typing_indicator","open",sender_user_id,id)
        }
    }
    
    
    
    return(
        <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-col gap-3 mb-1 p-3 border-b sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-2">
                <button onClick={deletechat} className="hover:cursor-pointer"><Trash2></Trash2></button>
                <Share2  size={24} color="#1D546D" /><span className="min-w-0 break-all p-1.5 bg-[#22617e] rounded-r-3xl text-sm sm:text-base">{room_user_id}</span>
            
            </div>
            
            <div className="flex min-w-0 items-center flex-row-reverse justify-end gap-2 sm:justify-start"><Users size={24} color="#1D546D" /><div className="bg-gray-500 rounded-3xl scrollbar-hide overflow-x-auto w-full max-w-3xs p-2 h-9 flex gap-2">
                {participants.map(e => (
                <span className="shrink-0" key={e}>{e} </span>
                ))}
                </div><ArrowRight size={16} color="#1D546D" /><span className="bg-gray-500 rounded-full p-2">{typing_users.size}</span></div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2 pb-20 md:max-h-screen">
            {chats.map(e=>{
                if(e.sender===session?.user?.email) {
                    return <Message key={e._id} time={e.created_at} text={e.text}></Message>
                }else{
                    return <Reply key={e._id} user={e.sender_user_id} time={e.created_at} text={e.text}></Reply>
                }
        })}
        <div className={hidden?"opacity-0 md: relative top-0 inline-block":"md: relative top-0 inline-block"}>
        <Typing_indicator></Typing_indicator>
        </div>
        <span className="opacity-0 none" ref={bottomRef}>----
        </span>
        </div>
        <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center gap-2 border-t bg-white p-3 md:left-80 lg:left-1/4">
            <input onChange={(e)=>setchange(e.target.value)} onKeyDown={(e)=>checkkey(e)} type="text" name="msg" id="msg" placeholder="Enter a message" className="min-w-0 flex-1 border-2 border-dashed text-left px-3 py-2 rounded-3xl align-bottom border-black" value={msg} />
            <button onClick={sendmessage} className="shrink-0 p-0.6 hover:cursor-pointer"><Send size={24} color="#1D546D" /></button>
        </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <ChatPage />
        </Suspense>
    );
}
