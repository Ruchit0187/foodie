import { Session } from "next-auth";
export default async function fetchUserData(session?: Session | null) {
  const email = session?.user?.email ;
  try {
    const userNewData = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?email=${email}`,
    );
    if (!userNewData.ok) return;
    const userJsonData = await userNewData.json();
    return userJsonData;
  } catch (error) {
    console.log(error);
  }
}


