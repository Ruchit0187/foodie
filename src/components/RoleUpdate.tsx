"use client";
import axios from "axios";
import { userData } from "../types";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleRoleButton = async (id: string, isAdmin: boolean,router:AppRouterInstance) => {
    try {
      const value = await axios.patch(`/api/admin/users`, { id, isAdmin });
      if(value.status===200){
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

function RoleUpdate({ userData }: { userData: userData }) {
  const router= useRouter();
  return (
    <button
      className="bg-black  text-white p-1 rounded-2xl cursor-pointer"
      onClick={() => handleRoleButton(userData._id, userData.isAdmin,router)}
    >
      {`${userData.isAdmin ? "Remove Admin" : "Make Admin"}`}
    </button>
  );
}

export default RoleUpdate;
