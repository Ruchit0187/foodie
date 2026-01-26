"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import OtpVerify from "./OtpVerify";

interface IEmail {
  email: string;
}

function ForgotPassword() {
  const [otpCheck, setOtpCheck] = useState<boolean>(false);
  
  const otpGenerator = async (emailData: IEmail) => {
    const email = emailData.email.trim();
    try {
      const emailStatus = await axios.post("/api/forgot", { email });
      if (emailStatus.status === 200) {
        setOtpCheck(true);
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
    watch
  } = useForm<IEmail>();
  const emailValue=watch("email");

  return otpCheck ? (
    <OtpVerify  email={emailValue}/>
  ) : (
    <div>
      <form
        className="max-w-sm mx-auto mt-2"
        method="post"
        onSubmit={handleSubmit(otpGenerator)}
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
            placeholder="name@foodie.com"
            {...register("email", {
              required: true,
              pattern: /^\s*[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && (
            <p className="text-red-500">Please Enter the valid email</p>
          )}
        </div>

        <button
          type="submit"
          className="text-white bg-black mx-auto block rounded-2xl box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
