import { preference } from "@/backend/mercadopago";
import { userInfoSchema } from "@/backend/schemas/Order.schema";
import { NextRequest, NextResponse } from "next/server";
import { userInfo } from "os";

/** @type { string } https://vn4c8t2c-3000.brs.devtunnels.ms/api/public/order/webhook */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = userInfoSchema.safeParse(body);
    console.log("VALIDATION: ", validation.error?.errors);
    if (validation.success) {
      console.log("BODY DE ORDER: ", validation.data);
      const { nombre, apellido, direccion, distrito, ubicacion, telefono, correo } = validation.data;
      const response = await preference.create({
        body: {
          items: validation.data.cart,
          payer: {
            email: validation.data.correo,
          },
          metadata: {
            email: correo,
            nombre,
            apellido,
            direccion,
            distrito,
            ubicacion,
            telefono,
          },
          redirect_urls: {
            success: process.env.NEXT_PUBLIC_URL + "success",
          },
          notification_url:
            process.env.NEXT_PUBLIC_URL + "api/public/order/webhook",
        },
      });
      return NextResponse.json(response, { status: 200 });
    }
    console.log("Error")
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
