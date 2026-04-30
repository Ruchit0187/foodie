import type { Metadata } from "next";
import Signin from "@/src/components/Signin";

export const metadata: Metadata = {
  title: "Sign In to Foodie",
  description: "Sign in to your Foodie account to access recipes, blogs, bookmarks, and your personalized food dashboard.",
  robots: { index: false, follow: false },
};

 function SignIn() {
  return <Signin />;
}
export default SignIn;
