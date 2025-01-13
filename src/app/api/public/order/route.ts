import { preference } from "@/backend/mercadopago";
import { NextRequest, NextResponse } from "next/server";

/** @type { string } https://vn4c8t2c-3000.brs.devtunnels.ms/api/public/order/webhook */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("BODY DE ORDER: ",body);

    const response = await preference.create({
      body: {
        items: [
          {
            id: "123456789",
            title: "Product 1",
            quantity: 1,
            currency_id: "PEN",
            unit_price: 20,
          },
        ],
        payer: {
          email: "juancajas1905@gmail.com",
        },
        metadata: {
          'test': 'test',
        },
        notification_url:
          "https://9e37-2001-1388-1b8e-d6ef-f47b-db7b-3f35-2d3.ngrok-free.app/api/public/order/webhook",
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
