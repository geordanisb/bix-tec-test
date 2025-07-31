import { PrismaAdapter } from "@auth/prisma-adapter";
import { SessionStrategy } from "next-auth";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" as SessionStrategy },
  // Configure one or more authentication providers
  providers: [
    Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.username!,
          }
        });
        if (user) {
          const match = await bcryptjs.compare(credentials?.password!, user.password);
          if (!match) {
            console.error('passwords do not match');
            return null;
          }
          
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image, 
            isAdmin: user.isAdmin == 1 ? true : false,
          };
        }
        return null
      },
    })
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.isAdmin = token.isAdmin;
      return session;
    }
  }

}
