"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface formData {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
        router.push("/signin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 409) {
          console.log("yes");
          alert(error.response?.data.error);
        } else {
          alert(error);
        }
      }
      setLoading(false);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();
  return (
    <>
      <form
        className="flex flex-col w-1/2 mx-auto gap-2 p-8"
        method="post"
        onSubmit={handleSubmit(signupData)}
      >
        <label htmlFor="Name" className="text-2xl">
          Name
        </label>
        <input
          {...register("name", { required: true })}
          id="Name"
          className="border-2  p-1 block"
          placeholder="Enter your Name"
        />
        {errors.name && <p className="text-red-500">Enter the Name</p>}
        <label htmlFor="Email" className="text-2xl">
          Email
        </label>
        <input
          {...register("email", {
            required: true,
            pattern: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          placeholder="Enter your Email"
          id="Email"
          className="border-2 p-1"
        />
        {errors.email && (
          <p className="text-red-500">Enter the Valid Email id</p>
        )}
        <label htmlFor="Password" className="text-2xl">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: true, min: 5 })}
          className="border-2  p-1"
          id="Password"
          placeholder="Enter your Password"
        />
        {errors.password && <p className="text-red-500">Enter the password</p>}
        {loading ? (
          <button className="block mx-auto bg-black text-white rounded-2xl p-2">
            Loading
          </button>
        ) : (
          <button className="block mx-auto bg-black text-white rounded-2xl p-2">
            Sign Up
          </button>
        )}
      </form>
    </>
  );
}
