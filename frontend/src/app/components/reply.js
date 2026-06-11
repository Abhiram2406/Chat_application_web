export default function(props) {
    return(
        
        <div className="bg-yellow-100 max-w-[85%] sm:max-w-[70%] md:max-w-[55%] relative min-h-14 font-medium rounded-r-3xl rounded-tl-3xl px-3 py-2 m-1 break-words">
            <div className="mb-2 text-left opacity-80 font-normal text-black text-xs">
                {props.user}
            </div>
            {props.text}
            <div className="mt-2 font-normal opacity-50 text-black text-xs">
                {new Date(props.time).toLocaleTimeString()}
            </div>
        </div>
    )
}
