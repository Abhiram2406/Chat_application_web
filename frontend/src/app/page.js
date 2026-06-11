"use client"
import {signIn} from 'next-auth/react'
import { useState } from 'react'
import Temp from "./components/temp"
import { useRouter } from 'next/navigation'

export default function() {
  const router = useRouter()
    const [Signup, setSignup] = useState(false)
    const [Signin, setSignin] = useState(true)
    const [username,setusername] = useState("");
    const [password,setpassword] = useState("");
    const [first_name,setfirst_name] = useState("");
    const [last_name,setlast_name] = useState("");
    const [user_id,setuser_id] = useState("");

    let ClassDeciderSignin = !Signin ? 'hidden' : 'bg-gray-400 w-full max-w-md rounded-3xl px-4 py-8 sm:px-6 flex flex-col items-center gap-8 sm:gap-12'
    let ClassDeciderSignup= !Signup? 'hidden' : 'bg-white w-full max-w-md rounded-3xl px-4 py-8 sm:px-6 flex flex-col items-center gap-8 sm:gap-12'
    
    let open_signup=()=>{
        setSignup(true)
        setSignin(false)
    }
    let open_signin=()=>{
        setSignup(false)
        setSignin(true)
    }
    const call=async ()=>{
      const response=await signIn("credentials",{
      username,
      password,
      method:"login",
      first_name:"",
      last_name:"",
      redirect:false
    })
    if(response.ok) {
      router.push("/session")
    }else{
      alert("Invalid credentials")
    }
    }
    const call_signup=async ()=>{
      const response=await signIn("credentials",{
      username,
      password,
      first_name,
      last_name,
      user_id,
      method:"signup",
      redirect:false
    })
    if(response.ok) {
      call()
    }else{
      alert("user already exist please signin")
      router.push("/")
    }
    }
  return (
    <div className='bg-sky-900 min-h-screen px-4 py-8 sm:px-8 flex justify-center items-center'>
      <div className={ClassDeciderSignin}>
        <h1 className='text-center text-white font-[400] text-3xl sm:text-4xl p-[10px]'>Sign In</h1>
        <div className='flex w-full flex-col gap-3'>
        <input onChange={(e)=>setusername(e.target.value)} type="email" name="username" id="username" placeholder='Enter your email' className='border-[2px] border-sky-900 p-2 rounded-3xl w-full'/>
        <input onChange={(e)=>setpassword(e.target.value)} type="password" name="password" id="password" placeholder='Enter your password'className='border-[2px] border-sky-900 p-2 rounded-3xl w-full'/>
        <button onClick={call} className=' text-center mt-4 bg-sky-800 text-white p-3 rounded-3xl cursor-pointer'>Log In</button>
      </div>
      <p className='text-center'>Don't have an account? <button onClick={open_signup}  className='cursor-pointer text-white'>Signup</button></p>
      </div>
      <div className={ClassDeciderSignup}>
        <h1 className='text-center text-gray-400 font-[400] text-3xl sm:text-4xl p-[10px]'>Sign Up</h1>
        <div className='flex w-full flex-col gap-3'>
        <input onChange={(e)=>setusername(e.target.value)} type="email" name="username" id="username" placeholder='Enter your email' className='border-[2px] border-sky-900 p-2 rounded-3xl w-full'/>
        <input onChange={(e)=>setpassword(e.target.value)} type="password" name="password" id="password" placeholder='Set your password'className='border-[2px] border-sky-900 p-2 rounded-3xl w-full'/>
        <input onChange={(e)=>setfirst_name(e.target.value)} type="text" name="password" id="password" placeholder='First Name'className='border-[2px] border-sky-900 p-2 rounded-3xl w-full'/>
        <input onChange={(e)=>setlast_name(e.target.value)} type="text" name="password" id="password" placeholder='Last Name'className='border-[2px] border-sky-900 p-2 rounded-3xl w-full'/>
        <input onChange={(e)=>setuser_id(e.target.value)} type="text" name="userid" id="userid" placeholder='Set userID'className='border-[2px] border-sky-900 p-2 rounded-3xl w-full'/>
        <button onClick={call_signup} className='text-center mt-2 bg-sky-800 text-gray-200 p-3 rounded-3xl cursor-pointer'>Create Account</button>
      </div>
      <p className='text-center text-gray-400'>Remembered the details? <button onClick={open_signin}  className='cursor-pointer text-black'>Signin</button></p>
      </div>

    </div>
  )
}
