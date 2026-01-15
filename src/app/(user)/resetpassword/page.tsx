import { auth } from "@/auth";
import ResetPassword from "@/src/components/ResetPassword";
import { Session } from "next-auth";

async function ResetPasswordPage() {
  return <ResetPassword/>;
}

export default ResetPasswordPage;
