import NextAuth from "next-auth";
import { authOptions } from "./auth.config";
import { NextAuthResult } from "next-auth";

const nextAuthResult = NextAuth(authOptions)
export const auth: NextAuthResult['auth'] = nextAuthResult.auth

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
}: NextAuthResult = NextAuth(authOptions)


