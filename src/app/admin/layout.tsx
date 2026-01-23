import { SessionProvider } from "next-auth/react";
import "../globals.css";
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
  title: "Admin Panel",
  icons:"/favicon.png"
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider >
          <Navbar />
          <ToastContainer autoClose={2000} />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
