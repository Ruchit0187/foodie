import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="flex w-full bg-amber-400 mx-auto justify-between items-center">
      <div className="flex w-2/4 p-2">
        <Link href={"/"} className="px-2.5">
          <Image
            src={"/foodielogo.png"}
            width={80}
            height={80}
            alt="logo image"
          />
        </Link>
        <ul className="flex w-full justify-between items-center text-2xl ml-2.5">
          <li>
            <Link href={"/recipe"}>Recipes</Link>
          </li>
          <li>
            <Link href={"/blogs"}>Blogs</Link>
          </li>
          <li>
            <Link href={"/about"}>About us</Link>
          </li>
        </ul>
      </div>
      <div className="pr-5 text-2xl">
        <Link href={"/signup"} className="flex flex-col items-center gap-1"><FaUser/> <p className="text-sm">SignUp</p></Link>
      </div>
    </div>
  );
}
