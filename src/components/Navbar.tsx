import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import Profile from "./Profile";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="flex w-full bg-amber-400 mx-auto justify-between items-center sticky top-0 z-1">
      <div className="flex w-[80%] p-2">
        <Link href={"/"} className="pl-2.5 flex items-center">
          <Image
            src={"/foodielogo.png"}
            width={80}
            height={80}
            alt="logo image"
          />
          <span className="self-center text-2xl text-heading font-semibold whitespace-nowrap">
            Flowbite
          </span>
        </Link>
        <div className="flex mx-auto items-center justify-between w-full md:flex md:w-auto md:order-1 text-xl">
          <ul className="font-medium flex  p-4 md:p-0 mt-4  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8  md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link
                href={"/recipes"}
                className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                href={"/blogs"}
                className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href={"/aboutus"}
                className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
              >
                About us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="pr-5 text-2xl">
        {session?.user ? (
          <Profile sessionValue={session}/>
        ) : (
          <Link href={"/signup"} className="flex flex-col items-center gap-1">
            <FaUser /> <p className="text-sm">SignUp</p>
          </Link>
        )}
      </div>
    </div>
  );
}
