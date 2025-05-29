import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    EmailProvider({
      server: {
        host: "smtp.postmarkapp.com",
        port: 587,
        auth: {
          user: "your-postmark-server-token",
          pass: "your-postmark-server-token",
        },
      },
      from: "auth@jpaddison.net",
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        // Instead of sending an email via Postmark, console log it for development
        console.log("🔐 Authentication Email");
        console.log("📧 To:", identifier);
        console.log("🔗 Magic Link:\n", url);
        console.log("🏢 From:", provider.from);
        console.log("─".repeat(80));
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
