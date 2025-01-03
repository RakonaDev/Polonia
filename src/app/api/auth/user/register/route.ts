import { UserShopRegisterSchema } from "@/backend/schemas/UserShop.schema";
import { signUp } from "@/backend/services/UserShop.services";
import { UserCredential } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const body = await req.text()
  try {
    const parsedData = UserShopRegisterSchema.parse(JSON.parse(body))
    const { email, password, confirm_password } = parsedData
    
    if(password !== confirm_password) {
      return NextResponse.json({ error: 'Las contraseñas no coinciden' }, { status: 401 })
    }
    const userCredential: UserCredential = await signUp(email, password)
    return NextResponse.json({ user: userCredential.user.providerData })
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      // Devuelve los errores detallados de Zod
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.log(error)
    return NextResponse.json({ error: 'Error al registrar' }, { status: 401 })
  }
}