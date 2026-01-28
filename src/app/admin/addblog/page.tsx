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
    return <LoadingLoader height={"absolute top-1/2 -translate-y-1/2"} />;
  }
  return (
    <div className="w-fit mx-auto max-[600px]:m-3">
      <div className=" mx-auto flex gap-8 items-center my-3.5 ">
        <span>
          <BackButton />
        </span>
        <span className="text-3xl underline font-semibold max-[600px]:text-[20px]">
          Add the Blog
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2.5 w-fit mx-auto"
      >
        <label
          htmlFor="name"
          className="text-2xl font-medium mr-2.5 max-[600px]:text-[16px]"
        >
          Name
        </label>
        <input
          {...register("name", { required: true })}
          id="name"
          className="p-2 border-2 rounded-2xl"
          placeholder="Enter the Name"
        />
        {errors.name && <p className="text-red-400">Enter the Name</p>}
        <label
          htmlFor="title"
          className="text-2xl font-medium mr-2.5 max-[600px]:text-[16px]"
        >
          Title
        </label>
        <input
          {...register("title", { required: true })}
          className="p-2 border-2 rounded-2xl"
          id="title"
          placeholder="Enter the Title"
        />
        {errors.title && <p className="text-red-400">Enter the title</p>}
        <label className="text-2xl font-medium mr-2.5 max-[600px]:text-[16px]">
          Category
        </label>
        <select
          {...register("category", { required: true })}
          className="border-2 rounded-2xl w-fit p-3"
        >
          <option value=""> Category</option>
          <option value="vegetarian">Lunch</option>
          <option value="vegan">Dinner</option>
          <option value="non-veg">Breakfast</option>
        </select>
        {errors.category && <p className="text-red-400">Enter the category of Blog</p>}
        <label
          htmlFor="summery"
          className="text-2xl font-medium mr-2.5 max-[600px]:text-[16px]"
        >
          Quick Summary
        </label>
        <textarea
          {...register("quick_summary", { required: true })}
          className="p-2 border-2 rounded-2xl"
          id="summery"
          placeholder="Enter the Quick Summery"
        />
        {errors.quick_summary && (
          <p className="text-red-400">Enter the Quick Summery</p>
        )}
        <label
          htmlFor="description"
          className="text-2xl font-medium mr-2.5 max-[600px]:text-[16px]"
        >
          Description
        </label>
        <textarea
          {...register("description", { required: true })}
          className="p-2 border-2 rounded-2xl"
          id="description"
          placeholder="Enter the Description"
        />
        {errors.description && (
          <p className="text-red-400">Enter the blog Description</p>
        )}
        <label
          htmlFor="image"
          className="text-2xl font-medium mr-2.5 max-[600px]:text-[16px]"
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
      focus:outline-none
      cursor-pointer"
          type="file"
          placeholder="Enter the Image Link of Recipe "
        />
        {errors.image && <p className="text-red-400">Enter the Image Link</p>}
        <label className="text-2xl font-medium mr-2.5 max-[600px]:text-[16px]">
          Health Benefits
        </label>
        <div className="w-full flex flex-col max-w-md mx-auto px-4">
  {lines.map((_, index) => (
    <div
      key={index}
      className="flex items-center gap-2 mb-2 flex-wrap sm:flex-nowrap justify-center"
    >
      {blogArray - 1 === index && (
        <BiAddToQueue
          onClick={() => setBlogArray((prev) => prev + 1)}
          className="cursor-pointer text-2xl"
        />
      )}
      <input
        {...register(`health_benefits.${index}`, { required: true })}
        className="p-2 border-2 rounded-2xl sm:w-auto flex-1 w-[80%]"
        placeholder="Enter Benefits"
      />
      {blogArray > 2 && blogArray - 1 === index && (
        <AiOutlineDelete
          onClick={() => setBlogArray((prev) => prev - 1)}
          className="cursor-pointer text-2xl"
        />
      )}
    </div>
  ))}
</div>

        {errors.health_benefits && (
          <p className="text-red-400">Enter the Health Benefits</p>
        )}
        <button className="cursor-pointer block mx-auto bg-black text-white p-2 rounded-2xl mb-2.5">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
