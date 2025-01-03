import { logout } from "@/backend/services/UserShop.services";
import { NextResponse } from "next/server";

export async function POST () {
  try {
    await logout()
  }
  catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error al cerrar sesión' }, { status: 401 })
  }
}