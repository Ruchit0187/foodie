import type { Metadata } from "next";
import { auth } from "@/auth";
import UpdateProfile from "@/src/components/UpdateProfile";
import fetchUserData from "@/src/function/fetchUserData";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your Foodie profile, update your name, and change your password.",
  robots: { index: false, follow: false },
};

async function ProfilePage() {
  const session = await auth();
  const userData = await fetchUserData(session);
  return <UpdateProfile userData={userData} session={session} />;
}

export default ProfilePage;
