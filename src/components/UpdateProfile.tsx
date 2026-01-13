"use client";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { userData } from "../types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface userFormData extends userData {
  confirmPassword: string;
}

function UpdateProfile({ userData }: { userData: userData }) {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const router = useRouter();
  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors },
    reset,
  } = useForm<userFormData>({
    defaultValues: {
      name: userData.name,
    },
  });
  const onSubmit: SubmitHandler<userFormData> = async (data) => {
    // const userNewData = {
    //   name: data.name.trim(),
    //   password:data.password.trim(),
    //   _id: userData._id,
    // };

    try {
      if (data.password.length === 0) {
        const updateProfile = await axios.patch("/api/profile", {
          name: data.name.trim(),
          _id: userData._id,
        });
      } else if (data.name === "") {
        const updateProfile = await axios.patch("/api/profile", {
          password: data.password.trim(),
          _id: userData._id,
        });
      } else {
        const updateProfile = await axios.patch("/api/profile", {
          name: data.name.trim(),
          password: data.password.trim(),
          _id: userData._id,
        });
      }

      // if (updateProfile.status === 200) {
      //   toast.success("User Data Updated Successfully");
      //   reset();
      //   router.back();
      // }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error("User Data is not Updated");
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  w-[20%] mx-auto gap-2 mt-10 justify-center items-center"
      >
        <label htmlFor="name" className="text-xl font-semibold">
          Name:
        </label>
        <input
          {...register("name")}
          className="border-2 rounded-2xl p-2"
          id="name"
          placeholder="Enter the New Name"
        />
        {errors.name && <p className="text-red-500">Enter New Name</p>}

        <label htmlFor="password" className="text-xl font-semibold">
          Password:
        </label>
        <input
          type={`${showPassword ? "password" : "text"}`}
          {...register("password", { min: 5 })}
          className="border-2 rounded-2xl relative p-2"
          id="password"
          placeholder="Enter the New Password"
        />
        <span
          onClick={(event) => {
            event.preventDefault();
            setShowPassword((prev) => !prev);
          }}
          className="absolute text-2xl right-[43%] top-[33.5%] translate-y-[-50%] translate-x-full  cursor-pointer"
        >
          {showPassword ? <IoEyeOffSharp /> : <IoEye />}
        </span>
        {errors.password && <p className="text-red-500">Enter New Password</p>}
        <label htmlFor="confirmpassword" className="text-xl font-semibold">
          Confirm Password:
        </label>
        <input
          type={`${showPassword ? "password" : "text"}`}
          {...register("confirmPassword", {
            min: 5,
          })}
          className="border-2 rounded-2xl relative p-2"
          id="confirmpassword"
          placeholder="Enter the New Password again"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">Enter New Password</p>
        )}
        <button className="bg-black text-white p-2 rounded-2xl block mx-auto ">
          Submit
        </button>
      </form>
    </>
  );
}

export default UpdateProfile;
