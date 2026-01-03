/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthError } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { dbConnect } from "./src/lib/dbConnect";
import { User } from "./src/model/userSchema";
import bcrypt from "bcryptjs";

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
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }
          if (!user.isVerify) {
            return null;
          }
          const verifyPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!verifyPassword) {
            return null;
          }

          return {
            id: user._id,
            email: user.email,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
