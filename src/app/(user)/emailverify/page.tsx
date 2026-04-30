import type { Metadata } from "next";
import EmailVerification from "@/src/components/EmailVerification";

export const metadata: Metadata = {
  title: "Verify Your Email",
  description: "Verify your email address to activate your Foodie account.",
  robots: { index: false, follow: false },
};

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const tokenValue = await searchParams;
  const verifyToken = String(Object.keys(tokenValue)[0]);
  return <EmailVerification verifyToken={verifyToken}/>;
}

export default page;
