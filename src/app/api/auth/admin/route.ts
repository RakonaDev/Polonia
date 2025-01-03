import { getToken } from "@/backend/services/Admin.services"
import { NextResponse, NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const { email, password } = JSON.parse(body)
  try {
    const token = await getToken(email, password)
    return NextResponse.json({ token })
  }
  catch(error) {
    return NextResponse.json({ error: 'Error al autenticar' }, { status: 401 })
  }
}