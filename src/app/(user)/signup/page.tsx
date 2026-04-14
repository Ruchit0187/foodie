import Signup from "@/src/components/Signup";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Foodie Account",
  description: "Join Foodie today! Sign up to discover recipes, read food blogs, save bookmarks, and become part of our foodie community.",
  robots: { index: false, follow: false },
};

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
