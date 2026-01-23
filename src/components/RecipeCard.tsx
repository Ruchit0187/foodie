import type { recipeDataTypes } from "../types";
import Link from "next/link";
import { CiClock2 } from "react-icons/ci";
import Image from "next/image";
import LikeButton from "./LikeButton";
import BookMark from "./BookMark";
import Datanot from "./Datanot";
import Loading from "./Loading";
import { useState } from "react";
import SkeletonEffect from "./Skeleton";

interface filterRecipes {
  recipeCardData: recipeDataTypes[];
  isLoadingData: boolean;
}

function RecipeCard({ recipeCardData, isLoadingData }: filterRecipes) {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  if (!recipeCardData.length && !isLoadingData) {
    return <Datanot />;
  }
  return (
    <div className="w-full mx-auto p-4 ">
      <ul className="w-[95%] mx-auto grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
        {recipeCardData?.map((value: recipeDataTypes) => (
          <li
            className="w-full flex flex-col items-center bg-neutral-primary-soft max-w-sm overflow-hidden rounded-xl border border-default shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-amber-50"
            key={String(value._id)}
          >
            <Link href={`/recipes/${value._id}`}>
              <div className="grid w-full place-items-center  rounded-lg p-6 lg:overflow-visible">
                {imageLoading && <SkeletonEffect />}
                <Image
                  src={String(value.image).trimEnd()}
                  className={`object-cover object-center  rounded-2xl  ${
                    imageLoading ? "opacity-0" : "opacity-100  h-65 "
                  }`}
                  width={imageLoading ? 0 : 250}
                  height={imageLoading ? 0 : 250}
                  alt={value.name}
                  onLoad={() => setImageLoading(false)}
                />
              </div>
              <div>
                <div className="p-5 pt-2">
                  <div className="flex justify-between items-center gap-2">
                    <h5 className="mt-4 mb-2 text-xl font-semibold text-heading text-nowrap">
                      {value.name}
                    </h5>
                    <LikeButton
                      recipeId={value?._id}
                      count={value?.count}
                      likes={value?.likes}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-body text-sm flex items-center gap-2 bg-[#fef4cc] p-2 mt-2 rounded-2xl">
                      <CiClock2 style={{ minWidth: "10px" }} />
                      {value.cookingTimeMinutes} mins
                      <p>|</p>
                      <div>{value.difficulty}</div>
                    </div>
                    <div className="p-2 mt-1">
                      <BookMark
                        recipeID={value._id}
                        bookmarkValue={value.bookmark}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {isLoadingData ? <Loading /> : null}
    </div>
  );
}

export default RecipeCard;
