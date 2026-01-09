import Signup from "@/src/components/Signup";
import Link from "next/link";

function SignUppage() {
  return (
    <>
      <Signup />
      <p className="text-center">
        If Already Registered?
        <Link href={"/signin"} className="text-blue-600 ml-2 text-xl underline">
          Signin
        </Link>
      </p>
    </>
  );
}
export default SignUppage;
