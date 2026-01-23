import { userData } from "@/src/types";
import DeleteData from "../../../components/DeleteData";
import { auth } from "@/auth";
import RoleUpdate from "@/src/components/RoleUpdate";
import NotFound from "./not-found";
import BackButton from "@/src/components/BackButton";

export default async function UserPage() {
  const session = await auth();
  const userData = await fetch(
    `${process.env.BASE_URL}/api/admin/users?session=${session?.user?.isOwner}`
  );
  if (!userData.ok) return <NotFound/>;
  const userJsonData = await userData.json();
  const { users } = userJsonData;
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
       <BackButton/>
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
              Email Verified
            </th>
            <th scope="col" className="px-2.5 py-3 font-medium">
              Role
            </th>
            <th scope="col" className="px-2.5 py-3 font-medium">
              Action
            </th>
            {session?.user?.isOwner === "true" ? (
              <th scope="col" className="px-2.5 py-3 font-medium">
                Admin
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {users.map((data: userData) => (
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
              <td className="px-1.5 py-4">{`${
                data.isVerify ? "Verified" : "NotVerified"
              }`}</td>
              <td className="px-1.5 py-4">
                {`${data.isAdmin ? "Admin" : "User"}`}
              </td>
              <td className="px-1.5 py-4">
                <DeleteData userID={data._id} />
              </td>
              {session?.user?.isOwner === "true" ? (
                <td scope="col" className="px-2.5 py-3 w-fit">
                  <RoleUpdate userData={data} />
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

