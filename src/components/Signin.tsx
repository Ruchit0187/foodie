"use client";

import axios  from "axios";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

interface Isignin {
  email: string;
  password: string;
}
export default function Signin() {
  const router = useRouter();
  const signinData = async (data: Isignin) => {
    const userSignData = {
      email: data.email.trim(),
      password: data.password,
    };
    try {
      const signInData = await axios.post("/api/signin", userSignData);
      if (signInData.status === 200) {
        toast.success("SignIn successfully");
        router.push("/recipe");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Isignin>();
  return (
    <>
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
          <input
            type="password"
            id="password"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="Enter the password"
            {...register("password", {
              required: true,
              min: 5,
            })}
          />
          {errors.password && (
            <p className="text-red-500">Enter the password</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-black mx-auto block rounded-2xl box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none "
        >
          Submit
        </button>
      </form>
      <button
        className="bg-black text-white flex justify-center items-center gap-2 p-2 rounded-2xl mx-auto mt-2"
        onClick={() => signIn("google")}
      >
        <FcGoogle />
        Signup with Google
      </button>
    </>
  );
}
