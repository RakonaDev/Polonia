import { getUsers } from "@/backend/services/User.services";
import { FirestoreError } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await getUsers();
    return NextResponse.json(response, { status: 200 });
  }
  catch (error) {
    if (error instanceof FirestoreError) {
      console.error(error.message);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: error }, { status: 404 });
  }
}