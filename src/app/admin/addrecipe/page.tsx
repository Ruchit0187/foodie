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
    return <LoadingLoader cssClass={"absolute top-1/2 -translate-y-1/2"} />;
  }
  return (
    <>
      <div className="relative object-cover min-h-screen w-full flex items-center justify-center">
        <video
          className="absolute inset-0 w-full h-screen object-cover "
          autoPlay
          muted
          loop
        >
          <source src="/recipe.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 ">
          <div className="w-fit mx-auto max-[600px]:m-3 relative z-6 bg-green-100/95 top-10 rounded-2xl p-2 max-[600px]:mx-auto max-[400px]:m-3 max-[400px]:top-auto">
            <div className="flex gap-8 w-full my-3  items-center justify-center relative ">
              <span className="absolute -left-5">
                <BackButton />
              </span>
              <h1
                className="text-3xl font-bold text-indigo-600 
                 max-[600px]:text-2xl"
              >
                Add Recipe
              </h1>
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
              {errors.name && (
                <p className="text-red-400">Enter the Recipe Name</p>
              )}
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
                  {errors.category && (
                    <p className="text-red-400">Enter the Recipe Difficulty </p>
                  )}
                </p>
              </div>
              <div className="flex max-[600px]:flex-col gap-2 items-center ">
                <div className="flex flex-col gap-2 max-[500px]:self-start">
                  <label
                    htmlFor="cooking"
                    className="text-2xl font-medium max-[600px]:text-[16px]"
                  >
                    Cooking Time
                  </label>
                  <input
                    {...register("cookingTimeMinutes", { required: true })}
                    className="p-2 border-2 rounded-2xl w-fit"
                    type="number"
                    placeholder="Enter Cooking Time"
                    id="cooking"
                    min="1"
                  />
                  {errors.cookingTimeMinutes && (
                    <p className="text-red-400">
                      Enter the Time To Ready Recipe
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 max-[500px]:self-start">
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
                  />
                  {errors.image && (
                    <p className="text-red-400">Enter the Image of Recipe</p>
                  )}
                </div>
              </div>
              <label className="text-2xl font-medium max-[600px]:text-[16px]">
                Ingredients
              </label>
              <div className="flex flex-col gap-2 w-full mx-auto">
                {lines.map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row gap-2 items-center w-full justify-center relative"
                    >
                      {ingredientsArray - 1 === index ? (
                        <BiAddToQueue
                          onClick={() =>
                            setIngredientsArray((prev) => prev + 1)
                          }
                          className="cursor-pointer  text-2xl absolute left-4"
                        />
                      ) : null}
                      <input
                        {...register(`ingredients.${index}.name`, {
                          required: true,
                        })}
                        className="p-2 border-2 rounded-2xl w-[40%] "
                        placeholder="Enter Ingredients Name"
                      />
                      <input
                        {...register(`ingredients.${index}.quantity`, {
                          required: true,
                        })}
                        className="p-2 border-2 rounded-2xl w-[40%]"
                        placeholder="Enter Ingredients quantity"
                      />
                      {ingredientsArray > 3 &&
                      ingredientsArray - 1 === index ? (
                        <AiOutlineDelete
                          onClick={() =>
                            setIngredientsArray((prev) => prev - 1)
                          }
                          className="cursor-pointer text-2xl absolute right-4 "
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
        </div>
      </div>
    </>
  );
}

export default AddRecipe;
