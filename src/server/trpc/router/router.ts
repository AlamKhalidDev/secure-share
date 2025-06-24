import { router } from "../trpc";
import { authRouter } from "./auth";
import { secretRouter } from "./secret";

export const appRouter = router({
  auth: authRouter,
  secret: secretRouter,
});

export type AppRouter = typeof appRouter;
