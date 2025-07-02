import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { trpcLogger } from "~/lib/logger";

export const messageRouter = createTRPCRouter({
  submit: protectedProcedure
    .input(z.object({ content: z.string().min(1).max(1000) }))
    .mutation(async ({ input, ctx }) => {
      const { content } = input;
      const user = ctx.session.user;

      // Log the message instead of storing it
      trpcLogger.info("Message Submitted", {
        user: user.email ?? user.name ?? "Unknown",
        content,
        timestamp: new Date().toISOString(),
      });

      // Return success response
      return {
        success: true,
        message: "Message logged to server console",
        timestamp: new Date().toISOString(),
      };
    }),
});
