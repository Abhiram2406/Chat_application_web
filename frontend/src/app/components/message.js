export default function(props) {
    return(
        <div className="flex w-full m-1 justify-end">
    <div className="bg-[#44bdf5e3] relative font-medium max-w-[50%] min-h-14 rounded-l-full px-3.5 py-1 m-1">
            {props.text}
             <div className="mt-2 text-right font-normal opacity-50 text-black text-xs">
                {new Date(props.time).toLocaleTimeString()}
            </div>
        </div>
        </div>
    )
}