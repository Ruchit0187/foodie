import axios from "axios";

function ResendOtp({ email }: { userEmail?: string; email?: string }) {
  const sendOtp = async () => {
    try {
      await axios.post("/api/forgot", { email });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="mx-auto text-white text-xl p-2 rounded-xl bg-black cursor-pointer"
      onClick={sendOtp}
    >
      Resend Otp
    </button>
  );
}

export default ResendOtp;
