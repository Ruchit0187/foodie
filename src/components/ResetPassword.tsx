"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface IResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
}

function ResetPassword({
  email,
}: {
  email?: string;
}) {
  const {status}=useSession()
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const router=useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IResetPassword>({
    defaultValues: {
      email: email,
    },
  });
  const resetPassword = async (data: IResetPassword) => {
    const resetPasswordValue = {
      email: data.email.trim(),
      password: bcrypt.hashSync(data.password,10),
    };
    if (data.password !== data.confirmPassword) {
      console.log("not match");
      toast.error("Password does not match");
      return;
    }
    try {
      const passwordChange = await axios.patch(
        "/api/reset",
        resetPasswordValue
      );
      if (passwordChange.status === 200) {
        toast.success("Password change Successfully");
        if(status==="unauthenticated"){
          router.push("/");
        }
        reset()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 m-auto h-[87.5vh] lg:py-0">
        <div className="w-full p-6  rounded-lg shadow dark:border md:mt-0 sm:max-w-md  sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-black md:text-2xl ">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            action="post"
            onSubmit={handleSubmit(resetPassword)}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black "
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                readOnly
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                value={email}
                {...register("email", {
                  required: true,
                  pattern: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter New Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("password", { required: true, min: 5 })}
              />
              {errors.password && (
                <p className="text-red-700">Enter The Valid Password</p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Confirm password
              </label>
              <input
                type={`${showPassword ? "password" : "text"}`}
                id="confirm-password"
                placeholder="Enter Confirm Password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("confirmPassword", { required: true })}
              />
              <span
                onClick={(event) => {
                  event.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
                className="cursor-pointer absolute text-2xl -translate-y-8 translate-x-88"
              >
                {showPassword ? <IoEyeOffSharp /> : <IoEye />}
              </span>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer  bg-black text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
