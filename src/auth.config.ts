import { UserShopLoginSchema } from "@/backend/schemas/UserShop.schema";
import { signInAdmin } from "@/backend/services/Admin.services";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert, ServiceAccount } from "firebase-admin/app";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthConfig } from 'next-auth';

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
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
      clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    })
  }) as unknown as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 60,
    updateAge: 15
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
    async session({ session, token}) {
      
      session.user.uid = token.uid
      session.user.username = token.username
      session.user.token = token.token
      session.user.role = token.role
      return session
    }
  }
} satisfies NextAuthConfig