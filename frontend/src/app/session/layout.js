"use client"
import { SessionProvider } from "next-auth/react";
import Sidebar from "../components/sidebar";

export default function RootLayout({ children }) {
  return (
      
        <div className="flex min-h-screen flex-col md:flex-row">
          <SessionProvider>
        <Sidebar></Sidebar>
        </SessionProvider>
        <div className="min-w-0 flex flex-1 flex-col">
        <SessionProvider>
        {children}
        </SessionProvider>
        </div>
        </div>
  );
}
