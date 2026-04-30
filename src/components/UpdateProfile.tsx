"use client";
import { useRouter } from "next/navigation";
import type { Session } from "next-auth";
import type { userData } from "../types";

function UpdateProfile({
  userData,
  session,
}: {
  userData: userData;
  session: Session | null;
}) {
  const router = useRouter();
  return (
    <div className="w-1/3 mx-auto flex flex-col p-3 border-2 border-gray-200 mt-2 justify-between items-center max-[500px]:w-full max-[500px]:p-3 rounded-2xl shadow-md bg-amber-100 hover:shadow-lg transition-shadow gap-2.5">
      <span className=" uppercase text-2xl text-center tracking-wide mb-4  font-bold">
        Account Settings
      </span>
      <div className="flex w-full gap-2 items-center justify-between mt-2 border-b pb-3">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-gray-900 mt-1">
            Change Name
          </span>
          <span className=" text-gray-600 mt-1">{userData.name}</span>
        </div>
        <button
          className="bg-black text-white px-3 py-1 rounded-2xl cursor-pointer hover:bg-gray-800 transition"
          onClick={() => {
            router.push(`/profile/nameupdate`);
          }}
        >
          Edit
        </button>
      </div>
      {!session?.user?.image && (
        <div className="flex w-full gap-2 items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              Change Password
            </span>
            <span className="text-gray-600 mt-1 tracking-widest">
              *********
            </span>
          </div>
          <button
            className="bg-black text-white px-3 py-1 rounded-2xl cursor-pointer hover:bg-gray-800 transition"
            onClick={() => router.push(`/profile/passwordupdate`)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
