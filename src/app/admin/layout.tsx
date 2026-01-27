import { SessionProvider } from "next-auth/react";
import "../globals.css";
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import { ToastContainer } from "react-toastify";
import { Session } from "next-auth";


export const metadata: Metadata = {
  title: "Admin Panel",
  icons:"/favicon.png"
};
export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode;
  session:Session | null

}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session} >
          <Navbar />
          <ToastContainer autoClose={2000} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
