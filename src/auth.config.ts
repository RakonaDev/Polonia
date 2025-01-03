import { UserShopLoginSchema } from "@/backend/schemas/UserShop.schema";
import { signInAdmin } from "@/backend/services/Admin.services";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert, ServiceAccount } from "firebase-admin/app";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from 'next-auth';

import serviceAccount from "../polonia-test-firebase-adminsdk-s403e-e8e26815bf.json" assert { type: "json" };	

/*
  adapter: FirestoreAdapter({
    credential: cert(serviceAccount as ServiceAccount)
  }) as Adapter,
*/

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email", placeholder: "Correo Electrónico" },
        password: { type: "password", placeholder: "Contraseña" }
      },
      async authorize(credentials) {
        
        const userSafeCredentials = UserShopLoginSchema.safeParse(credentials)

        if (userSafeCredentials.success) {
          console.log("Todo correcto")
          const user = await signInAdmin(userSafeCredentials.data.email, userSafeCredentials.data.password)
          console.log("USUARIO: ",user)
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
    updateAge: 15 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.uid
        token.username = user.username
        token.token = user.token
        token.role = user.role
      }
      return token
    },
    async session({ session, token, user}) {
      
      session.user.uid = token.uid
      session.user.username = token.username
      session.user.token = token.token
      session.user.role = token.role
      return session
    }
  }
} satisfies NextAuthConfig