"use client";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, CheckCircle, MessageSquare, AlertCircle, LogOut} from "@deemlol/next-icons";
import { useSession, signOut } from "next-auth/react";
import { useEffect,useState } from "react";

export default function Home() {
  const [firstname,setfirstname]=useState("")
  const [lastname,setlastname]=useState("")
  const [email,setemail]=useState("")
  const [userid,setuserid]=useState("")
  const [activerooms,setactiverooms]=useState("")
  const router=useRouter()
  const {data:session,status}=useSession()
  useEffect(() => {
    if (status === "unauthenticated") {
      alert("Not signed in. Please Sign in");
      router.push("/");
    }
  }, [status, router]);
  useEffect(()=>{
    const get_details=async()=>{
      if(status=="authenticated") {
      const res=await fetch(`/api/session?type=user&id=${session.user.email}`)
      const result=await res.json()
      setfirstname(result.first_name)
      setlastname(result.last_name)
      setactiverooms(result.rooms)
      setuserid(result.userid)
      setemail(result.username)
      }
    }
    get_details()
  },[status])
  if(status=="loading") {
    return(
      <div>
        Hold-on!!Checking Authentication.
      </div>
    )
  }
  if(!session) {
    return null
  }
  const logout=()=>{
    signOut({ callbackUrl: "/" });
  }
  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center relative px-4 py-6">

      {/* Logged In Badge */}
      

      {/* Profile Card */}
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-5 sm:p-8">

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gray-200 rounded-full p-6 mb-4">
            <User size={48} color="#374151" />
          </div>
          <div className="text-center text-[#1D546D] text-xl sm:text-2xl italic break-words">{firstname} {lastname}</div>
        </div>

        <div className="space-y-4">

          <div className="flex items-center gap-3 text-gray-700 min-w-0">
            <Mail size={20} />
            <span className="min-w-0 break-all">{email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 min-w-0">
            <AlertCircle size={20} />
            <span className="min-w-0 break-all">{userid}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700 min-w-0">
            <MessageSquare size={20} />
            <span>Version: {Math.random().toFixed(1)}.{Math.random().toFixed(2)}</span>
          </div>
        </div>

        <div className="flex m-2 justify-end">
        <button onClick={logout} className="flex items-center gap-2 hover:cursor-pointer bg-green-500 text-white px-4 py-1.5 rounded-full shadow-md">
        <LogOut size={18} />
        <span className="text-sm font-semibold">Logout</span>
      </button>
      </div>

      </div>
    </div>
  );
}
