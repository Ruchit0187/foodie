"use client";
import { recipeDataTypes } from "@/src/types";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
function UpdateRecipe({ value }: { value: recipeDataTypes }) {
  const [recipeID,setRecipeID]=useState(value._id);
  const { register, handleSubmit } = useForm<recipeDataTypes>({
    defaultValues: {
      name: value.name,
      category: value.category,
      difficulty: value.difficulty,
      image: value.image,
      cookingTimeMinutes: value.cookingTimeMinutes,
      ingredients: value.ingredients
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
  const onSubmit = async(data: recipeDataTypes) => {
      try {
        const value=await axios.patch("/api/admin/recipes",{...data,recipeID});
        if(value.status===200){
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
        title="Update Recipe"
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
            Recipe Name:
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
          <label className="text-xl font-bold" htmlFor="difficulty">
            Difficulty:
          </label>
          <input
            {...register("difficulty", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="difficulty"
          />
          <label className="text-xl font-bold" htmlFor="cookingtime">
            Cooking Time:
          </label>
          <input
            {...register("cookingTimeMinutes", { required: true })}
            className="border-2 p-2 rounded-2xl"
            id="cookingtime"
          />
          <label htmlFor="ingredients" className="text-xl font-bold">
            Ingredients:
          </label>
          {value.ingredients.map((data, index) => (
            <div key={index} className="grid grid-cols-2">
              <input
                {...register(`ingredients.${index}.name`)}
                className="border-2 p-2 rounded-2xl w-2/3"
                id="ingredients"
              />
              <input
                {...register(`ingredients.${index}.quantity`)}
                className="border-2 p-2 rounded-2xl w-2/3"
                id="ingredients"
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

export default UpdateRecipe;
