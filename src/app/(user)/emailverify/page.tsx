import EmailVerification from "@/src/components/EmailVerification";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const tokenValue = await searchParams;
  const verifyToken = String(Object.keys(tokenValue)[0]);
  return <EmailVerification verifyToken={verifyToken}/>;
}

export default page;
