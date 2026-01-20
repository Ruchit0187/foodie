"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LoadingLoader from "./Loading";

function AuthLoading() {
  const { status } = useSession();
  const [authStatus, setAuthStatus] = useState<string>(status);
  useEffect(() => {
    setAuthStatus(status);
  }, [status]);
  if (authStatus === "loading") {
    return (
      <div className="h-full w-full absolute z-1 bottom-0 ">
        <LoadingLoader height={"h-[100vh]"} />
      </div>
    );
  }
  return null;
}

export default AuthLoading;
