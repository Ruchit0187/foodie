import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "./src/model/provider";
import { User } from "./src/model/userSchema";
import { dbConnect } from "./src/lib/dbConnect";

declare module "next-auth" {
  interface User {
    isAdmin: string;
    isOwner: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: string;
    isOwner: string;
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
      },
      async authorize(credentials: any): Promise<any> {
        try {
          if (!credentials.email || !credentials.password) return null;
          return {
            email: credentials.email,
            id: credentials._id,
            isAdmin: credentials.isAdmin,
            isOwner: credentials.isOwner,
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
          const value = await User.findOne({ email: user.email });
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
            user.isAdmin = String(googleUser.isAdmin);
            user.isOwner = String(googleUser.isOwner);
            return true;
          } else if (googleExistingUser) {
            user.name = googleExistingUser.name;
            user.id = String(googleExistingUser._id);
            user.isAdmin = String(googleExistingUser.isAdmin);
            user.isOwner = String(googleExistingUser.isOwner);
            return true;
          }
        } catch (error) {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user,trigger,session }) {
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
        session.user.isAdmin = token.isAdmin;
        session.user.isOwner = token.isOwner;
        session.user.name = token.name;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.JWT_SECRET_KEY!,
  pages: {
    error: "/error",
  },
});
