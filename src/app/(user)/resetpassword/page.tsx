import ResetPassword from "@/src/components/ResetPassword";
import { cookies } from "next/headers";

async function ResetPasswordPage() {
  const cookie=await cookies();
  const email=cookie.get("email")?.value
  return <ResetPassword email={email} />;
}

export default ResetPasswordPage;
