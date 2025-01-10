'use server'

import { payment } from "@/backend/mercadopago";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = req.nextUrl.searchParams.keys()
  const url = new URL(req.url);
  const params = url.searchParams.get('data.id')
  const type = url.searchParams.get('type')
  if (type === 'payment' && params) {
    const result = await payment.get({ id: params })
    console.log(result)
  }
  console.log(params)
  console.log(type)
  return NextResponse.json({ message: "ok" });
}