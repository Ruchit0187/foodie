"use client";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import Profile from "./Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AuthLoading from "./AuthLoading";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [adminStatus, setAdminStatus] = useState<string>("false");
  const [open, setOpen] = useState<boolean>(false);
  const pathURL = usePathname();
  useEffect(() => {
    const value = session?.user?.isAdmin!;
    setAdminStatus(value);
  }, [session]);
  if (status === "loading") return <AuthLoading />;
  return (
    <div className="flex w-full bg-amber-400 mx-auto justify-between items-center sticky top-0 z-1  md:flex-row max-[760px]:items-start">
      <div className="flex w-full md:w-[80%] p-2 flex-col md:flex-row max-[760px]:justify-items-start max-[760px]:items-start">
        <Link
          href={"/"}
          className="pl-2.5 flex items-center justify-center md:justify-start max-[760px]:justify-start"
        >
          <Image
            src={"/foodielogo.png"}
            width={80}
            height={80}
            alt="logo image"
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
          />
          <span className="self-center text-xl sm:text-2xl text-heading font-semibold whitespace-nowrap">
            Foodie
          </span>
        </Link>
        <div
          className={` flex mx-auto items-center justify-center md:justify-between w-full md:flex md:w-auto md:order-1 text-base sm:text-lg md:text-xl ${open ? "flex" : "hidden"}`}
        >
          <ul
            className={`font-medium flex flex-col md:flex-row p-4 md:p-0 mt-4 md:mt-0 rounded-base bg-neutral-secondary-soft md:bg-neutral-primary
    md:space-x-8
    items-start md:items-center
    w-full
              `}
            onClick={() => setOpen((prev) => !prev)}
          >
            <li>
              <Link
                href={`/recipes`}
                className={`${pathURL.includes("/recipes") ? "underline" : ""} block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0`}
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                href={`/blogs`}
                className={`${pathURL.includes("/blogs") ? "underline" : ""} block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0`}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href={`/aboutus`}
                className={` ${pathURL.includes("/aboutus") ? "underline" : ""} block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0`}
              >
                AboutUs
              </Link>
            </li>

            {adminStatus === "true" ? (
              <li className={`${adminStatus === "true" ? "" : "hidden"}`}>
                <Link
                  href={`/admin`}
                  className={`${pathURL.includes("/admin") ? "underline" : ""} block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0`}
                >
                  Admin
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 max-[750px]:mt-5">
        <div className="pr-0 md:pr-5 text-xl sm:text-2xl mt-2 md:mt-0 max-[760px]:justify-end">
          {session?.user ? (
            <Profile sessionValue={session} />
          ) : (
            <Link href={"/signup"} className="flex flex-col items-center gap-1">
              <FaUser />
              <p className="text-xs sm:text-sm">SignUp</p>
            </Link>
          )}
        </div>
        <div className="flex sm:order-2">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
