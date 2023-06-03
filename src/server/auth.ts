import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions, type DefaultSession, type TokenSet, type Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    error?: "RefreshAccessTokenError";
    user: {
      id: string;
      email: string;
      google_access_token?: string;
    } & DefaultSession["user"];
  }

  // interface JWT {
  //   access_token: string;
  //   expires_at: number;
  //   refresh_token: string;
  //   error?: "RefreshAccessTokenError";
  // }

  interface User {
    google_access_token?: string;
  }

  // interface TokenSet {
  //   expires_in: number;
  // }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        await refreshGoogleAccessToken(session);
        session.user.id = user.id;
        const data = await prisma.account.findFirst({
          where: { user: { email: user.email } },
          select: {
            access_token: true,
          },
        });
        session.user.google_access_token = data?.access_token ?? undefined;
      }
      return session;
    },
    signIn({ account, profile }) {
      if (account?.provider === "google" && profile) {
        return profile.email === "filip.daabrowski@gmail.com";
      }
      return false;
    },
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        },
      },
      idToken: true,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/dashboard/login",
  },
};

export const getServerAuthSession = (ctx: { req: GetServerSidePropsContext["req"]; res: GetServerSidePropsContext["res"] }) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

const refreshGoogleAccessToken = async (session: Session) => {
  const userId = session.user.id;

  const [google] = await prisma.account.findMany({
    where: { userId, provider: "google" },
  });

  if (google?.expires_at && google?.refresh_token && google.expires_at * 1000 < Date.now()) {
    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: env.GOOGLE_CLIENT_ID,
          client_secret: env.GOOGLE_CLIENT_SECRET,
          grant_type: "refresh_token",
          refresh_token: google.refresh_token,
        }),
        method: "POST",
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const tokens: TokenSet & { expires_in: number } = await response.json();

      if (!response.ok) throw tokens;

      if (tokens?.expires_in) {
        await prisma.account.update({
          data: {
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? google.refresh_token,
          },
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: google.providerAccountId,
            },
          },
        });
      }
    } catch (error) {
      console.error("❌ Error refreshing access token", error);
      session.error = "RefreshAccessTokenError";
    }
  }
};
