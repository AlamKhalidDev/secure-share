import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import { RateLimiterMemory } from "rate-limiter-flexible";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

const rateLimiter = new RateLimiterMemory({
  points: 30,
  duration: 60,
});

const isAuthed = middleware(async ({ next, ctx, path }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (path.includes("secret")) {
    const key = `create:${ctx.user?.id || "anonymous"}`;

    try {
      await rateLimiter.consume(key);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Rate limiter error:", e);
      } else {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests. Please try again later.",
        });
      }
    }
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
