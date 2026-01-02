import type { recipeDataTypes } from "../types";
import Link from "next/link";
import { FcLikePlaceholder } from "react-icons/fc";
import { CiClock2 } from "react-icons/ci";
import { MouseEvent } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { Schema } from "mongoose";
import { useSession } from "next-auth/react";

interface IrecipeCardData {
  recipeCardData: recipeDataTypes[];
}
interface IsigninSession {
  data: {
    expires: Date;
    user: { name: string; email: string; img?: string };
  }| null;
  status: "unauthenticated" | "authenticated" | "loading";
}

function RecipeCard({ recipeCardData }: IrecipeCardData) {
  const {data:SessionData}=useSession() as IsigninSession
  const handleLikeButton = async (
    event: MouseEvent,
    value: Schema.Types.ObjectId
  ) => {
    event.stopPropagation();
    event.preventDefault();
    try {
     const a= await axios.post("/api/recipelike",{email:SessionData?.user.email,recipeID:value});
     console.log(a)
    } catch (error) {
      console.log(error)
    }
  };

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
                <h5 className="mt-4 mb-2 text-xl font-semibold tracking-tight text-heading">
                  {value.name}
                </h5>
                <div className="text-body text-sm flex justify-between">
                  <div>{value.category}</div>
                  {SessionData?.user && <button
                    className="cursor-pointer text-2xl text-red-800"
                    onClick={(event) => handleLikeButton(event, value._id)}
                  >
                    <FcLikePlaceholder />
                  </button>}
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
