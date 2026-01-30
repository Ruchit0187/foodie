"use client";
import { useEffect, useState } from "react";
import { Flex, Input, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { authSignin } from "@/src/types";
import ResendOtp from "./ResendOtp";
import { Session } from "next-auth";

const { Title } = Typography;
const OtpVerify = ({
  userSigninData,
  email,
  session,
  setOtpVerify,
}: {
  userSigninData?: authSignin;
  email?: string;
  session?: Session | null;
  setOtpVerify?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    async function otpCheck() {
      try {
        const checkMailOtp = {
          mailOtp: Number(otp),
        };
        const value = await axios.post("/api/otpverify", checkMailOtp);
        if (value.status === 200 && otp.length === 5) {
          toast.success("otp Verify successfully");
          if (userSigninData) {
            signIn("credentials", {
              ...userSigninData.user,
              redirect: false,
            });
            router.push("/");
          } else if (session?.user) {
            setOtpVerify?.((prev) => !prev);
          } else {
            router.push("/resetpassword");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && otp.length > 4) {
          console.log(error);
          toast.error(error.response?.data.error);
        }
      }
    }
    otpCheck();
  }, [otp]);
  const emailID = userSigninData
    ? userSigninData?.user.email
    : email || session?.user.email!;
  return (
    <div className="w-full h-[88.3vh] flex items-center justify-center align-middle bg-blue-200">
      <div className="flex justify-center p-4 mb-6">
        <Flex gap="middle" className=" bg-blue-500 rounded-2xl" vertical>
          <Title level={4} className="px-3 text-center pt-1">
            Enter OTP
          </Title>
          <Input.OTP
            className="p-3"
            length={5}
            value={otp}
            onChange={setOtp}
            formatter={(str) => str.toUpperCase()}
          />
          <ResendOtp email={emailID} />
          <Title level={5} className="text-center">
            OTP send Via Email
          </Title>
        </Flex>
      </div>
    </div>
  );
};

export default OtpVerify;
