"use client";
import { recipeDataTypes } from "@/src/types";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { BiAddToQueue } from "react-icons/bi";
import BackButton from "@/src/components/BackButton";
import { AiOutlineDelete } from "react-icons/ai";
import imageUpload from "@/src/function/imageupload";
function AddRecipe() {
  const [ingredientsArray, setIngredientsArray] = useState<number>(3);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<recipeDataTypes>();
  const onSubmit: SubmitHandler<recipeDataTypes> = async (data) => {
    const filterIngredients = data.ingredients.filter(
      (value) => !(value.quantity === "" && value.name === ""),
    );

    try {
      const localImage = data.image as FileList;
      const image = await imageUpload(localImage);
      const value = await axios.post("/api/admin/recipes", {
        ...data,
        image,
        ingredients: filterIngredients,
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
  const lines = Array.from({ length: ingredientsArray });
  return (
    <>
      <div className="text-center w-[33%] mx-auto flex gap-8 items-center my-3.5">
        <span>
          <BackButton />
        </span>
        <span className="text-3xl underline font-semibold ">
          Add the Recipe
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2.5 w-fit mx-auto"
      >
        <label htmlFor="name" className="text-2xl font-medium">
          Recipe Name
        </label>
        <input
          {...register("name", { required: true })}
          className="p-2 border-2 rounded-2xl"
          placeholder="Enter the Recipe Name"
          id="name"
        />
        {errors.name && <p className="text-red-400">Enter the Recipe Name</p>}
        <div className="grid grid-cols-2 gap-2 ">
          <p>
            <label className="text-2xl font-medium mr-2.5">Category</label>
            <select
              {...register("category", { required: true })}
              className="border-2 rounded-2xl w-fit p-3 cursor-pointer"
            >
              <option value=""> Category</option>
              <option value="vegetarian">Veg</option>
              <option value="vegan">Vegan</option>
              <option value="non-veg">Non-veg</option>
            </select>
          </p>
          <p>
            <label className="text-2xl font-medium mr-2.5">Difficulty</label>
            <select
              {...register("difficulty", { required: true })}
              className="border-2 rounded-2xl w-fit p-3"
            >
              <option value="">Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </p>
        </div>
        <label htmlFor="cooking" className="text-2xl font-medium">
          Cooking Time
        </label>
        <input
          {...register("cookingTimeMinutes", { required: true })}
          className="p-2 border-2 rounded-2xl"
          type="number"
          placeholder="Enter the Cooking Time"
          id="cooking"
          min="1"
        />
        {errors.cookingTimeMinutes && (
          <p className="text-red-400">Enter the Time To Ready Recipe</p>
        )}
        <label htmlFor="img" className="text-2xl font-medium">
          Image
        </label>
        <input
          {...register("image", { required: true })}
          id="img"
          className="block w-fit text-sm text-gray-700
      file:mr-4 file:rounded-md file:border-0
      file:bg-indigo-600 file:px-4 file:py-2
      file:text-sm file:font-semibold file:text-white
      focus:outline-none
      cursor-pointer"
          type="file"
          placeholder="Enter the Image Link of Recipe "
        />
        {errors.image && (
          <p className="text-red-400">Enter the Image of Recipe</p>
        )}
        <label className="text-2xl font-medium">Ingredients</label>
        {lines.map((_, index) => (
          <div key={index} className="grid grid-cols-2">
            <input
              {...register(`ingredients.${index}.name`, { required: true })}
              className="p-2 border-2 rounded-2xl w-fit"
              placeholder="Enter Ingredients Name"
            />
            <input
              {...register(`ingredients.${index}.quantity`, { required: true })}
              className="p-2 border-2 rounded-2xl w-fit"
              placeholder="Enter Ingredients quantity"
            />

            <div className="flex justify-between">
              {ingredientsArray - 1 === index ? (
                <BiAddToQueue
                  onClick={() => setIngredientsArray((prev) => prev + 1)}
                  className="cursor-pointer relative  right-8 -top-8 text-2xl"
                />
              ) : null}
              {ingredientsArray > 2 && ingredientsArray - 1 === index ? (
                <AiOutlineDelete
                  onClick={() => setIngredientsArray((prev) => prev - 1)}
                  className="cursor-pointer relative  translate-x-40 -right-16 -top-8 text-2xl"
                />
              ) : null}
            </div>
          </div>
        ))}
        {errors.ingredients && (
          <p className="text-red-300">Enter the Ingredients</p>
        )}
        <button className="block mx-auto bg-black text-white p-2 cursor-pointer rounded-2xl mt-2">
          Submit
        </button>
      </form>
    </>
  );
}

export default AddRecipe;
