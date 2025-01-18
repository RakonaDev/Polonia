import { getOrder } from "@/backend/services/Order.services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    /*const body = await req.json()*/
    const docs = await getOrder()
    return NextResponse.json(docs, { status: 200 });
  }
  catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}