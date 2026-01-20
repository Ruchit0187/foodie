import { Session } from "next-auth";
export default async function fetchUserData(session: Session | null) {
  const email = session?.user?.email;
  try {
    const userNewData = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile?email=${email}`,
    );
    if (!userNewData.ok) return;
    const userOldJsonData = await userNewData.json();
    return userOldJsonData;
  } catch (error) {
    console.log(error);
  }
}


