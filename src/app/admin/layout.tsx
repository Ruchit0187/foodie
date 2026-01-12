import { SessionProvider } from "next-auth/react";
import "../globals.css";
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "Admin Panel",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionProvider>
        <body>
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
