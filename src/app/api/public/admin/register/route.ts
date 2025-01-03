
import { AdminRegisterSchema } from "@/backend/schemas/Admin.schema";
import { signUpAdmin } from "@/backend/services/Admin.services";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
  const body = await req.json()
  const AdminCredentials = AdminRegisterSchema.safeParse(body)
  if (AdminCredentials.success) {
    const admin = await signUpAdmin(AdminCredentials.data.email, AdminCredentials.data.password)
    return NextResponse.json({ admin })
  }

  return NextResponse.json({ error: 'Error al registrar' }, { status: 401 })
}