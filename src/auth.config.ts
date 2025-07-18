import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { User } from '@/root/next-auth';
import { type AdapterUser } from 'next-auth/adapters';
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? undefined,
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? undefined,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? undefined,
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? undefined,
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(8),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          //* Validate if user exists with provided email
          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          if (!user) return null;

          //* Validate if passwords matches
          const passwordsMatch = bcrypt.compareSync(password, user.password as string);
          if (!passwordsMatch) return null;

          const userWithoutPassword = Object.fromEntries(
            Object.entries(user).filter(([key]) => key !== 'password')
          );

          return userWithoutPassword;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email as string }
      });

      // If user does not exist, allow NextAuth to create it (only for OAuth)
      if (!dbUser) {
        // Allow registration, but do not return true here,
        // just let NextAuth create the user.
        return true;
      }

      // If user exists but email is not verified, block login !
      if (!dbUser.emailVerified) {
        console.error(`[AUTH] Usuario no verificado: ${user.email}`);
        return '/login?error=auth';
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.data = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.data as AdapterUser & User;
      return session;
    },
  }
};

export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
