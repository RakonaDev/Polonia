
import { signUpUser } from "@/backend/services/UserShop.services"
import { clerkClient } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST (request: NextRequest) {
  const { userId } = await request.json()

  const client = await clerkClient()

  try {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'user'
      }
    })
    const user = await client.users.getUser(userId)
    await signUpUser(user.primaryEmailAddress, userId, user.username )
    return NextResponse.json({ message: 'ok' }, { status: 200 })
  }
  catch (error) {
    return NextResponse.json({ message: 'error' }, { status: 404 })
  }
}