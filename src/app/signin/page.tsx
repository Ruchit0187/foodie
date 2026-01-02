import { signIn } from "@/auth";
import Signin from "@/src/components/Signin";
import Link from "next/link";

function SignIn() {
  return (
    <div>
      <Signin/>
      <div className="text-center mt-2">
        Reset Password
        <Link href={"/forgot"} className="text-center  text-violet-600 ml-2">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
export default SignIn;
// export default function SignIn() {
//   return (
//     <form
//       action={async (formData) => {
//         "use server";
//         await signIn("credentials", formData);
//       }}
//     >
//       <label>
//         Email
//         <input
//           name="email"
//           type="email"
//           style={{ border: "1px solid black" }}
//         />
//       </label>
//       <label>
//         Password
//         <input
//           name="password"
//           type="password"
//           style={{ border: "1px solid black" }}
//         />
//       </label>
//       <button>Sign In</button>
//     </form>
//   );
// }
