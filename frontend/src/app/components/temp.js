// // import { Plus, Settings, Hash, Lock, MessageSquare } from "lucide-react"; // Optional icons, see note below

// export default function Sidebar() {
//   return (
//     <aside className="h-screen w-72 bg-slate-900 text-slate-200 flex flex-col border-r border-slate-800">
      
//       {/* 1. User Profile Header */}
//       <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
//         <div className="flex items-center gap-3">
//           {/* Avatar with Gradient */}
//           <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
//             A
//           </div>
//           {/* Name & Status */}
//           <div className="flex flex-col">
//             <span className="font-semibold text-sm text-white">Abhi</span>
//             <span className="text-xs text-emerald-400 flex items-center gap-1">
//               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
//               Online
//             </span>
//           </div>
//         </div>
        
//         {/* Settings Icon (Placeholder) */}
//         <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
//            {/* If you don't have lucide-react, just put '⚙️' here */}
//            {/* <Settings size={18} /> */}
//         </button>
//       </div>

//       {/* 2. Primary Action Button */}
//       <div className="px-4 mt-6">
//         <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-md font-medium transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
//           {/* <Plus size={18} /> */}
//           Create New
//         </button>
//       </div>

//       {/* 3. Navigation / Lists */}
//       <nav className="flex-1 overflow-y-auto px-3 mt-6 space-y-8">
        
//         {/* Public Rooms Section */}
//         <div>
//           <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//             Public Rooms
//           </h3>
//           <ul className="space-y-1">
//             <li className="flex items-center gap-3 px-3 py-2 bg-slate-800 text-white rounded-md cursor-pointer border-l-4 border-indigo-500">
//               {/* <Hash size={16} className="text-indigo-400" /> */}
//               <span className="text-sm">general</span>
//             </li>
//             <li className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800/50 text-slate-400 hover:text-slate-100 rounded-md cursor-pointer transition-colors">
//               {/* <Hash size={16} /> */}
//               <span className="text-sm">random</span>
//             </li>
//           </ul>
//         </div>

//         {/* Private Groups Section */}
//         <div>
//           <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//             Private Groups
//           </h3>
//           <ul className="space-y-1">
//             <li className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800/50 text-slate-400 hover:text-slate-100 rounded-md cursor-pointer transition-colors">
//               {/* <Lock size={16} /> */}
//               <span className="text-sm">Project Alpha</span>
//             </li>
//           </ul>
//         </div>

//          {/* DMs Section */}
//          <div>
//           <h3 className="px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
//             Direct Messages
//           </h3>
//           <ul className="space-y-1">
//             <li className="flex items-center gap-3 px-3 py-2 hover:bg-slate-800/50 text-slate-400 hover:text-slate-100 rounded-md cursor-pointer transition-colors">
//                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
//                <span className="text-sm">Jane Doe</span>
//             </li>
//           </ul>
//         </div>

//       </nav>
//     </aside>
//   );
// }