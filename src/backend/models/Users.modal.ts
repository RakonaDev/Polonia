import { EmailAddress } from "@clerk/nextjs/server"

export interface UserShop {
  id?: string
  username: string | null
  email: string | EmailAddress | null
  password: string
  role: string
  createdAt: string
  updatedAt: string
}
