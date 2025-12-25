import nodemailer from "nodemailer";
import { User } from "../model/userSchema";
import { NextResponse } from "next/server";
import { dbConnect } from "../lib/dbConnect";

export async function sendMail(email: string, otp: number) {
  await dbConnect();
   const html = `
<div style="
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
">
  <h2 style="
    margin: 0 0 12px;
    color: #111827;
    text-align: center;
  ">
    Password Reset
  </h2>

  <p style="
    font-size: 14px;
    color: #374151;
    text-align: center;
    margin-bottom: 20px;
  ">
    Use the OTP below to reset your password.
  </p>

  <div style="
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 4px;
    color: #2563eb;
    background-color: #eff6ff;
    padding: 14px;
    text-align: center;
    border-radius: 6px;
    margin-bottom: 20px;
  ">
    ${otp}
  </div>

  <p style="
    font-size: 12px;
    color: #6b7280;
    text-align: center;
    margin: 0;
  ">
    This OTP is valid for a limited time. Do not share it with anyone.
  </p>
</div>
`;
  try {
    const user = User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user not Found" }, { status: 401 });
    }
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ruchitvasoya2806@gmail.com",
        pass: process.env.FORGOT_EMAIL_PASSWORD,
      },
    });
   

    const mailOption = {
      from: "ruchitvasoya2806@gmail.com",
      to: email,
      subject: "OTP verification",
      html,
    };
    await transport.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
}
