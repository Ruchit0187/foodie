"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Loading from "../app/(user)/blogs/loading";

function AuthLoading() {
  const { status } = useSession();
  const [authStatus, setAuthStatus] = useState<string>(status);
  useEffect(() => {
    setAuthStatus(status);
  }, [status]);
  if (authStatus === "loading") {
    return <Loading />;
  }
  return null
}

export default AuthLoading;
