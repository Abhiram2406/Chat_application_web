import { useState } from "react"

export default function() {
    const [d1,setd1]=useState(false)
    const [d2,setd2]=useState(false)
    const [d3,setd3]=useState(false)
    let dot1=d1? ".":""
    let dot2=d2? ".":""
    let dot3=d3? ".":""
    setInterval(()=>{
        setd1(!d1)
    },[30])
    setInterval(()=>{
        setd2(!d2)
    },[20])
    setInterval(()=>{
        setd3(!d3)
    },[10])
    return (
        <div className="flex justify-center items-center text-2xl h-screen w-full bg-gray-500">
            LOADING{dot1}{dot2}{dot3}
        </div>
    )
}