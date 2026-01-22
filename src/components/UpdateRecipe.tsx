"use client";
import { recipeDataTypes } from "@/src/types";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
function UpdateRecipe({ value }: { value: recipeDataTypes }) {
  const [recipeID, setRecipeID] = useState(value._id);
  const router=useRouter()
  const [ingredientsArray, setIngredientsArray] = useState<number>(
    value.ingredients.length,
  );
  const { register, handleSubmit, control ,reset,formState: { errors }, } = useForm<recipeDataTypes>({
    defaultValues: {
      name: value.name,
      category: value.category,
      difficulty: value.difficulty,
      image: value.image,
      cookingTimeMinutes: value.cookingTimeMinutes,
      ingredients: value.ingredients,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    handleSubmit(onSubmit)();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSubmit = async (data: recipeDataTypes) => {
    try {
      const value = await axios.patch("/api/admin/recipes", {
        ...data,
        recipeID,
      });
      if (value.status === 200) {
        reset(data)
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
          <div className="flex justify-between items-center gap-2">
            <div className="w-1/2 mx-auto px-2">
              <label className="text-xl font-bold mr-2" htmlFor="category">
                Category:
              </label>
              <select
                {...register("category", { required: true })}
                className="border-2 rounded-2xl w-fit p-3 cursor-pointer"
              >
                <option value="vegetarian">Veg</option>
                <option value="vegan">Vegan</option>
                <option value="non-veg">Non-veg</option>
              </select>
            </div>
            <div className="w-1/2 mx-auto px-2">
              <label className="text-xl font-bold mr-2" htmlFor="difficulty">
                Difficulty:
              </label>
              <select
                {...register("difficulty", { required: true })}
                className="border-2 rounded-2xl w-fit p-3 cursor-pointer"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <label className="text-xl font-bold" htmlFor="cookingtime">
            Cooking Time:
          </label>
          <input
            {...register("cookingTimeMinutes", { required: true })}
            className="border-2 p-2 rounded-2xl"
            type="number"
            min={1}
            id="cookingtime"
          />
          <label htmlFor="ingredients" className="text-xl font-bold">
            Ingredients:
          </label>
          {fields.map((data, index) => (
            <div key={data.id} className="grid grid-cols-2 px-2">
              <input
                {...register(`ingredients.${index}.name`,{required:true})}
                className="border-2 p-2 rounded-2xl w-fit"
                id="ingredients"
                placeholder="Enter the Ingredients Name"
              />
              <input
                {...register(`ingredients.${index}.quantity`,{required:true})}
                className="border-2 p-2 rounded-2xl w-fit"
                placeholder="Enter the Ingredients Quantity"
                id="ingredients"
              />
              {(fields.length - 1 === index) ? (
                <BiAddToQueue
                  onClick={() => {
                    setIngredientsArray((prev) => prev + 1);
                    append(({name:"",quantity:""}))
                  }}
                  className="cursor-pointer relative right-6 -top-8 text-xl "
                />
              ) : null}
              {fields.length > 2 && fields.length - 1 === index ? (
                <AiOutlineDelete
                  onClick={() => {
                    setIngredientsArray((prev) => prev - 1);
                    remove(index);
                  }}
                  className="cursor-pointer relative  translate-x-34 -right-12 -top-8 text-2xl"
                />
              ) : null}
            </div>
          ))}
          {errors.ingredients &&<p className="text-red-400">Enter the All Ingredients</p>}
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
