import { authOptions } from "@/authOptions";
import NextAuth, { DefaultSession } from "next-auth"
import { type NextRequest } from "next/server";

type RouteHandlerContext = {
  params: Promise<{ nextauth: string[] }>
}


const auth = async (req: NextRequest, ctx: RouteHandlerContext) => {
  // const cookies=req.cookies;
  // const url = req.url;
  return await NextAuth(req as any, ctx, authOptions);
}
export function GET(req: NextRequest, ctx: RouteHandlerContext) {
  return auth(req, ctx);
}
export function POST(req: NextRequest, ctx: RouteHandlerContext) {
  return auth(req, ctx);
}

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin: number;
    } & DefaultSession["user"];
  }

  interface JWT {
    isAdmin: string;
  }
}

