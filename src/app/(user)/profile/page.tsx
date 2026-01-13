import { auth } from "@/auth";
import UpdateProfile from "@/src/components/UpdateProfile";
import { Session } from "next-auth";

const fetchUserOldData = async (session: Session | null) => {
  const email = session?.user?.email;
  try {
    const userOldData = await fetch(
      `${process.env.BASE_URL}/api/profile?email=${email}`
    )
    if(!userOldData.ok) return 
    const userOldJsonData = await userOldData.json();
    return userOldJsonData;
  } catch (error) {
    console.log(error);
  }
};

async function profilePage() {
  const session = await auth();
  const userData = await fetchUserOldData(session);
  return <UpdateProfile  userData={userData}/>
}

export default profilePage;
