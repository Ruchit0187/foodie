import { auth } from "@/auth";
import UpdateProfile from "@/src/components/UpdateProfile";
import fetchUserData from "@/src/function/fetchUserData";


async function ProfilePage() {
  const session = await auth();
  const userData = await fetchUserData(session);
  return <UpdateProfile userData={userData} session={session} />;
}

export default ProfilePage;
