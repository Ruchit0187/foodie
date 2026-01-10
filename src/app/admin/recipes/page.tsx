import { recipeDataTypes } from "@/src/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import RecipeDelete from "../_components/DeleteRecipe";
import UpdateRecipe from "../_components/UpdateRecipe";

async function page() {
  const recipeAdminData = await fetch(
    "http://localhost:3000/api/admin/recipes",
    { next: { tags: ["admin-recipes"] } }
  );
  if (!recipeAdminData.ok) return notFound();
  const recipeJsonData: recipeDataTypes[] = await recipeAdminData.json();
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="bg-neutral-secondary-soft border-b border-default">
          <tr className="text-xl">
            <th scope="col" className="px-2.5 py-3 font-medium">
              Image
            </th>
            <th scope="col" className="px-2.5 py-3 font-medium">
              Recipe name
            </th>
            <th scope="col" className="px-1.5 py-3 font-medium">
              Category
            </th>
            <th scope="col" className="px-1.5 py-3 font-medium">
              Difficulty
            </th>
            <th scope="col" className="px-2.5 py-3 font-medium">
              CookingTime
            </th>
            <th scope="col" className="text-center py-3 font-medium">
              Ingredients
            </th>
          </tr>
        </thead>
        <tbody>
          {recipeJsonData.map((data) => (
            <tr
              key={data._id}
              className="odd:bg-neutral-primary even:bg-neutral-secondary-soft
                          border border-default ring-1 ring-black/5
                          p-4 rounded-3xl m-2
                          shadow-sm hover:shadow-lg hover:-translate-y-0.5
                          transition-all duration-200 ease-in-out"
            >
              <th scope="row" className="px-2.5 py-2">
                <Image
                  src={data.image.trimEnd()}
                  alt={data.name}
                  height={52}
                  width={101}
                  quality={50}  
                  className="object-cover w-34 h-24.5"
                />
              </th>
              <td className="px-2.5 py-4">{data.name}</td>
              <td className="px-1.5 py-4">{data.category}</td>
              <td className="px-1.5 py-4">{data.difficulty}</td>
              <td className="px-2.5 py-4">{data.cookingTimeMinutes} min</td>
              <td className="px-2.5 py-4">
                <div className="grid grid-cols-2">
                  {data.ingredients.map((value, index) => (
                    <span key={index} className="inline-block">
                      {value.name}
                    </span>
                  ))}
                </div>
              </td>
              <td className="mr-2.5">
                <RecipeDelete recipeID={data._id} />
              </td>
              <td>
                <UpdateRecipe value={data} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default page;
