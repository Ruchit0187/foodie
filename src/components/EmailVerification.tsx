"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadingLoader from "./Loading";
function EmailVerification({ verifyToken }: { verifyToken: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const verifyEmail = async () => {
    try {
      setLoading(true);
      const verifyEmailResponse = await axios.post("/api/verifyemail", {
        verifyToken,
      });
      if (verifyEmailResponse.status === 200) {
        toast.success("Mail Verify successfully");
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingLoader height={"absolute top-1/2"} />;
  }
  return (
    <div className="w-max mx-auto   my-6 flex justify-center bg-white shadow-sm border   border-slate-200 rounded-lg ">
      <div className="p-4">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">
          Verify Your Email to click
        </h5>
        <button
          onClick={verifyEmail}
          disabled={loading}
          className="rounded-md block mx-auto  bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Verify Email
        </button>
      </div>
    </div>
  );
}

export default EmailVerification;
