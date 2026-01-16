import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="flex justify-center flex-col items-center  mx-auto p-3 border-2 w-fit h-fit gap-2 mt-3" >
      <p>Please Login with Email and Password</p>
      <Link href={"/signup"} className="text-center bg-black text-white p-2 rounded-2xl">Go To signup</Link>
    </div>
  );
}
