import ResetPassword from "@/src/components/ResetPassword";
import { cookies } from "next/headers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Create a new password for your Foodie account.",
  robots: { index: false, follow: false },
};

async function ResetPasswordPage() {
  const cookie=await cookies();
  const email=cookie.get("email")?.value
  return <ResetPassword email={email} />;
}

export default ResetPasswordPage;
