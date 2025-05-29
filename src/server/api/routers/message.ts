import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
  submit: protectedProcedure
    .input(z.object({ content: z.string().min(1).max(1000) }))
    .mutation(async ({ input, ctx }) => {
      const { content } = input;
      const user = ctx.session.user;

      // Console log the message instead of storing it
      console.log("💬 Message Submitted");
      console.log("👤 User:", user.email ?? user.name ?? "Unknown");
      console.log("📝 Content:", content);
      console.log("⏰ Timestamp:", new Date().toISOString());
      console.log("─".repeat(80));

      // Return success response
      return {
        success: true,
        message: "Message logged to server console",
        timestamp: new Date().toISOString(),
      };
    }),
});
