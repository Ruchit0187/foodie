"use client";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { userData } from "../types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ResetPassword from "./ResetPassword";

interface userFormData extends userData {
  confirmPassword: string;
}

function UpdateProfile({ userData }: { userData: userData }) {
  const [editPassword, setEditPassword] = useState<boolean>(false);
  const [editName, setEditName] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<userFormData>({
    defaultValues: {
      name: userData.name,
    },
  });
  const onSubmit: SubmitHandler<userFormData> = async (data) => {
    try {
      const updateProfile = await axios.patch("/api/profile", {
        name: data.name.trim(),
        _id: userData._id,
      });
      if (updateProfile.status === 200) {
        toast.success("User Data Updated Successfully");
        reset();
        setEditName(false);
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error("User Data is not Updated");
      }
    }
  };
  return (
    <>
      <div className="flex mx-auto text-center gap-2 items-center justify-center mt-2">
        <span className="p-1 text-xl">Change Name</span>
        <button
          className="  bg-black text-white  p-1 rounded-2xl cursor-pointer"
          onClick={() => {
            setEditPassword(false);
            setEditName((prev) => !prev);
          }}
        >
          Edit Name
        </button>
      </div>
      <div className="flex mx-auto text-center gap-2 items-center justify-center mt-2">
        <span className="p-1 text-xl">Change Password</span>
        <button
          className=" bg-black text-white mt-3 p-1  rounded-2xl cursor-pointer"
          onClick={() => {
            setEditPassword((prev) => !prev);
            setEditName(false);
          }}
        >
          Edit Password
        </button>
      </div>
      {editPassword && <ResetPassword email={userData.email} />}
      {editName && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col border-2 w-fit p-2 mx-auto gap-2 mt-10 justify-center "
        >
          <label htmlFor="name" className="text-xl font-semibold">
            Name:
          </label>
          <input
            {...register("name", { required: true })}
            className="border-2 rounded-2xl p-2"
            id="name"
            placeholder="Enter the New Name"
          />
          {errors.name && <p className="text-red-500">Enter New Name</p>}
          <button className="bg-black text-white p-2 rounded-2xl block mx-auto cursor-pointer">
            Submit
          </button>
        </form>
      )}
    </>
  );
}

export default UpdateProfile;
