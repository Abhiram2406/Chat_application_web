"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function({searchParams}) {
    const router=useRouter()
    const [checkpass, setcheckpass] = useState("");
    const [type,settype]=useState("")
    const [id,setid]=useState("")
    const [name,setname]=useState("")
    const [password,setpassword]=useState("")
    const [isprivate,setisprivate]=useState(false)
    const [nodataa,setnodataa]=useState(false)

    const params = useSearchParams()
    const idd = params.get("id")
    console.log(idd)
    const {data:session,status}=useSession()


    useEffect(()=>{
        const getdata=async()=>{
            const res= await fetch(`/api/session/search?id=${idd}`)
            const result=await res.json()
            if(result!="No data found") {
            setnodataa(false)
            settype(result.type);
            setname(result.name);
            setid(result.id);
            if(result.type==="Private") {
                setcheckpass(result.password.trim())
                console.log(checkpass)
                setisprivate(true)
            }else{
                setisprivate(false)
            }
        }else{
            setnodataa(true)
        }
        }
        getdata()
    },[idd])

    const validate_request= async()=>{
        if(isprivate && password.trim()!==checkpass) {
            alert("Wrong password. Try again!")
        }else{
            const up= await fetch("/api/session/search", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomId:id,
                userId: session.user.email
             })
            })
            router.refresh()
            router.push('/session')
        }
    }

    if(nodataa) {
        return (
            <div className="bg-[#1D546D] h-screen p-4.5 flex justify-center items-center opacity-80 text-4xl">
                !!Room Not Found!!
            </div>
        )
    }

    return(
        <div className="bg-[#1D546D] h-screen p-4.5">
        <h1 className="text-2xl font-bold text-white">Available Rooms</h1>
        <br></br>
        <div className="bg-gray-400 rounded">
        <div className="flex flex-col p-2  border-black overflow-hidden">
            <div className="flex items-start font-semibold"><div>{name}</div></div>
            <div className="flex flex-col items-start mb-2">
                <div>Type: {type}</div>
                <div>ID: {id}</div>
            </div>
            {isprivate && (
                <input onChange={(e)=>setpassword(e.target.value)} className="bg-black opacity-50 p-1 w-[25%] text-white" type="text" name="room_pass" placeholder="Enter password" id="room_pass" />
            )}
            <button onClick={validate_request} className="flex m-2 justify-start">
        <div className=" hover: cursor-pointer flex items-center justify-start gap-2 bg-green-500 text-white px-4 py-1.5">
        <span className="text-sm font-semibold">Join</span>
      </div>
      </button>
        </div>
        <hr></hr>
        </div>
        </div>
    )
}