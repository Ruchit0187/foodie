"use client";
import { useState } from "react";
import RecipeCard from "@/src/components/RecipeCard";
import axios from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/src/components/Loading";

function RecipeDetails() {
  const [searchName, setSearchName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const debounce = useDebounceCallback(setSearchName, 1000);
  const { data, isLoading } = useQuery({
    queryKey: ["recipe", difficulty, category, searchName],
    queryFn: async () => {
      const value = await axios.post(
        `/api/recipe?search=${searchName}&difficulty=${difficulty}&category=${category}`
      );
      return value.data;
    },
    gcTime: 5000,
  });
  return (
    <>
      <div className="flex justify-between my-2 px-2.5 max-[750px]:flex-col max-[750px]:gap-5 ">
        <div className="flex gap-50 max-[750px]:justify-between max-[480px]:flex-col max-[480px]:gap-2.5">
          <select
            className="border-2 rounded-2xl py-2 px-5"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="vegetarian">Veg</option>
            <option value="vegan">Vegan</option>
            <option value="non-veg">Non-veg</option>
          </select>
          <select
            className="border-2  rounded-2xl py-2 px-5"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <input
          type="text"
          className="py-2 px-2 text-black border-2 rounded-2xl"
          placeholder="Search Recipe Details"
          onChange={(event) => debounce(event.target.value)}
        />
      </div>
      {isLoading ? <Loading /> : <RecipeCard recipeCardData={data} />}
    </>
  );
}

export default RecipeDetails;
