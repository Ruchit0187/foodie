"use client";
import { blogData } from "@/src/types";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
function UpdateBlog({ value }: { value: blogData }) {
  const [blogID, setBlogID] = useState(value._id);
  const { register, handleSubmit } = useForm<blogData>({
    defaultValues: {
      name: value.name,
      category: value.category,
      title: value.title,
      image: value.image,
      quick_summary: value.quick_summary,
      health_benefits: value.health_benefits,
      date: value.date,
      description:value.description
    },
  });
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    handleSubmit(onSubmit)();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSubmit = async (data: blogData) => {
    try {
      const value = await axios.patch("/api/blogs", {
        ...data,
        blogID,
      });
      console.log(value);
      if (value.status === 200) {
        router.refresh();
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
          <label className="text-xl font-bold" htmlFor="category">
            Category:
          </label>
          <input
            {...register("category", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="category"
          />
          <label className="text-xl font-bold" htmlFor="title">
            Title:
          </label>
          <input
            {...register("title", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="title"
          />
          <label className="text-xl font-bold" htmlFor="date">
            Date:
          </label>
          <input
            {...register("date", { required: true })}
            className="border-2 p-2 rounded-2xl"
            type="date"
            id="date"
          />
           <label className="text-xl font-bold" htmlFor="summery">
            Summery:
          </label>
          <textarea
            {...register("quick_summary", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="summery"
          />
           <label className="text-xl font-bold" htmlFor="description">
            Description:
          </label>
          <textarea
            {...register("description", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="description"
          />

          <label className="text-xl font-bold">health Benefits:</label>
          {value.health_benefits.map((data, index) => (
            <div key={index} className="grid grid-cols-2">
              <input
                {...register(`health_benefits.${index}`)}
                className="border-2 p-2 rounded-2xl w-2/3"
              />
            </div>
          ))}
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
