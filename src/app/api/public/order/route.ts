import { preference } from "@/backend/mercadopago";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  /*const body = req.body;*/

  const response = await preference.create({
    body: {
      items: [
        {
          id: "123456789",
          title: "Product 1",
          quantity: 1,
          currency_id: "PEN",
          unit_price: 20,
        }
      ],
      payer: {
        email: "juancajas1905@gmail.com",
      },
      notification_url: "https://vn4c8t2c-3000.brs.devtunnels.ms/api/public/order/webhook",
    }
  })

  return NextResponse.json(response);
}