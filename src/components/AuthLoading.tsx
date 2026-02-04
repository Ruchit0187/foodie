"use client";
import { useSession } from "next-auth/react";
import LoadingLoader from "./Loading";

function AuthLoading() {
  const { status } = useSession();
  // const [authStatus, setAuthStatus] = useState<string>(status);
  // useEffect(() => {
  //   setAuthStatus(status);
  // }, [status]);
  // console.log(status)
  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoadingLoader cssClass={"h-[100vh]"} />
      </div>
    );
  }
  return null;
}

export default AuthLoading;
