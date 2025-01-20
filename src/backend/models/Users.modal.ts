import { EmailAddress } from "@clerk/nextjs/server"

export interface UserShop {
  id?: string
  username: string | EmailAddress | null
  email: string | EmailAddress |null
  password: string
  role?: string
  createdAt: string
  updatedAt: string
}

export interface UserDatabase {
  id?: string
  username?: string | null
  email_address: string | EmailAddress | null
  createdAt: string
  updatedAt: string
  role?: string
}
