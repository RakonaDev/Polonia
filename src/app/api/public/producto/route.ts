/* eslint-disable @typescript-eslint/no-explicit-any */
import { productCollection } from "@/backend/collections/product.collection";
import { getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const data: any[] = [];
  try {
    const q = query(productCollection)
    const response = await getDocs(q);
    response.forEach((doc) => {
      const product = {
        ID_Document: doc.id,
        id: doc.data().id,
        name: doc.data().name,
        price: doc.data().price,
        category: doc.data().category,
        supplier: doc.data().supplier,
        stock: doc.data().stock,
        description: doc.data().description,
        url_images: doc.data().url_images,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt
      }
      data.push(product)
    });
    return NextResponse.json(data, { status: 200 })
  }
  catch (error) {
    return NextResponse.json({ message: error }, { status: 404 })
  }
}