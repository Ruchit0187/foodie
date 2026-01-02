import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: {
          type: "email",
          label: "email",
        },
        password: { type: "password", label: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any): Promise<any> {
        try {
          const userSignInData = await axios.post(
            "http://localhost:3000/api/signin",
            credentials
          );
          return userSignInData.data.user;
          // eslint-disable-next-line
        } catch (error: any) {
          const authErr = error instanceof AuthError;
          console.log(error)
          return null;
         
        }
      },
    }),
  ],
  
});
