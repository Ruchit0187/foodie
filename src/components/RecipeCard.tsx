import type { recipeDataTypes } from "../types";
import Link from "next/link";
import { CiClock2 } from "react-icons/ci";
import Image from "next/image";
import LikeButton from "./LikeButton";


interface IrecipeCardData {
  recipeCardData: recipeDataTypes[];
}

function RecipeCard({ recipeCardData }: IrecipeCardData) {
  return (
    <div className="w-full mx-auto p-4 ">
      <ul className="w-[95%] mx-auto grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
        {recipeCardData.map((value) => (
          <li
            className="w-full flex flex-col items-center bg-neutral-primary-soft max-w-sm overflow-hidden rounded-xl border border-default shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-amber-50"
            key={String(value._id)}
          >
            <Link href={`/recipes/${value._id}`}>
              <div className="grid w-full place-items-center  rounded-lg p-6 lg:overflow-visible">
                <Image
                  src={value.image.trimEnd()}
                  width={250}
                  height={250}
                  className="object-cover object-center  h-65  rounded-2xl"
                  alt={value.name}
                />
              </div>
              <div className="">
                <div className="p-5 pt-2">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="mt-4 mb-2 text-xl font-semibold text-heading text-nowrap">
                      {value.name}
                    </h5>
                    <LikeButton recipeId={value._id} count={value.count}/>
                  </div>
                  <div className=" flex items-center">
                    <div className="text-body text-sm flex items-center gap-2 bg-[#fef4cc] p-2 mt-2 rounded-2xl">
                      <CiClock2 style={{ minWidth: "10px" }} />
                      {value.cookingTimeMinutes} mins
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
    </div>
  );
}

export default RecipeCard;
