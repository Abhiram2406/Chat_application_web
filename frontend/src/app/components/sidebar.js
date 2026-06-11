"use client"
import { useState } from "react";
import { AlignJustify } from "@deemlol/next-icons";
import { PlusCircle } from "@deemlol/next-icons";
import { ChevronDown } from "@deemlol/next-icons";
import { Search } from "@deemlol/next-icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Loading from "./loading";
import Room from "./room"
export default function() {
    const [ison,setison]=useState(true)
    const [roomname,setroomname]=useState(true)
    const [roompass,setroompass]=useState(true)
    const [isplus,setisplus]=useState(false)
    const [public_room,setpublic_room]=useState(false)
    const [private_room,setprivate_room]=useState(false)
    const [search_params,setsearch_params]=useState("")
    const [rooms,setrooms]=useState([])
    const [make_render,setmake_render]=useState(true)
    const router=useRouter()
    const {data:session,status}=useSession()

    useEffect(() => {
        if (status === "unauthenticated") {
          alert("Not signed in. Please Sign in");
          router.push("/");
        }
      }, [status,router]);

    useEffect(()=>{
        const details=async()=>{
        if(status=="authenticated") {
            const id=session.user.email
            let dett=await fetch(`/api/session?type=rooms&id=${session.user.email}`)
            if(dett.ok) {
            const det =await dett.json()
            setrooms(det)
            console.log(det)
            console.log(rooms)
            }
        }}
        details()
    },[session,make_render])
      if(status=="loading") {
        return <Loading></Loading>
      }
      if(!session) {
        return null
      }
    let name=session.user.name
    if(name.length>0) {
        name = name[0].toUpperCase() + name.slice(1);
    }
    const handlesetison=()=> {
        setison(!ison)
    }
    const handlesetisplus=()=> {
        setisplus(!isplus)
    }
    const redirect_profile=()=>{
        router.push("/session")
    }
    const create_public_room=()=>{
        setpublic_room(!public_room)
    }
    const create_private_room=()=>{
        setprivate_room(!private_room)
    }
    const search_for_room=async()=>{
        router.push(`/session/search?id=${search_params}`)
    }
    function checkkey(e) {
        if(e.key=="Enter") {
            search_for_room()
        }
    }
    let make_publicroom=async()=>{
        const res = await fetch("/api/socket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id:Date.now(),
          name:roomname,
          password:"",
          type:"Public",
          members:[session.user.email],
          owner:session.user.email
        })
        })
        const response=await res.json()
        console.log(response)
        if(response) {
            setmake_render(!make_render)
            setpublic_room(false)
        }
    }
    let make_privateroom=async()=>{
        const res = await fetch("/api/socket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id:Date.now(),
          name:roomname,
          password:roompass,
          type:"Private",
          members:[session.user.email],
          owner:session.user.email
        })
        })
        const response=await res.json()
        console.log(response)
        if(response) {
            setmake_render(!make_render)
            setprivate_room(false)
        }
    }
    let plus=isplus?"flex flex-col gap-1.5":"hidden"
    if(ison) {
    return (
        <div className="bg-[#F3F4F4] w-full md:max-h-fit md:sticky md:top-0 md:w-80 md:shrink-0 lg:w-1/4">
            <div className="h-[45vh] min-h-96 w-full flex flex-col bg-[#061E29] pt-4 sm:pt-8 px-2 md:h-screen">
            <div className="flex gap-1.5 items-center justify-between">
            <button onClick={handlesetison} className="hover:cursor-pointer"><AlignJustify className="ml-1" size={28} color="#FFFFFF" /></button>
            <input onChange={(e)=>{setsearch_params(e.target.value)}} onKeyDown={(e)=>checkkey(e)} type="text" name="searchbar" id="searchbar" placeholder="Search for a room to join" className="min-w-0 flex-1 border text-white border-white rounded-full px-2 bg-gray-500 opacity-50"/>
            <button onClick={search_for_room} className="hover: cursor-pointer"><Search size={24} color="#FFFFFF" /></button>
            </div>
            <section className="bg-[#1D546D] w-full rounded-2xl flex flex-col gap-3 items-start justify-between px-3 py-3 mt-2 mb-1 sm:flex-row sm:items-center">
                <div className="flex gap-2">
                <button onClick={handlesetisplus} className="bg-black rounded-4xl hover:cursor-pointer"><PlusCircle size={44} color="#FFFFFF" /></button>
                <div className={plus}>
                    <button onClick={create_public_room}  className=" text-white bg-black hover:cursor-pointer">Public</button>
                    <button onClick={create_private_room} className=" text-white bg-black hover:cursor-pointer">Private</button>
                </div>
                </div>
                {public_room && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
          
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setpublic_room(false)}
                    />

                    <div className="z-100 bg-white p-5 sm:p-6 rounded-xl shadow-xl w-[92%] max-w-md">
                        <h2 className="text-xl font-bold m-2 text-center">Public Room</h2>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <label htmlFor="publicroomname">Room Name</label>
                        <input onChange={(e)=>setroomname(e.target.value)} type="text" name="Room-name" id="publicroomname" className="border-2 border-dashed flex-1 min-w-0 w-full text-left px-2 py-1 rounded-3xl border-black" />
                        </div>
                        <div className="flex justify-between">
                        <button onClick={make_publicroom}
                        className="mt-4 bg-green-500 text-white px-3 py-1 rounded hover:cursor-pointer"
                        >
                        Create
                        </button>
                        <button
                        onClick={() => setpublic_room(false)}
                        className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:cursor-pointer"
                        >
                        Close
                        </button>
                        </div>
                    </div>

                    </div>
                )}
                {private_room && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
          
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setprivate_room(false)}
                    />

                    <div className="z-100 bg-white p-5 sm:p-6 rounded-xl shadow-xl w-[92%] max-w-md">
                        <h2 className="text-xl font-bold m-2 text-center">Private Room</h2>
                        <div className="flex flex-col gap-2 mb-2 sm:flex-row sm:items-center">
                        <label htmlFor="publicroomname">Room Name</label>
                        <input onChange={(e)=>setroomname(e.target.value)} type="text" name="Room-name" id="privateroomname" className="border-2 border-dashed flex-1 min-w-0 w-full text-center px-2 py-1 rounded-3xl border-black" />
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <label htmlFor="privatepassword">Set Password</label>
                        <input onChange={(e)=>setroompass(e.target.value)} type="text" name="Room-name" id="privatepassword" className="border-2 border-dashed flex-1 min-w-0 w-full text-center px-2 py-1 rounded-3xl border-black" />
                        </div>
                        <div className="flex justify-between">
                        <button onClick={make_privateroom}
                        className="mt-4 bg-green-500 text-white px-3 py-1 rounded hover:cursor-pointer"
                        >
                        Create
                        </button>
                        <button
                        onClick={() => setprivate_room(false)}
                        className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:cursor-pointer"
                        >
                        Close
                        </button>
                        </div>
                    </div>

                    </div>
                )}
                <div className="text-base sm:text-xl text-white font-bold">Hello, <button onClick={redirect_profile} className=" hover:cursor-pointer italic underline text-[#E1D9BC]">{name} !!</button></div>
            </section>
            <section className="bg-gray-400 my-2 rounded-t-2xl flex-1 p-2 max-h-3/4 overflow-hidden">
                <div className="flex sticky top-0">
                    <ChevronDown size={22} color="#4B5563" />
                <div className="text-gray-600 font-bold">Public Rooms</div>
                </div>
                <div className="max-h-1/3 overflow-y-auto scrollbar-hide">
                {rooms.map(e => {
                    if(e.type=="Public") {
                       return <Room key={e._id} id={e._id} name={e.name}></Room>
                    }
                })}
                </div>
                <div className="flex">
                    <ChevronDown size={22} color="#4B5563" />
                <div className="text-gray-600 font-bold">Private Rooms</div>
                </div>
                <div className="max-h-7/12 overflow-y-auto scrollbar-hide">
                {rooms.map(e => {
                    if(e.type=="Private") {
                       return <Room key={e._id} id={e._id} name={e.name}></Room>
                    }
                })}
                </div>
            </section>
            </div>
        </div>
    )
    }else{
        return(
            <section className="w-full md:w-auto">
                <div className="h-14 w-full pt-3 px-2 bg-[#061E29] md:h-screen md:w-auto md:pt-8">
            <button onClick={handlesetison} className="hover:cursor-pointer"><AlignJustify className="ml-1" size={28} color="#FFFFFF" /></button>
                </div>
            </section>
        )
    }
    
}
