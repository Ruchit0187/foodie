import Signup from "@/src/components/Signup";
import { cookies } from "next/headers";
import Link from "next/link";
function Signuppage() {
  return (
    <>
      <Signup />
      <p className="text-center">
        If Already Registered
        <Link href={"/signin"} className="text-blue-600 ml-2">
          Signin
        </Link>
      </p>
    </>
  );
}
export default Signuppage;
