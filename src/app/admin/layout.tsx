import { SessionProvider } from "next-auth/react";
import "../globals.css";
import Navbar from "./_components/Navbar";
import type { Metadata } from "next";

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
