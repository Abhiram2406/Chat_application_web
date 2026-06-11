"use client";
import { useRouter } from "next/navigation";

export default function(props) {
    const router=useRouter()
    const enterchat=()=>{
        router.push(`/session/chat?id=${props.id}`);
    };
    return (
        <div>
        <button onClick={enterchat} className="flex w-full flex-col p-2 text-left hover:cursor-pointer border-black overflow-hidden">
            <div className="flex items-start font-semibold opacity-75"><div className="break-words">{props.name}</div></div>
            <div><div className="text-sm opacity-75">Open the chat to see the recent messages</div></div>
        </button>
        <hr></hr>
        </div>
    )
}
