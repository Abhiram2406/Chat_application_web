import { useEffect, useState } from "react"

export default function Loading() {
    const [d1,setd1]=useState(false)
    const [d2,setd2]=useState(false)
    const [d3,setd3]=useState(false)
    let dot1=d1? ".":""
    let dot2=d2? ".":""
    let dot3=d3? ".":""
    useEffect(() => {
        const interval1 = setInterval(() => setd1((prev) => !prev), 300)
        const interval2 = setInterval(() => setd2((prev) => !prev), 450)
        const interval3 = setInterval(() => setd3((prev) => !prev), 600)

        return () => {
            clearInterval(interval1)
            clearInterval(interval2)
            clearInterval(interval3)
        }
    }, [])
    return (
        <div className="flex justify-center items-center text-2xl h-screen w-full bg-gray-500">
            LOADING{dot1}{dot2}{dot3}
        </div>
    )
}
