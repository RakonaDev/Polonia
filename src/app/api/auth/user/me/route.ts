import { authUser } from "@/backend/services/UserShop.services";
import { NextResponse } from "next/server";

export async function GET () {
  try {
    const user = await authUser()
    return NextResponse.json({ user: user.providerData })
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error al obtener el usuario' }, { status: 401 })
  }
}