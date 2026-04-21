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
import type { Metadata } from "next";
import Script from "next/script";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://foodie-nine-gold.vercel.app";

interface recipeDetails {
  params: Promise<{ recipedeatils: string }>;
}

export async function generateMetadata(
  props: recipeDetails
): Promise<Metadata> {
  const { recipedeatils } = await props.params;
  try {
    const res = await axios.get(`${BASE_URL}/api/recipe/${recipedeatils}`);
    const recipe: recipeDataTypes = res.data?.recipeDetails;
    if (!recipe) return { title: "Recipe Not Found | Foodie" };
    return {
      title: `${recipe.name} Recipe – ${recipe.category} | ${recipe.difficulty} Level`,
      description: `Learn how to make ${recipe.name} in ${recipe.cookingTimeMinutes} minutes. A ${recipe.difficulty} ${recipe.category} recipe with ${recipe.ingredients.length} ingredients. Step-by-step guide on Foodie.`,
      keywords: [
        recipe.name,
        `${recipe.name} recipe`,
        recipe.category,
        recipe.difficulty,
        "recipe",
        "foodie",
        "easy cooking",
        "step by step recipe",
        "homemade food",
        `${recipe.category} recipe`,
        "cooking at home",
      ],
      openGraph: {
        title: `${recipe.name} – ${recipe.category} Recipe | Foodie`,
        description: `Make ${recipe.name} in ${recipe.cookingTimeMinutes} min. ${recipe.difficulty} level, ${recipe.ingredients.length} ingredients.`,
        type: "article",
        url: `${BASE_URL}/recipes/${recipedeatils}`,
        images: [
          {
            url: String(recipe.image),
            alt: recipe.name,
          },
        ],
        siteName: "Foodie",
      },
      twitter: {
        card: "summary_large_image",
        title: `${recipe.name} – ${recipe.category} Recipe | Foodie`,
        description: `Make ${recipe.name} in ${recipe.cookingTimeMinutes} min. ${recipe.difficulty} level.`,
        images: [String(recipe.image)],
      },
      alternates: {
        canonical: `${BASE_URL}/recipes/${recipedeatils}`,
      },
    };
  } catch {
    return { title: "Recipe | Foodie" };
  }
}

async function page(props: recipeDetails) {
  const { recipedeatils } = await props.params;
  const recipeIndividualData = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipe/${recipedeatils}`,
  );
  const recipeData: recipeDataTypes = recipeIndividualData.data?.recipeDetails;
  const session = await auth();

  const recipeSchema = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipeData.name,
    image: String(recipeData.image),
    description: `A ${recipeData.difficulty} ${recipeData.category} recipe with ${recipeData.ingredients.length} ingredients, ready in ${recipeData.cookingTimeMinutes} minutes.`,
    cookTime: `PT${recipeData.cookingTimeMinutes}M`,
    prepTime: `PT${Math.max(5, Math.round(recipeData.cookingTimeMinutes * 0.3))}M`,
    totalTime: `PT${recipeData.cookingTimeMinutes + Math.max(5, Math.round(recipeData.cookingTimeMinutes * 0.3))}M`,
    recipeCategory: recipeData.category,
    recipeCuisine: "Indian",
    recipeIngredient: recipeData.ingredients.map(
      (ing) => `${ing.quantity} ${ing.name}`
    ),
    recipeYield: "2-4 servings",
    author: {
      "@type": "Organization",
      name: "Foodie",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Foodie",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/foodielogo.png`,
      },
    },
    nutrition: {
      "@type": "NutritionInformation",
      servingSize: "1 serving",
    },
    suitableForDiet:
      recipeData.category === "vegetarian"
        ? "https://schema.org/VegetarianDiet"
        : recipeData.category === "vegan"
          ? "https://schema.org/VeganDiet"
          : undefined,
    keywords: `${recipeData.name}, ${recipeData.category}, ${recipeData.difficulty}, recipe, foodie`,
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

  // Dynamic FAQ schema from recipe data


  return (
    <Suspense fallback={<Loading />}>
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      <Script
        strategy="beforeInteractive"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="flex flex-col bg-blue-100 mt-2.5 mx-3 rounded-3xl shadow-sm p-5">
        <BackButton />
        <div className="  flex max-[950px]:flex-col max-[600px]:gap-2  justify-between gap-3.5">
          <div className=" max-[950px]:w-full flex flex-col w-1/2 ">
            <div className="grid w-full place-items-center  rounded-lg p-6 lg:overflow-visible max-[950px]:w-full">
              <Image
                src={String(recipeData.image).trimEnd()}
                width={300}
                height={300}
                className="object-cover object-center rounded-lg h-95 w-full max-[950px]:w-full"
                alt={recipeData.name}
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
                    <p className="text-sm text-gray-500 max-[550px]:text-[12px]">Difficulty</p>
                  </div>
                </div>
                <div className="flex items-center w-fit max-[550px]:ml-10">
                  <div className="border-r-2 pr-4 flex flex-col text-gray-700 ">
                    <p className="text-xl font-bold max-[550px]:text-[14px]">
                      {recipeData.ingredients.length}
                    </p>
                    <p className="text-sm text-gray-500 max-[550px]:text-[12px]">Ingredients</p>
                  </div>

                  <div className="flex flex-col text-gray-700 px-4 max-[550px]:ml-auto">
                    <p className="text-xl font-bold capitalize max-[550px]:text-[14px]">
                      {recipeData.category}
                    </p>
                    <p className="text-sm text-gray-500 max-[550px]:text-[12px]">Diet</p>
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
  );
}

export default page;
