"use client"
import { SessionProvider } from "next-auth/react";
import Sidebar from "../components/sidebar";

export default function RootLayout({ children }) {
  return (
      
        <div className="flex">
          <SessionProvider>
        <Sidebar></Sidebar>
        </SessionProvider>
        <div className="flex-1">
        <SessionProvider>
        {children}
        </SessionProvider>
        </div>
        </div>
  );
}
