import { router, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";
import { decryptContent, encryptContent } from "@/lib/crypto";
import { Secret } from "@/types/dashboard";

const MY_SECRETS_CACHE_TTL = 60 * 1000;
const mySecretsCache = new Map<
  string,
  {
    value: Secret[];
    timestamp: number;
  }
>();

export const secretRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1),
        isOneTime: z.boolean().default(false),
        expiresAt: z.string().optional(),
        password: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { content, isOneTime, expiresAt, password } = input;

      // Encrypt content before storage
      const { encryptedContent, iv } = encryptContent(content);

      let hashedPassword = null;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const expiration = expiresAt
        ? new Date(expiresAt)
        : new Date(Date.now() + 24 * 60 * 60 * 1000);

      const secret = await ctx.prisma.secret.create({
        data: {
          encryptedContent,
          contentIv: iv,
          isOneTime,
          expiresAt: expiration,
          password: hashedPassword,
          creatorId: ctx.user.id!,
        },
      });

      // Invalidate user's secrets cache
      mySecretsCache.delete(`mySecrets:${ctx.user.id}`);

      return { id: secret.id };
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        content: z.string().optional(),
        isOneTime: z.boolean().optional(),
        expiresAt: z.string().optional(),
        password: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const { id, content, isOneTime, expiresAt, password } = input;

      const existingSecret = await ctx.prisma.secret.findUnique({
        where: { id, creatorId: ctx.user.id },
      });

      if (!existingSecret) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Secret not found" });
      }

      if (existingSecret.expiresAt < new Date()) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Secret expired" });
      }

      if (existingSecret.isOneTime && existingSecret.isViewed) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot update a viewed one-time secret",
        });
      }

      const updateData: Partial<{
        encryptedContent: string;
        contentIv: string;
        isOneTime: boolean;
        expiresAt: Date;
        password: string | null;
      }> = {};

      if (content !== undefined) {
        const { encryptedContent, iv } = encryptContent(content);
        updateData.encryptedContent = encryptedContent;
        updateData.contentIv = iv;
      }

      if (isOneTime !== undefined) {
        updateData.isOneTime = isOneTime;
      }

      if (expiresAt !== undefined) {
        updateData.expiresAt = new Date(expiresAt);
      }

      if (password !== undefined) {
        updateData.password = password ? await bcrypt.hash(password, 10) : null;
      }

      await ctx.prisma.secret.update({
        where: { id, creatorId: ctx.user.id },
        data: updateData,
      });

      mySecretsCache.delete(`mySecrets:${ctx.user.id}`);

      return { success: true };
    }),
  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
        password: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { id, password } = input;
      const secret = await ctx.prisma.secret.findUnique({
        where: { id },
      });

      if (!secret) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Secret not found" });
      }

      if (secret.expiresAt < new Date()) {
        await ctx.prisma.secret.delete({ where: { id } });
        throw new TRPCError({ code: "BAD_REQUEST", message: "Secret expired" });
      }

      if (secret.isOneTime && secret.isViewed) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Secret already viewed",
        });
      }

      if (secret.password) {
        if (!password) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Password required",
          });
        }
        const valid = await bcrypt.compare(password, secret.password);
        if (!valid) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid password",
          });
        }
      }

      // Decrypt content before returning
      const decryptedContent = decryptContent(
        secret.encryptedContent,
        secret.contentIv
      );

      return {
        ...secret,
        content: decryptedContent,
      };
    }),

  markAsViewed: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const secret = await ctx.prisma.secret.update({
        where: { id: input },
        data: { isViewed: true },
      });

      // Invalidate cache for the secret owner
      if (secret.creatorId) {
        mySecretsCache.delete(`mySecrets:${secret.creatorId}`);
      }

      return secret;
    }),

  mySecrets: protectedProcedure.query(async ({ ctx }) => {
    try {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const cacheKey = `mySecrets:${ctx.user.id}`;
      const cached = mySecretsCache.get(cacheKey);

      // Return cached result if valid
      if (cached) {
        if (Date.now() - cached.timestamp < MY_SECRETS_CACHE_TTL) {
          return cached.value;
        } else {
          mySecretsCache.delete(cacheKey);
        }
      }

      const secrets = await ctx.prisma.secret.findMany({
        where: {
          creatorId: ctx.user.id,
          expiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: "desc" },
      });

      const result = secrets.map((secret) => {
        const decryptedContent = decryptContent(
          secret.encryptedContent,
          secret.contentIv
        );
        return {
          id: secret.id,
          createdAt: secret.createdAt.toISOString(),
          expiresAt: secret.expiresAt.toISOString(),
          isOneTime: secret.isOneTime,
          isViewed: secret.isViewed,
          password: secret.password,
          content: decryptedContent,
        };
      });

      // Update cache
      mySecretsCache.set(cacheKey, {
        value: result,
        timestamp: Date.now(),
      });

      return result;
    } catch (error) {
      console.error("Error fetching my secrets:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch secrets",
      });
    }
  }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const secret = await ctx.prisma.secret.findUnique({
        where: { id: input, creatorId: ctx.user.id },
      });

      if (!secret) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await ctx.prisma.secret.delete({
        where: { id: input, creatorId: ctx.user.id },
      });

      // Invalidate user's secrets cache
      mySecretsCache.delete(`mySecrets:${ctx.user.id}`);

      return true;
    }),
});
