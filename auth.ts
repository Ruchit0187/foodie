import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "./src/model/provider";
import { dbConnect } from "./src/lib/dbConnect";
import { User as Users } from "./src/model/userSchema";
import type { DefaultSession, ICredentialsService } from "@auth/core/types";

declare module "next-auth" {
  interface User {
    id: string;
    isAdmin: boolean;
    isOwner: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean;
    isOwner: boolean;
  }
}
declare module "@auth/core/types" {
  interface ICredentialsService {
    email: string;
    isAdmin: boolean;
    isOwner: boolean;
    id: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin: boolean;
      isOwner: boolean;
      id: string;
      name: string;
    } & DefaultSession["user"];
  }
}

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
        isAdmin: { type: "string", label: "isAdmin" },
        isOwner: { type: "string", label: "isOwner" },
        id: { type: "string", label: "id" },
      },
      async authorize(
        credentials: Partial<
          Record<"email" | "password" | "isAdmin" | "isOwner" | "_id", unknown>
        >,
      ): Promise<ICredentialsService | null> {
        try {
          if (!credentials.email || !credentials.password) return null;
          return {
            email: String(credentials.email),
            id: String(credentials._id),
            isAdmin: credentials.isAdmin === "true",
            isOwner: credentials.isOwner === "true",
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      if (credentials === undefined) {
        await dbConnect();
        try {
          const value = await Users.findOne({ email: user.email });
          const googleExistingUser = await Provider.findOne({
            email: user.email,
          });
          if (!value && !googleExistingUser) {
            const googleUser = await Provider.create({
              email: `${user.email}`,
              name: `${user.name}`,
            });
            user.id = String(googleUser._id);
            user.name = googleUser.name;
            user.isAdmin = googleUser.isAdmin;
            user.isOwner = googleUser.isOwner;
            return true;
          } else if (googleExistingUser) {
            user.name = googleExistingUser.name;
            user.id = String(googleExistingUser._id);
            user.isAdmin = googleExistingUser.isAdmin;
            user.isOwner = googleExistingUser.isOwner;
            return true;
          }
        } catch (error) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.isOwner = user.isOwner;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.isOwner = token.isOwner as boolean;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    error: "/error",
    signIn: "/signin",
  },
  trustHost: true,
});
