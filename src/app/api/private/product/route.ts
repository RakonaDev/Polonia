/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";
import {
  deleteProduct,
  saveProduct,
  updateProduct,
} from "@/backend/services/Product.services";
import fs from "node:fs";
import { FirestoreError, getDocs, query, serverTimestamp } from "firebase/firestore";
import { productCollection } from "@/backend/collections/product.collection";
import { ProductDatabase } from "@/backend/models/Product.modal";
import { FirebaseError } from "firebase/app";

cloudinary.v2.config({
  cloud_name: "dur0pnewh",
  api_key: "874359784668976",
  api_secret: "" + process.env.NEXT_PUBLIC_CLOUDINARY,
});

export async function GET(req: NextRequest) {
  const data: any[] = [];
  try {
    const q = query(productCollection);
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
        updatedAt: doc.data().updatedAt,
      };
      data.push(product);
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  const development = process.env.NEXT_PUBLIC_DEVELOPMENT;
  const root =
    development !== "development"
      ? process.cwd() + "/_next/images"
      : process.cwd() + "/public/images/";
  try {
    const data: FormData = await req.formData();

    const id = data.get("id")?.toString();
    const nombre = data.get("nombre")?.toString().toLowerCase();
    const precio = data.get("precio")?.toString();
    const categoria = data.get("categoria")?.toString();
    const supplier = data.get("supplier")?.toString().toLowerCase();
    const stock = data.get("stock")?.toString();
    const descripcion = data.get("descripcion")?.toString();
    const images = data.getAll("imagenes");

    if (id === undefined || supplier === undefined || nombre === undefined)
      throw new Error("Deben que estas los parametros básicos");

    if (images.length === 0) {
      throw new Error("No se encontraron imágenes para subir.");
    }
    // Funcion dinamica para el grupo de imágenes
    const uploadToCloudinary = async (file: File) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64Image = `data:${file.type};base64,${buffer.toString(
        "base64"
      )}`;

      return cloudinary.v2.uploader.upload(base64Image, {
        folder: "Polonia",
        transformation: { height: 210, crop: "scale" },
      });
    };
    const uploadPromises = images.map((image) =>
      uploadToCloudinary(image as File)
    );
    const responses = await Promise.all(uploadPromises);
    const url_images = responses.map((response) => ({
      public_id: response.public_id,
      secure_url: response.secure_url,
    }));
    const productRef = await saveProduct({
      id,
      name: nombre,
      price: Number(precio),
      url_images,
      category: categoria,
      description: descripcion,
      supplier: supplier,
      stock: Number(stock),
      createdAt:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      updatedAt:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    });
    const newProduct = {
      ID_Document: productRef.id,
      id,
      name: nombre,
      price: Number(precio) * 100,
      url_images,
      category: categoria,
      description: descripcion,
      supplier: supplier,
      stock: Number(stock),
      createdAt:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
      updatedAt:
        new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
    };

    return NextResponse.json(
      {
        producto: newProduct,
        message: "Producto creado correctamente",
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Algo salió mal" }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const id = data.id;
    const url_publics = data.url_publics;
    console.log(url_publics);
    url_publics.map((public_id: string) => {
      cloudinary.v2.uploader.destroy(public_id);
    });

    if (!id) {
      return NextResponse.json(
        { message: "Faltan ID del producto" },
        { status: 400 }
      );
    }

    await deleteProduct(id);
    console.log("exitoso");
    return NextResponse.json(
      { message: "Producto eliminado correctamente", status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data: FormData = await req.formData();

    const verifyID = data.get("ID_Document");
    if (!verifyID) {
      throw new Error("ID_Document es requerido"); // <-- Validación obligatoria
    }
    const ID_Document = verifyID.toString();
    const id = data.get("id")?.toString();
    const nombre = data.get("nombre")?.toString().toLowerCase();
    const precio = data.get("precio")?.toString();
    const categoria = data.get("categoria")?.toString();
    const supplier = data.get("supplier")?.toString().toLowerCase();
    const stock = data.get("stock")?.toString();
    const descripcion = data.get("description")?.toString();

    if (
      !id ||
      !supplier ||
      !nombre ||
      !precio ||
      !stock ||
      isNaN(Number(precio)) ||
      isNaN(Number(stock))
    ) {
      throw new Error("Faltan parámetros básicos o tienen valores inválidos");
    }

    const datos: ProductDatabase = {
      id: id,
      name: nombre,
      price: Number(precio),
      category: categoria,
      description: descripcion,
      supplier: supplier,
      stock: Number(stock),
      updatedAt: String(serverTimestamp()),
    };
    await updateProduct(ID_Document, datos);

    return NextResponse.json(
      { message: "Producto actualizado correctamente", status: true },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof FirebaseError) {
      return NextResponse.json({ message: error.message, error: error.stack }, { status: 404 });
    }
    if (error instanceof FirestoreError){
      return NextResponse.json({ message: error.message, error: error.stack }, { status: 404 });
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
