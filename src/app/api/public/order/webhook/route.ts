"use server";

import { payment } from "@/backend/mercadopago";
import { saveOrder } from "@/backend/services/Order.services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams.get("data.id");
    const type = url.searchParams.get("type");
    if (type === "payment" && params) {
      const result = await payment.get({ id: params });
      const schemaOrder = {
        id: params,
        email: result.metadata?.email,
        total: result.transaction_details?.total_paid_amount,
        items: result.additional_info?.items,
        ubicacion: result.metadata?.ubicacion,
        telefono: result.metadata?.telefono,
        distrito: result.metadata?.distrito,
        direccion: result.metadata?.direccion,
        createdAt: result.date_created,                                
        status: 'Pendiente'
      }
      console.log('ESQUEMA: ', schemaOrder, "\n")
      console.log("Resultados: ", result)
      await saveOrder(schemaOrder)

    } else if (type === "order") {
      console.log("Si he recibido el order");
    }
    return NextResponse.json({ message: 'Error no se ha encontrado el pago'} , { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
