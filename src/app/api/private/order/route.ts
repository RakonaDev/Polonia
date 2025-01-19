import { getOrder } from "@/backend/services/Order.services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    /*const body = await req.json()*/
    const response = await getOrder(10)
    return NextResponse.json(response, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}