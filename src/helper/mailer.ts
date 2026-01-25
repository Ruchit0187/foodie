import nodemailer from "nodemailer";
export async function sendMail(
  email: string,
  otp?: number,
  verifyToken?: string,
) {
  const forgotPassword = `
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
    Otp Verification
  </h2>

  <p style="
    font-size: 14px;
    color: #374151;
    text-align: center;
    margin-bottom: 20px;
  ">
    Use the OTP below to Verify the User.
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
  const verifyEmail = `<div style="max-width:420px;margin:40px auto;padding:24px;
            border-radius:10px;
            background:#ffffff;
            border:1px solid #e5e7eb;
            font-family:Arial,Helvetica,sans-serif;
            text-align:center;">

  <h2 style="margin:0 0 12px;
             color:#111827;
             font-size:20px;">
    Verify Your Email
  </h2>

  <p style="margin:0 0 20px;
            color:#374151;
            font-size:14px;
            line-height:1.5;">
    Please click the button below to verify your email address.
  </p>

  <a href="${process.env.BASE_URL}/emailverify?${verifyToken}"
     style="display:inline-block;
            padding:12px 20px;
            background:#2563eb;
            color:#ffffff;
            text-decoration:none;
            border-radius:6px;
            font-size:14px;
            font-weight:bold;">
    Verify Email
  </a>

  <p style="margin-top:20px;
            color:#6b7280;
            font-size:12px;">
    If you didn’t request this, you can safely ignore this email.
  </p>
</div>`;

  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "rajparmar2598@gmail.com",
        pass: process.env.FORGOT_EMAIL_PASSWORD!,
      },
    });
    const mailOption = {
      from: "rajparmar2598@gmail.com",
      to: email,
      subject: verifyToken ? "Email verification" : "OTP verification",
      html: verifyToken ? verifyEmail : forgotPassword,
    };
    await transport.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
}
