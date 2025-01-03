import { UserShopLoginSchema } from "@/backend/schemas/UserShop.schema";
import { signIn } from "@/backend/services/UserShop.services";
import { UserCredential } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = UserShopLoginSchema.parse(body);
    const { email, password } = parsedData;
    const userCredential: UserCredential = await signIn(email, password);

    return NextResponse.json({ user: userCredential.user.providerData });

  } catch (error) {

    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    console.log(error);
    return NextResponse.json({ error: "Error al autenticar" }, { status: 401 });
  }
}
