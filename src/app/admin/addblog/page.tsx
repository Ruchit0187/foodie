"use client";
import BackButton from "@/src/components/BackButton";
import LoadingLoader from "@/src/components/Loading";
import imageUpload from "@/src/function/imageupload";
import { individualBlog } from "@/src/types";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { toast } from "react-toastify";
function AddBlog() {
  const [blogArray, setBlogArray] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const lines = Array.from({ length: blogArray });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<individualBlog>();
  const onSubmit: SubmitHandler<individualBlog> = async (data) => {
    setIsLoading(true);
    const filterIngredients = data.health_benefits.filter(
      (value) => !(value === ""),
    );
    try {
      const localImage = data.image as FileList;
      const image = await imageUpload(localImage);
      const value = await axios.post("/api/blogs", {
        ...data,
        image,
        health_benefits: filterIngredients,
      });
      if (value.status === 200) {
        toast.success(value.data.message);
        reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <LoadingLoader cssClass={"absolute top-1/2 -translate-y-1/2"} />;
  }
  return (
    <div
      className="bg-[url('/groundnuts.jpg')] 
                  w-full flex items-center justify-center p-4  h-full bg-cover bg-center bg-no-repeat  "
    >
      <div className="flex w-fit backdrop-blur-md bg-white/80 flex-col mx-auto max-[600px]:m-3 border-2 rounded-2xl my-0.5 p-2 ">
        <div className="flex gap-8 w-full my-3  items-center justify-center relative ">
          <span className="absolute -left-5">
            <BackButton />
          </span>
          <h1
            className="text-3xl font-bold text-indigo-600 
                 max-[600px]:text-2xl"
          >
            Add the Blog
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-col gap-[7.8px] w-fit mx-auto max-[600px]:w-full"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col flex-1">
              <label
                htmlFor="name"
                className="text-lg font-semibold text-gray-800 mb-1"
              >
                Name
              </label>
              <input
                {...register("name", { required: true })}
                id="name"
                className="px-4 py-2 border-2 border-white/50 bg-white/80 rounded-xl focus:border-indigo-50-500 outline-none "
                placeholder="Enter Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Required Name</p>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <label
                htmlFor="title"
                className="text-lg font-semibold text-gray-800 mb-1"
              >
                Title
              </label>
              <input
                {...register("title", { required: true })}
                id="title"
                className="px-4 py-2 border-2 border-white/50 bg-white/80 rounded-xl focus:border-indigo-500 outline-none transition-all"
                placeholder="Enter Title"
              />
              {errors.title && <p className="text-red-500 text-sm">Required</p>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4  items-center ">
            <div className="flex flex-col flex-1 max-[600px]:self-start">
              <label className="text-lg font-semibold text-gray-800 mb-1">
                Category
              </label>
              <select
                {...register("category", { required: true })}
                className="border-2 rounded-2xl w-fit p-1.5"
              >
                <option value=""> Category</option>
                <option value="vegetarian">Lunch</option>
                <option value="vegan">Dinner</option>
                <option value="non-veg">Breakfast</option>
              </select>
              {errors.category && (
                <p className="text-red-400">Required Category</p>
              )}
            </div>
            <div className="flex flex-col flex-1">
              <label
                htmlFor="image"
                className="text-lg font-semibold text-gray-800 mb-1"
              >
                Image
              </label>
              <input
                {...register("image", { required: true })}
                id="image"
                className="block w-fit text-sm text-gray-700
      file:mr-4 file:rounded-md file:border-0
      file:bg-indigo-600 file:px-4 file:py-2
      file:text-sm file:font-semibold file:text-white
      focus:outline-none cursor-pointer"
                type="file"
              />
              {errors.image && (
                <p className="text-red-400">Enter the Image Link</p>
              )}
            </div>
          </div>
          <label
            htmlFor="summery"
            className="text-xl font-medium mr-2.5 max-[600px]:text-[16px]"
          >
            Quick Summary
          </label>
          <input
            {...register("quick_summary", { required: true })}
            className="px-4 py-2 border-2 border-white/50 bg-white/80 rounded-xl focus:border-indigo-500 outline-none "
            id="summery"
            placeholder="Enter the Quick Summery"
          />
          {errors.quick_summary && (
            <p className="text-red-400">Enter the Quick Summery</p>
          )}
          <label
            htmlFor="description"
            className="text-xl font-medium mr-2.5 max-[600px]:text-[16px]"
          >
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            className="px-4 py-1 border-2 border-white/50 bg-white/80 rounded-xl focus:border-indigo-500 outline-none "
            id="description"
            placeholder="Enter the Description"
          />
          {errors.description && (
            <p className="text-red-400">Enter the blog Description</p>
          )}

          <label className="text-xl font-medium mr-2.5 max-[600px]:text-[16px]">
            Health Benefits
          </label>
          <div className=" flex flex-col max-w-md ml-2 px-4 self-start">
            {lines.map((_, index) => (
              <div
                key={index}
                className="flex  items-center gap-2 mb-2 flex-wrap sm:flex-nowrap justify-center relative w-full"
              >
                {blogArray - 1 === index && (
                  <BiAddToQueue
                    onClick={() => setBlogArray((prev) => prev + 1)}
                    className="cursor-pointer text-2xl absolute -left-6"
                  />
                )}
                <input
                  {...register(`health_benefits.${index}`, { required: true })}
                  className="px-4 py-1 border-2 border-white/50 bg-white/80 rounded-xl focus:border-indigo-500 outline-none "
                  placeholder="Enter Benefits"
                />
                {blogArray > 3 && blogArray - 1 === index && (
                  <AiOutlineDelete
                    onClick={() => setBlogArray((prev) => prev - 1)}
                    className="cursor-pointer text-2xl absolute -right-7"
                  />
                )}
              </div>
            ))}
          </div>

          {errors.health_benefits && (
            <p className="text-red-400">Enter the Health Benefits</p>
          )}
          <button className="cursor-pointer block mx-auto bg-black text-white p-2 rounded-2xl ">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
