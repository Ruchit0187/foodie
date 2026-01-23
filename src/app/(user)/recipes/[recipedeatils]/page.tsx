import { recipeDataTypes } from "@/src/types";
import { IoMdTime } from "react-icons/io";
import axios from "axios";
import Image from "next/image";
import BackButton from "@/src/components/BackButton";
import { auth } from "@/auth";
import RecipeDelete from "@/src/components/DeleteData";
import UpdateRecipe from "@/src/components/UpdateRecipe";
import { Suspense } from "react";
import Loading from "../../blogs/loading";


interface recipeDetails {
  params: Promise<{ recipedeatils: string }>;
}
async function page(props: Promise<recipeDetails>) {
  const { params } = await props;
  const { recipedeatils } = await params;
  const recipeIndividualData = await axios.get(
    `${process.env.BASE_URL}/api/recipe/${recipedeatils}`
  );
  const recipeData: recipeDataTypes = recipeIndividualData.data?.recipeDetails;
  const session = await auth();
  return (
    <Suspense fallback={<Loading/>}>
      <div className="flex flex-col bg-blue-100 mt-2.5 mx-3 rounded-3xl shadow-sm p-5">
        <BackButton />
        <div className="  flex max-[950px]:flex-col max-[600px]:gap-2  justify-between gap-3.5 ">
          <div className=" max-[950px]:w-full flex flex-col w-1/2 ">
            <div className="grid w-full place-items-center  rounded-lg p-6 lg:overflow-visible max-[950px]:w-full">
              <Image
                src={String(recipeData.image).trimEnd() }
                width={300}
                height={300}
                className="object-cover object-center rounded-lg h-95 w-full max-[950px]:w-full"
                alt={recipeData.name}
              />
            </div>
            <div className="flex flex-col ">
              <div className="text-2xl font-extrabold p-2 ">
                {recipeData.name}
              </div>
              <div className="flex gap-3 w-full ">
                <div className="border-r-2 flex items-centre  justify-center gap-2 pr-4">
                  <p className="text-2xl ">
                    <IoMdTime />
                  </p>
                  <div>
                    <p className="text-xl font-bold">
                      {recipeData.cookingTimeMinutes}mins
                    </p>
                    <p>Cooking Time</p>
                  </div>
                </div>
                <div className="border-r-2 pr-4 flex flex-col">
                  <p className="text-xl font-bold">{recipeData.difficulty}</p>{" "}
                  <p>difficulty</p>
                </div>
                <div className="border-r-2 pr-4 flex flex-col">
                  <p className="text-xl font-bold">
                    {recipeData.ingredients.length}
                  </p>{" "}
                  <p>Ingredients</p>
                </div>
                <div className=" flex flex-col">
                  <p className="text-xl font-bold">{recipeData.category}</p>{" "}
                  <p>Diet</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 mt-3.5 max-[950px]:w-full">
            {session?.user?.isAdmin === "true" ? (
              <div className="flex  justify-end">
                <RecipeDelete recipeID={recipedeatils} />
                <UpdateRecipe value={recipeData} />
              </div>
            ) : null}
            <div className="bg-green-200 border-dotted border-2 rounded-2xl mt-2">
              <h2 className=" flex text-xl justify-between  text-orange-400">
                <div className="px-3 py-2">Units</div>
                <div className="px-3 py-2">Ingredients</div>
              </h2>
              <div>
                <ul>
                  {recipeData.ingredients.map((value, index) => (
                    <li key={index} className="px-3">
                      <div className="flex justify-between border-t-2 py-2">
                        <p>{value.quantity}</p>
                        <p>{value.name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default page;
