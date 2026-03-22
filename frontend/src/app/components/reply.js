export default function(props) {
    return(
        
        <div className="bg-yellow-100 max-w-[50%] relative min-h-14 font-medium rounded-r-full px-3 m-1">
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