import ForgotPassword from "@/src/components/ForgotPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Foodie account password. Enter your email to receive a password reset link.",
  robots: { index: false, follow: false },
};

function ResetPassword() {
  return <ForgotPassword />;
}

export default ResetPassword;
