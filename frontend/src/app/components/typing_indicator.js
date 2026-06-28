import { useEffect,useState } from "react";

export default function TypingIndicator() {
    const [visible, setVisible] = useState(true);
//     useEffect(() => {
//     const timer = setTimeout(() => {
//       setVisible(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

  if (!visible) return null;
  return (
    <div className="bg-yellow-100 sm: md: relative min-h-14 font-medium rounded-r-3xl rounded-tl-3xl px-3 py-2 m-1">
      <div className="flex gap-1 items-center h-6">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:200ms]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:400ms]"></span>
        </div>
    </div>
  );
}