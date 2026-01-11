import { userData } from "@/src/types";
import NotFound from "../recipes/not-found";
import RecipeDelete from "../_components/DeleteRecipe";


async function UserPage() {
  const userData = await fetch(`${process.env.BASE_URL}/api/admin/users`);
  if (!userData.ok) return NotFound;
  const userJsonData = await userData.json();
  const{users}=userJsonData;
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="bg-neutral-secondary-soft border-b border-default">
          <tr className="text-xl">
            <th scope="col" className="px-2.5 py-3 font-medium">
              Name
            </th>
            <th scope="col" className="px-2.5 py-3 font-medium">
              Email
            </th>
            <th scope="col" className="px-2.5 py-3 font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((data:userData) => (
            <tr
              key={data._id}
              className="odd:bg-neutral-primary even:bg-neutral-secondary-soft
                            border border-default ring-1 ring-black/5
                            p-4 rounded-3xl m-2
                            shadow-sm hover:shadow-lg hover:-translate-y-0.5
                            transition-all duration-200 ease-in-out"
            >
              <td className="px-2.5 py-4">{data.name}</td>
              <td className="px-1.5 py-4">{data.email}</td>
              <td> <RecipeDelete userID={data._id} /></td>
            </tr>
           ))} 

        </tbody>
      </table>
    </div>
  );
}

export default UserPage;
