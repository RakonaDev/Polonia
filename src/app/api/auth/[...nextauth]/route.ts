/*export { GET, POST } from "@/auth" */

import { authOptions } from "@/auth.config";
import NextAuth from "next-auth";


export const { handlers: { GET, POST } } = NextAuth(authOptions)




/*
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: User }) {
      if (user) {
        token.email = user.email
        token.token = user.token
      }
      return token
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      // Añadir datos del JWT al objeto de sesión
      if (token) {
        session.user.email = token.email as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
*/