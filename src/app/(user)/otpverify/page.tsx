"use client";
import React, { useEffect, useState } from "react";
import { Flex, Input, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const { Title } = Typography;
const OtpVerify: React.FC = () => {
  const {data,status}=useSession()
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
          if(status==="unauthenticated"){
            router.push("/resetpassword")
          }
          else{
            router.push("/");
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error) && otp.length) {
          toast.error(error.response?.data.error);
        }
      }
    }
    otpCheck();
  }, [otp]);
  return (
    <div className="w-full h-[88.3vh] flex items-center justify-center align-middle bg-blue-200">
      <div className="flex justify-center p-4 mb-6">
        <Flex gap="middle" className=" bg-blue-500 rounded-2xl  " vertical>
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
          <Title level={5} className="text-center">
            OTP send Via Email
          </Title>
        </Flex>
      </div>
    </div>
  );
};

export default OtpVerify;
