import type { inferAsyncReturnType } from "@trpc/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/server/db";
import { NextRequest } from "next/server";

export async function createContext(req: NextRequest) {
  const token = await getToken({ req });

  return {
    prisma,
    user: token
      ? { id: token.sub, email: token.email, name: token.name }
      : null,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
