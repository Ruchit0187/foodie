"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
interface formData {
  name: string;
  email: string;
  password: string;
}
export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const signupData = async (data: formData) => {
    const signupData = {
      name: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
    };
    setLoading(true);
    try {
      const userSignupData = await axios.post("/api/signup", signupData);
      if (userSignupData.status === 200) {
        setLoading(false);
        router.push("/signin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
      setLoading(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({
    disabled:loading
  });
  return (
    <>
      <form
        className="flex flex-col gap-4 w-fit sm:w-full md:w-[50%] lg:w-[30%] max-[600px]:w-fit mx-auto p-4 sm:p-6 md:p-8"
        onSubmit={handleSubmit(signupData)}
      >
        <label htmlFor="Name" className="text-2xl font-semibold">
          Name
        </label>
        <input
          {...register("name", { required: true })}
          id="Name"
          className="border-2  p-1.5 block rounded-2xl"
          placeholder="Enter your Name"
        />
        {errors.name && (
          <p className="text-red-500">Please provide your name to continue.</p>
        )}
        <label htmlFor="Email" className="text-2xl font-semibold">
          Email
        </label>
        <input
          {...register("email", {
            required: true,
            pattern: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          placeholder="Enter your Email"
          id="Email"
          className="border-2 p-1.5 rounded-2xl"
        />
        {errors.email && (
          <p className="text-red-500">
            Oops! Please provide a valid email address.
          </p>
        )}
        <label htmlFor="Password" className="text-2xl font-semibold">
          Password
        </label>
        <div className="relative inline-block w-full">
          <input
            type={`${showPassword ? "password" : "text"}`}
            {...register("password", { required: true, min: 5 })}
            className="border-2  p-1.5 rounded-2xl w-full"
            id="Password"
            placeholder="Enter your Password"
          />
          <span
            onClick={(event) => {
              event.preventDefault();
              setShowPassword((prev) => !prev);
            }}
            className="absolute text-2xl top-[50%] translate-y-[-50%] translate-x-full right-10 cursor-pointer"
          >
            {showPassword ? <IoEyeOffSharp /> : <IoEye />}
          </span>
        </div>
        {errors.password && <p className="text-red-500">Password cannot be empty.</p>}
        {loading ? (
          <button className="block mx-auto bg-black text-white rounded-2xl p-2">
            Loading
          </button>
        ) : (
          <button className="block mx-auto bg-black text-white rounded-2xl p-2 cursor-pointer">
            Sign Up
          </button>
        )}
      </form>
      <button
        className="bg-black text-white flex justify-center items-center gap-2 p-2 rounded-2xl mx-auto cursor-pointer"
        onClick={() => signIn("google")}
      >
        <FcGoogle />
        Signup with Google
      </button>
    </>
  );
}
