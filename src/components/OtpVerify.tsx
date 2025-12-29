"use client";
import React, { useEffect, useState } from "react";
import { Flex, Input, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const { Title } = Typography;

const OtpVerify: React.FC = () => {
  const [otp, setOtp] = useState("");
  const router=useRouter()
  useEffect(() => {
    async function otpCheck() {
      try {
        const checkMailOtp = {
          mailOtp: Number(otp),
        };
        const value = await axios.post("/api/otpverify", checkMailOtp);
        if (value.status === 200) {
          router.push("/reset")
          alert("OTP verify successfully");
        }
      } catch (error) {
        console.log(error);
      }
    }
    otpCheck();
  }, [otp]);
  return (
    <div className="flex justify-center p-4">
      <Flex gap="middle" className=" bg-blue-500 rounded-2xl  " vertical>
        <Title level={4} className="p-3 text-center">
          Enter OTP
        </Title>
        <Input.OTP
          className="p-3"
          length={5}
          value={otp}
          onChange={setOtp}
          formatter={(str) => str.toUpperCase()}
        />
      </Flex>
    </div>
  );
};

export default OtpVerify;
