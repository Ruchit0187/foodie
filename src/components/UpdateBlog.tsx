"use client";
import { blogData } from "@/src/types";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
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
      description: value.description,
    },
  });
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [blogBenefitsCount, setHealthBenefitCount] = useState<number>(
    value.health_benefits.length,
  );
  const [healthBenefits, setHealthBenefit] = useState(value.health_benefits);
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
        health_benefits:healthBenefits
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
          {healthBenefits.map((_, index) => (
            <div key={index} className="grid grid-cols-2 px-4">
              <input
                {...register(`health_benefits.${index}`)}
                className="border-2 p-2 rounded-2xl w-fit"
                placeholder="Enter the Health Benefits"
              />
              {blogBenefitsCount - 1 === index ? (
                <BiAddToQueue
                  onClick={() => {
                    setHealthBenefit((prev) => [
                      ...prev,
                      ""
                    ]);
                    setHealthBenefitCount((prev) => prev + 1);
                  }}
                  className="cursor-pointer relative  top-4 -translate-x-60 text-xl right-2 "
                />
              ) : null}
              {blogBenefitsCount > 2 && blogBenefitsCount - 1 === index ? (
                <AiOutlineDelete
                  onClick={() => {
                    setHealthBenefitCount((prev) => prev - 1);
                    healthBenefits.pop();
                  }}
                  className="cursor-pointer relative  translate-x-28 -right-16 -top-8 text-2xl"
                />
              ) : null}
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
