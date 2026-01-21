"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { IoEye } from "react-icons/io5";
import { IoEyeOffSharp } from "react-icons/io5";
import OtpVerify from "./OtpVerify";
import Link from "next/link";
import { authSignin } from "../types";
interface Isignin {
  email: string;
  password: string;
}
export default function Signin() {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [userSignindata, setUserSignindata] = useState<authSignin>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [otpVerify, setOtpVerify] = useState<boolean>(false);
  const signinData = async (formData: Isignin) => {
    const userSignData = {
      email: formData.email.trim(),
      password: formData.password,
    };
    try {
      const signInApiResponse = await axios.post("/api/signin", userSignData);
      setLoading(true);
      const email = userSignData.email;
      if (signInApiResponse.status === 200) {
        try {
          await axios.post("/api/forgot", { email });
          setOtpVerify(true);
          setUserSignindata(signInApiResponse?.data);
        } catch (error) {
          console.log("Error Generated");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.error);
      }
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Isignin>({
    disabled: loading,
  });
  return (
    <>
      {otpVerify ? (
        <OtpVerify userSigninData={userSignindata} />
      ) : (
        <div>
          <form
            className="max-w-sm mx-auto mt-2"
            method="post"
            onSubmit={handleSubmit(signinData)}
          >
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2.5  font-medium text-heading text-xl"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="name@flowbite.com"
                {...register("email", {
                  required: true,
                  pattern: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
              {errors.email && (
                <p className="text-red-500">Enter the valid Email id</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2.5 font-medium text-heading text-xl"
              >
                Your password
              </label>
              <div className="relative inline-block w-full">
                <input
                  type={`${showPassword ? "password" : "text"}`}
                  id="password"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block  px-3 py-2.5 shadow-xs placeholder:text-body w-full "
                  placeholder="Enter the password"
                  {...register("password", {
                    required: true,
                    min: 5,
                  })}
                />
                <span
                  onClick={(event) => {
                    event.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                  className="cursor-pointer absolute text-2xl top-[50%] translate-y-[-50%] translate-x-full right-10"
                >
                  {showPassword ? <IoEyeOffSharp /> : <IoEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500">Enter the password</p>
              )}
            </div>

            <button
              type="submit"
              className="text-white bg-black mx-auto block rounded-2xl box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none  cursor-pointer"
            >
              Submit
            </button>
          </form>
          <button
            className="bg-black text-white flex justify-center items-center gap-2 p-2 rounded-2xl mx-auto mt-2"
            onClick={() => signIn("google")}
          >
            <FcGoogle />
            SignIn with Google
          </button>
          <div className="text-center mt-2">
            Reset Password
            <Link
              href={"/forgot"}
              className="text-center  text-violet-600 ml-2"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
