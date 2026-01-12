import NextAuth, { type DefaultSession } from "next-auth";

import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface User {
    isAdmin: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: string ;
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
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.isAdmin = token.isAdmin as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET_KEY!,
});
