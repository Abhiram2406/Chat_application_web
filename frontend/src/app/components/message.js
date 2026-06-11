export default function(props) {
    return(
        <div className="flex w-full justify-end px-1 py-0.5">
    <div className="bg-[#44bdf5e3] relative font-medium max-w-[85%] sm:max-w-[70%] md:max-w-[55%] min-h-14 rounded-l-3xl rounded-tr-3xl px-3.5 py-2 m-1 break-words">
            {props.text}
             <div className="mt-2 text-right font-normal opacity-50 text-black text-xs">
                {new Date(props.time).toLocaleTimeString()}
            </div>
        </div>
        </div>
    )
}
