"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { userData } from "@/src/types";
import fetchUserData from "@/src/function/fetchUserData";
import LoadingLoader from "@/src/components/Loading";
function NameUpdate() {
  const { data: session, status } = useSession();
  const [userName, setUserName] = useState<string>(session?.user.name!);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<userData>({});
  useEffect(() => {
    if (!session) return;
    const userData = async () => {
      const data = await fetchUserData(session);
      setUserName(data.name);
      setLoadingUser(false);
    };
    userData();
  }, [session, setValue]);
  const onSubmit: SubmitHandler<userData> = async (data) => {
    try {
      const updateProfile = await axios.patch("/api/profile", {
        name: data.name.trim(),
        _id: session?.user.id,
      });
      if (updateProfile.status === 200) {
        toast.success("User Data Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error("User Data is not Updated");
      }
    }
  };
  if (status === "loading" || loadingUser) {
    return <LoadingLoader cssClass="absolute top-1/2 -translate-y-1/2" />;
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-2 w-fit p-2 mx-auto gap-2 mt-10 justify-center m-2 rounded-2xl"
      >
        <span>
          You can change the name associated with your Foodie customer account
          below
        </span>
        <span> — just click Save Changes when you’re done.</span>
        <div className="w-fit flex flex-col">
          <label htmlFor="name" className="text-xl font-semibold">
            New Name:
          </label>
          <input
            {...register("name", { required: true })}
            className="border-2 rounded-2xl p-2 w-fit"
            id="name"
            defaultValue={userName}
            placeholder="Enter the New Name"
          />
          {errors.name && <p className="text-red-500">Enter New Name</p>}
          <button className="bg-yellow-300  p-2 rounded-2xl block mx-auto mt-2.5 cursor-pointer">
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
}

export default NameUpdate;
