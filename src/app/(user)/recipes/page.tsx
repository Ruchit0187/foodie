"use client";
import { useCallback, useEffect, useState } from "react";
import RecipeCard from "@/src/components/RecipeCard";
import axios from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { recipeDataTypes } from "@/src/types";
import Loading from "../blogs/loading";
import { useSession } from "next-auth/react";

function RecipeDetails() {
  const [searchName, setSearchName] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const { data: session } = useSession();
  const [category, setCategory] = useState<string>("");
  const [recipeData, setRecipeData] = useState<recipeDataTypes[]>([]);
  const [hashMoreData, setHasmoreData] = useState<boolean>(true);
  const debounce = useDebounceCallback(setSearchName, 1000);
  const [limit, setLimit] = useState<number>(1);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["recipe", difficulty, category, searchName, limit],
    queryFn: async () => {
      const value = await axios.get(
        `/api/recipe?search=${searchName}&difficulty=${difficulty}&category=${category}&limit=${limit}`,
      );
      const { filterRecipes, recipeTotalCount } = value.data;
      setRecipeData(filterRecipes);
      if (recipeData.length === recipeTotalCount) {
        setHasmoreData(false);
      }
      return true;
    },
    gcTime: 4000,
  });
  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1;
    if (bottom && hashMoreData) {
      setLimit((prev) => prev + 1);
    }
  }, [isFetching]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, handleScroll]);

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
            className="border-2 rounded-2xl py-2 px-5"
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
      {isFetching && recipeData.length < 1 ? (
        <Loading />
      ) : (
        <RecipeCard
          session={session!}
          recipeCardData={recipeData}
          isLoadingData={isLoading}
        />
      )}
    </>
  );
}

export default RecipeDetails;
