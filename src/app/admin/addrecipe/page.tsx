"use client";
import { recipeDataTypes } from "@/src/types";
import axios from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { BiAddToQueue } from "react-icons/bi";
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
      (value) => !(value.quantity === "" && value.name === "")
    );
    try {
      const value = await axios.post("/api/admin/recipes", {
        ...data,
        ingredients: filterIngredients,
      });
      if (value.status === 200) {
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
            className="border-2 rounded-2xl w-fit p-3"
          >
            <option value=""> Category</option>
            <option value="vegetarian">veg</option>
            <option value="vegan">non-veg</option>
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
      <label htmlFor="imag" className="text-2xl font-medium">
        Image
      </label>
      <input
        {...register("image", { required: true })}
        className="p-2 border-2 rounded-2xl"
        id="img"
        placeholder="Enter the Image Link of Recipe "
      />
      {errors.image && (
        <p className="text-red-400">Enter the Image of Recipe</p>
      )}
      <label className="text-2xl font-medium">Ingredients</label>
      {lines.map((_, index) => (
        <div key={index} className="grid grid-cols-2">
          <input
            {...register(`ingredients.${index}.name`)}
            className="p-2 border-2 rounded-2xl w-fit"
            placeholder="Enter Ingredients Name"
          />
          <input
            {...register(`ingredients.${index}.quantity`)}
            className="p-2 border-2 rounded-2xl w-fit"
            placeholder="Enter Ingredients quantity"
          />
          {ingredientsArray - 1 === index ? (
            <BiAddToQueue
              onClick={() => setIngredientsArray((prev) => prev + 1)}
              className="cursor-pointer relative  right-8 -top-8 text-2xl"
            />
          ) : null}
        </div>
      ))}
      <button className="block mx-auto bg-black text-white p-2 cursor-pointer rounded-2xl mt-2">
        Submit
      </button>
    </form>
  );
}

export default AddRecipe;
