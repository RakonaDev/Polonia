"use server";

import { payment } from "@/backend/mercadopago";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams.get("data.id");
    const type = url.searchParams.get("type");
    if (type === "payment" && params) {
      const result = await payment.get({ id: params });
      
      /*console.log("Resultados: ", result)*/
    } else if (type === "order") {
      console.log("Si he recibido el order");
    }
    return NextResponse.json({ message: "ok" });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
