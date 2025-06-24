import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@/server/trpc/router/router";

export const trpc = createTRPCReact<AppRouter>();
