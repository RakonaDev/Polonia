import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface UserLogin {
    email: string;
    uid?: string;
    token?: string;
    username?: string;
    role?: string; 
  }

  interface User extends UserLogin {
    email: string;
    username?: string;
    uid?: string;
    token?: string;
    role?: string;
  }

  interface Session {
    user: UserLogin & DefaultSession["user"];
  }

  interface JWT {
    email?: string;
    token?: string; 
    username?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    uid ?: string;
    email?: string;
    name?: string;
    token?: string; 
    role?: string;
  }
}