"use client";
import { useRouter } from "next/navigation";

export default function(props) {
    const router=useRouter()
    const enterchat=()=>{
        router.push(`/session/chat?id=${props.id}`);
    };
    return (
        <div>
        <button onClick={enterchat} className="flex flex-col h-13 p-1 text-center hover:cursor-pointer  border-black overflow-hidden">
            <div className="flex items-start font-semibold opacity-75"><div>{props.name}</div></div>
            <div><div className="opacity-75">Open the chat to see the recent messages</div></div>
        </button>
        <hr></hr>
        </div>
    )
}