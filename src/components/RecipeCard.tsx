import type { recipeDataTypes } from "../types";
import Link from "next/link";
import { FcLikePlaceholder } from "react-icons/fc";
import { CiClock2 } from "react-icons/ci";
import { MouseEvent } from "react";

interface IrecipeCardData {
  recipeCardData: recipeDataTypes[];
}

function RecipeCard({ recipeCardData }: IrecipeCardData) {
  const handleLikeButton = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4 mx-auto">
      {recipeCardData.map((value) => (
        <li className="w-full" key={String(value._id)}>
          <Link href={`/recipe/${value._id}`}>
            <div className="w-118.5 h-30.25">
              {/* <Image src={value.image} height={100} width={100}  alt={value.name} className="h-auto max-w-full object-cover" /> */}
              {/* <img src={value.image}  className=" max-w-full object-fill"/> */}
            </div>
            <div className="bg-neutral-primary-soft max-w-sm overflow-hidden rounded-xl border border-default shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="p-6">
                <h5 className="mt-4 mb-2 text-xl font-semibold tracking-tight text-heading">
                  {value.name}
                </h5>
                <div className="text-body text-sm flex justify-between">
                  <div>{value.category}</div>
                  <button className="cursor-pointer" onClick={handleLikeButton}>
                    <FcLikePlaceholder />
                  </button>
                </div>
                <div className=" flex items-center">
                  <div className="text-body text-sm flex items-center gap-2 bg-[#fef4cc] p-2 mt-2 rounded-2xl">
                    <CiClock2 /> {value.cookingTimeMinutes} mins
                    <p>|</p>
                    <div>{value.difficulty}</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RecipeCard;
