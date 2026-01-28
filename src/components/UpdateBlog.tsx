"use client";
import { blogData } from "@/src/types";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import {  useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
function UpdateBlog({ value }: { value: blogData }) {
   const [blogID, setBlogID] = useState(value._id);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<blogData>({
    defaultValues: {
      name: value.name,
      category: value.category,
      title: value.title,
      image: value.image,
      quick_summary: value.quick_summary,
      health_benefits: value.health_benefits,
      description: value.description,
    },
  });
  const { fields, append, remove } = useFieldArray<blogData | any>({
    control,
    name: "health_benefits",
  });
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    handleSubmit(onSubmit)();
  };
  const handleCancel = () => {
    reset(value)
    setIsModalOpen(false);
  };
  const onSubmit = async (data: blogData) => {
    try {
      const value = await axios.patch("/api/blogs", {
        ...data,
        blogID,
      });
      if (value.status === 200) {
        reset(data);
        router.refresh();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Recipe Details not updated");
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={showModal} className="text-2xl cursor-pointer">
        <BsPencilSquare />
      </button>
      <Modal
        title="Update Blog"
        closable={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2.5"
        >
          <label className="text-xl font-bold" htmlFor="name">
            Blog Name:
          </label>
          <input
            {...register("name", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="name"
          />
          {errors.name && <ShowError errorMessage={"Blog name"} />}
          <label className="text-xl font-bold" htmlFor="category">
            Category:
          </label>
          <select
            {...register("category")}
            className="border-2 p-2 rounded-2xl"
          >
            <option value="breakfast">breakfast</option>
            <option value="lunch">lunch</option>
            <option value="dinner">dinner</option>
          </select>
          <label className="text-xl font-bold" htmlFor="title">
            Title:
          </label>
          <input
            {...register("title", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="title"
          />
          {errors.title && <ShowError errorMessage={"Title"} />}

          <label className="text-xl font-bold" htmlFor="summery">
            Summery:
          </label>
          <textarea
            {...register("quick_summary", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="summery"
          />
          {errors.quick_summary && <ShowError errorMessage={"Summery"} />}
          <label className="text-xl font-bold" htmlFor="description">
            Description:
          </label>
          <textarea
            {...register("description", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="description"
          />
          {errors.description && <ShowError errorMessage={"Description"} />}
          <label className="text-xl font-bold">health Benefits:</label>
          {fields.map((data, index) => (
            <div key={data.id} className="flex flex-row gap-1 items-center">
              <div className="w-fit">
                {fields.length - 1 === index ? (
                  <BiAddToQueue
                    onClick={() => {
                      append("");
                    }}
                    className="cursor-pointer  text-2xl  "
                  />
                ) : null}
              </div>
              <div
                className={`flex items-center ${fields.length - 1 === index ? "" : "ml-6"} `}
              >
                <input
                  {...register(`health_benefits.${index}`, { required: true })}
                  className="border-2 p-2 rounded-2xl"
                  placeholder="Enter the Health Benefits"
                  id="health_benefits"
                />
                {fields.length > 2 ? (
                  <AiOutlineDelete
                    onClick={() => {
                      remove(index);
                    }}
                    className="cursor-pointer  text-2xl"
                  />
                ) : null}
              </div>
            </div>
          ))}
          {errors.health_benefits && (
            <ShowError errorMessage=" Health Benefits" />
          )}
          <label htmlFor="image" className="text-xl font-bold">
            Image Link:
          </label>
          <input
            {...register("image", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="image"
          />
        </form>
      </Modal>
    </>
  );
}

export default UpdateBlog;

function ShowError({ errorMessage }: { errorMessage: string }) {
  return <p className="text-red-400">{`Enter the Blog ${errorMessage}`}</p>;
}
