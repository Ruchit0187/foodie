"use client";
import BackButton from "@/src/components/BackButton";
import { individualBlog } from "@/src/types";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { toast } from "react-toastify";
function AddBlog() {
  const [blogArray, setBlogArray] = useState<number>(3);
  const lines = Array.from({ length: blogArray });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<individualBlog>();
  const onSubmit: SubmitHandler<individualBlog> = async (data) => {
    const filterIngredients = data.health_benefits.filter(
      (value) => !(value === ""),
    );
    try {
      const value = await axios.post("/api/blogs", {
        ...data,
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
    }
  };
  return (
    <>
      <div className="text-center w-[33%] mx-auto flex gap-8 items-center my-3.5">
        <span>
          <BackButton />
        </span>
        <span className="text-3xl underline font-semibold ">Add the Blog</span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2.5 w-[33%] mx-auto"
      >
        <label htmlFor="name" className="text-2xl font-medium mr-2.5">
          Name
        </label>
        <input
          {...register("name", { required: true })}
          id="name"
          className="p-2 border-2 rounded-2xl"
          placeholder="Enter the Name"
        />
        {errors.name && <p className="text-red-400">Enter the Name</p>}
        <label htmlFor="title" className="text-2xl font-medium mr-2.5">
          Title
        </label>
        <input
          {...register("title", { required: true })}
          className="p-2 border-2 rounded-2xl"
          id="title"
          placeholder="Enter the Title"
        />
        {errors.title && <p className="text-red-400">Enter the title</p>}
        <label className="text-2xl font-medium mr-2.5">Category</label>
        <select
          {...register("category", { required: true })}
          className="border-2 rounded-2xl w-fit p-3"
        >
          <option value=""> Category</option>
          <option value="vegetarian">Lunch</option>
          <option value="vegan">Dinner</option>
          <option value="non-veg">Breakfast</option>
        </select>
        <label htmlFor="summery" className="text-2xl font-medium mr-2.5">
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
        <label htmlFor="description" className="text-2xl font-medium mr-2.5">
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
        <label htmlFor="image" className="text-2xl font-medium mr-2.5">
          Image
        </label>
        <input
          {...register("image", { required: true })}
          className="p-2 border-2 rounded-2xl"
          id="image"
          placeholder="Enter the Image "
        />
        {errors.image && <p className="text-red-400">Enter the Image Link</p>}
        <label className="text-2xl font-medium mr-2.5">Health Benefits</label>
        {lines.map((_, index) => (
          <div key={index} className="grid grid-cols-2">
            <input
              {...register(`health_benefits.${index}`)}
              className="p-2 border-2 rounded-2xl w-fit"
              placeholder="Enter Benefits"
            />
            {blogArray - 1 === index ? (
              <BiAddToQueue
                onClick={() => setBlogArray((prev) => prev + 1)}
                className="cursor-pointer relative left-0 -translate-x-72  top-2 text-2xl"
              />
            ) : null}
            {blogArray > 2 && blogArray - 1 === index ? (
              <AiOutlineDelete
                onClick={() => setBlogArray((prev) => prev - 1)}
                className="cursor-pointer relative  translate-x-40 -right-12 -top-8 text-2xl"
              />
            ) : null}
          </div>
        ))}
        <button className="cursor-pointer block mx-auto bg-black text-white p-2 rounded-2xl mb-2.5">
          Submit
        </button>
      </form>
    </>
  );
}

export default AddBlog;
