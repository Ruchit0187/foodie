import Signin from "@/src/components/Signin";
import Link from "next/link";

async function Loginpage() {
 
  return (
    <div>
      <Signin />
      <div className="text-center mt-2">
        Reset Password
        <Link href={"/forgot"} className="text-center  text-violet-600 ml-2">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
export default Loginpage;
