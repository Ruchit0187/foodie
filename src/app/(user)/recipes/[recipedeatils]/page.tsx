import { Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { IoMdTime } from "react-icons/io";
import type { recipeDataTypes } from "@/src/types";
import { auth } from "@/auth";
import BackButton from "@/src/components/BackButton";
import Loading from "@/src/app/(user)/blogs/loading";
const RecipeDelete = dynamic(() => import("@/src/components/DeleteData"));
const UpdateRecipe = dynamic(() => import("@/src/components/UpdateRecipe"));

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
interface recipeDetails {
  params: Promise<{ recipedeatils: string }>;
}

async function page(props: recipeDetails) {
  const { recipedeatils } = await props.params;
  try {
    const recipeIndividualData = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipe/${recipedeatils}`,
      {
        next: { revalidate: 3600 },
      },
    );
    const recipeDataJson = await recipeIndividualData.json();
    const recipeData: recipeDataTypes = recipeDataJson?.recipeDetails;
    const session = await auth();

    const recipeSchema = {
      "@context": "https://schema.org",
      "@type": "Website",
      url: `${BASE_URL}/recipes`,
      name: recipeData.name,
    };
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Recipes",
          item: `${BASE_URL}/recipes`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: recipeData.name,
          item: `${BASE_URL}/recipes/${recipedeatils}`,
        },
      ],
    };
    return (
      <>
        <head>
          <title>{recipeData.name}</title>
          <meta
            name="description"
            content={`Make ${recipeData.name} in ${recipeData.cookingTimeMinutes} min. ${recipeData.difficulty} level.`}
          />
          <meta
            property="og:title"
            content={`${recipeData.name} – ${recipeData.category} Recipe | Foodie`}
          />
          <meta
            property="og:description"
            content={`Make ${recipeData.name} in ${recipeData.cookingTimeMinutes} min. ${recipeData.difficulty} level, ${recipeData.ingredients.length} ingredients.`}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={`${BASE_URL}/recipes/${recipedeatils}`}
          />
          <meta property="og:site_name" content="Foodie" />

          <meta property="og:image" content={String(recipeData.image)} />
          <meta property="og:image:alt" content={recipeData.name} />
        </head>
        <script
          type="application/ld+json"
          id="recipe-schema"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
        />
        <script
          type="application/ld+json"
          id="recipe-breadcrumb"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Suspense fallback={<Loading />}>
          <div className="flex flex-col bg-blue-100 mt-2.5 mx-3 rounded-3xl shadow-sm p-5">
            <BackButton />
            <div className="  flex max-[950px]:flex-col max-[600px]:gap-2  justify-between gap-3.5">
              <div className=" max-[950px]:w-full flex flex-col w-1/2 ">
                <div className="grid w-full place-items-center  rounded-lg p-6 lg:overflow-visible max-[950px]:w-full">
                  <Image
                    src={recipeData.image.toString().trimEnd()}
                    width={300}
                    height={300}
                    className="object-cover object-center rounded-lg h-95 w-full max-[950px]:w-full"
                    alt={recipeData.name}
                    fetchPriority="high"
                    decoding="sync"
                    loading="eager"
                    quality={80}
                  />
                </div>
                <div className="flex  ml-5 p-2.5 flex-col w-fit gap-4 rounded-xl border border-gray-200 bg-white shadow-sm text-nowrap max-[550px]:m-auto">
                  <div className=" text-3xl font-extrabold text-gray-800 max-[550px]:text-lg">
                    {recipeData.name}
                  </div>
                  <div className="flex  gap-4 max-[550px]:flex-col max-[550px]:ml-auto">
                    <div className="flex items-center w-fit">
                      <div className="border-r-2 flex items-center gap-3 pr-4 text-gray-700">
                        <p className="text-3xl text-orange-500 max-[550px]:text-[20px]">
                          <IoMdTime />
                        </p>
                        <div>
                          <p className="text-xl font-bold max-[550px]:text-[14px]">
                            {recipeData.cookingTimeMinutes} mins
                          </p>
                          <p className="text-sm text-gray-500 max-[550px]:text-[12px]">
                            Cooking Time
                          </p>
                        </div>
                      </div>

                      <div className="border-r-2 px-4 flex flex-col text-gray-700 max-[550px]:border-0">
                        <p className="text-xl font-bold capitalize max-[550px]:text-[14px]">
                          {recipeData.difficulty}
                        </p>
                        <p className="text-sm text-gray-500 max-[550px]:text-[12px]">
                          Difficulty
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center w-fit max-[550px]:ml-10">
                      <div className="border-r-2 pr-4 flex flex-col text-gray-700 ">
                        <p className="text-xl font-bold max-[550px]:text-[14px]">
                          {recipeData.ingredients.length}
                        </p>
                        <p className="text-sm text-gray-500 max-[550px]:text-[12px]">
                          Ingredients
                        </p>
                      </div>

                      <div className="flex flex-col text-gray-700 px-4 max-[550px]:ml-auto">
                        <p className="text-xl font-bold capitalize max-[550px]:text-[14px]">
                          {recipeData.category}
                        </p>
                        <p className="text-sm text-gray-500 max-[550px]:text-[12px]">
                          Diet
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 mt-3.5 max-[950px]:w-full">
                {session?.user?.isAdmin ? (
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
      </>
    );
  } catch (error) {
    return notFound();
  }
}

export default page;
