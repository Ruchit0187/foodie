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
import LoadingLoader from "@/src/components/Loading";
function AddRecipe() {
  const [ingredientsArray, setIngredientsArray] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<recipeDataTypes>();
  const onSubmit: SubmitHandler<recipeDataTypes> = async (data) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  const lines = Array.from({ length: ingredientsArray });
  if (isLoading) {
    return <LoadingLoader height={"absolute top-1/2 -translate-y-1/2"} />;
  }
  return (
    <div className="w-fit mx-auto max-[600px]:m-3">
      <div className=" mx-auto flex gap-8 items-center my-3.5">
        <span>
          <BackButton />
        </span>
        <span className="text-3xl underline font-semibold max-[600px]:text-xl self-center">
          Add the Recipe
        </span>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2.5 w-fit mx-auto"
      >
        <label
          htmlFor="name"
          className="text-2xl font-medium max-[600px]:text-[16px]"
        >
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
            <label className="text-2xl font-medium mr-2.5  max-[600px]:text-[16px]">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className="border-2 rounded-2xl w-fit p-3 cursor-pointer"
            >
              <option value=""> Category</option>
              <option value="vegetarian">Veg</option>
              <option value="vegan">Vegan</option>
              <option value="non-veg">Non-veg</option>
            </select>
            {errors.category && (
              <p className="text-red-400">Enter the Recipe Category </p>
            )}
          </p>
          <p>
            <label className="text-2xl font-medium mr-2.5 max-[600px]:text-[16px]">
              Difficulty
            </label>
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
        <label
          htmlFor="cooking"
          className="text-2xl font-medium max-[600px]:text-[16px]"
        >
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
        <label
          htmlFor="img"
          className="text-2xl font-medium max-[600px]:text-[16px]"
        >
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
      cursor-pointer "
          type="file"
          placeholder="Enter the Image Link of Recipe "
        />
        {errors.image && (
          <p className="text-red-400">Enter the Image of Recipe</p>
        )}
        <label className="text-2xl font-medium max-[600px]:text-[16px]">
          Ingredients
        </label>
         <div className="flex flex-col gap-2 w-full mx-auto">
        {lines.map((_, index) => {
          return (
            <div
              key={index}
              className="flex flex-row gap-2 items-center w-full justify-center"
            >
              {ingredientsArray - 1 === index ? (
                <BiAddToQueue
                  onClick={() => setIngredientsArray((prev) => prev + 1)}
                  className="cursor-pointer  text-2xl"
                />
              ) : null}
              <input
                {...register(`ingredients.${index}.name`, { required: true })}
                className="p-2 border-2 rounded-2xl w-[40%]"
                placeholder="Enter Ingredients Name"
              />
              <input
                {...register(`ingredients.${index}.quantity`, {
                  required: true,
                })}
                className="p-2 border-2 rounded-2xl w-[40%]"
                placeholder="Enter Ingredients quantity"
              />
              {ingredientsArray > 2 && ingredientsArray - 1 === index ? (
                <AiOutlineDelete
                  onClick={() => setIngredientsArray((prev) => prev - 1)}
                  className="cursor-pointer text-2xl"
                />
              ) : null}
            </div>
          );
        })}
        </div>
        {errors.ingredients && (
          <p className="text-red-300">Enter the Ingredients</p>
        )}
        <button className="block mx-auto bg-black text-white p-2 cursor-pointer rounded-2xl mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
