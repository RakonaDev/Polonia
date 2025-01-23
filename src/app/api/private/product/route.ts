/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import path from "node:path";
import { writeFile } from "fs/promises";
import { deleteProduct, saveProduct, updateProduct } from "@/backend/services/Product.services";
import fs from "node:fs";
import { getDocs, query } from "firebase/firestore";
import { productCollection } from "@/backend/collections/product.collection";

cloudinary.config({
  cloud_name: "dur0pnewh",
  api_key: "874359784668976",
  api_secret: '' + process.env.NEXT_PUBLIC_CLOUDINARY,
});

export async function GET(req: NextRequest) {
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


export async function POST(req: NextRequest) {
  const development = process.env.NEXT_PUBLIC_DEVELOPMENT
  const root = development !== 'development' ? 'socios/' : process.cwd() + '/public/images/'
  try {
    const data: FormData = await req.formData();

    const id = data.get("id")?.toString();
    const nombre = data.get("nombre")?.toString().toLowerCase();
    const precio = data.get("precio")?.toString();
    const categoria = data.get("categoria")?.toString();
    const supplier = data.get("supplier")?.toString().toLowerCase();
    const stock = data.get("stock")?.toString();
    const descripcion = data.get("descripcion")?.toString();
    const imagen1: FormDataEntryValue | File | null = data.get("imagen1");
    const imagen2: FormDataEntryValue | File | null = data.get("imagen2");
    const imagen3: FormDataEntryValue | File | null = data.get("imagen3");
    console.log(imagen1, imagen2, imagen3)
    console.log(path)
    if (imagen1 == null || imagen2 == null || imagen3 == null) {
      console.log("Faltan imagenes!!")
      /* return NextResponse.json({ message: "Faltan Imagenes" }, { status: 400 }); */
      throw new Error("Faltan imagenes!!")
    }

    const imagenParseada1 = imagen1 as File
    const imagenParseada2 = imagen2 as File
    const imagenParseada3 = imagen3 as File
    
    const pathFile1 = path.join(root, "", imagenParseada1.name)
    const pathFile2 = path.join(root, "", imagenParseada2.name)
    const pathFile3 = path.join(root, "", imagenParseada3.name)

    const bytes1 = await imagenParseada1.arrayBuffer()
    const bytes2 = await imagenParseada2.arrayBuffer()
    const bytes3 = await imagenParseada3.arrayBuffer()

    const buffer1 = Buffer.from(bytes1)
    const buffer2 = Buffer.from(bytes2)
    const buffer3 = Buffer.from(bytes3)
    
    await writeFile(pathFile1, buffer1)
    await writeFile(pathFile2, buffer2)
    await writeFile(pathFile3, buffer3)

    const response1 = await cloudinary.uploader.upload(pathFile1, {
      folder: 'Polonia',
      transformation: {
        height: 210,
        crop: 'scale',
      }
    });

    const response2 = await cloudinary.uploader.upload(pathFile2, {
      folder: 'Polonia',
      transformation: {
        height: 210,
        crop: 'scale',
      }
    });

    const response3 = await cloudinary.uploader.upload(pathFile3, {
      folder: 'Polonia',
      transformation: {
        height: 210,
        crop: 'scale',
      }
    })

    const url_images = [
      {
        public_id: response1.public_id,
        secure_url: response1.secure_url,
      },
      {
        public_id: response2.public_id,
        secure_url: response2.secure_url,
      },
      {
        public_id: response3.public_id,
        secure_url: response3.secure_url,
      }
    ]

    const productRef = await saveProduct({
      id,
      name: nombre,
      price: Number(precio),
      url_images,
      category: categoria,
      description: descripcion,
      supplier: supplier,
      stock: Number(stock),
      createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      updatedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    })
    
    // Eliminar archivos
    fs.unlink(pathFile1, (err) => {
      if (err) throw err;
    });
    fs.unlink(pathFile2, (err) => {
      if (err) throw err;
    });
    fs.unlink(pathFile3, (err) => {
      if (err) throw err;
    });
    
    return NextResponse.json(
      { message: "Producto creado correctamente", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 404 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json()
    const id = data.id    
    
    if (!id) {
      return NextResponse.json({ message: "Faltan ID del producto" }, { status: 400 });
    }

    await deleteProduct(id);
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
    let ID_Document = ''
    const data: FormData = await req.formData();
    const verifyID = data.get("ID_Document")
    if (verifyID === null) {
      ID_Document = ''
    }
    else {
      ID_Document = verifyID.toString()
    }
    const id = data.get("id")?.toString();
    const nombre = data.get("nombre")?.toString().toLowerCase();
    const precio = data.get("precio")?.toString();
    const categoria = data.get("categoria")?.toString();
    const supplier = data.get("supplier")?.toString().toLowerCase();
    const stock = data.get("stock")?.toString();
    const descripcion = data.get("descripcion")?.toString();
    const createdAt = data.get("createdAt")?.toString();
    const imagen1: FormDataEntryValue | File | null = data.get("imagen1");
    const imagen2: FormDataEntryValue | File | null = data.get("imagen2");
    const imagen3: FormDataEntryValue | File | null = data.get("imagen3");
    
    if (!imagen1 && !imagen2 && !imagen3) {
      return NextResponse.json({ message: "Faltan Imagenes" }, { status: 400 });
    }

    const imagenParseada1 = imagen1 as File
    const imagenParseada2 = imagen2 as File
    const imagenParseada3 = imagen3 as File
    
    const pathFile1 = path.join(process.cwd(), "public/images/productos", imagenParseada1.name)
    const pathFile2 = path.join(process.cwd(), "public/images/productos", imagenParseada2.name)
    const pathFile3 = path.join(process.cwd(), "public/images/productos", imagenParseada3.name)

    const bytes1 = await imagenParseada1.arrayBuffer()
    const bytes2 = await imagenParseada2.arrayBuffer()
    const bytes3 = await imagenParseada3.arrayBuffer()

    const buffer1 = Buffer.from(bytes1)
    const buffer2 = Buffer.from(bytes2)
    const buffer3 = Buffer.from(bytes3)
    
    await writeFile(pathFile1, buffer1)
    await writeFile(pathFile2, buffer2)
    await writeFile(pathFile3, buffer3)

    const response1 = await cloudinary.uploader.upload(pathFile1, {
      folder: 'Polonia',
      transformation: {
        height: 210,
        crop: 'scale',
      }
    });

    const response2 = await cloudinary.uploader.upload(pathFile2, {
      folder: 'Polonia',
      transformation: {
        height: 210,
        crop: 'scale',
      }
    });

    const response3 = await cloudinary.uploader.upload(pathFile3, {
      folder: 'Polonia',
      transformation: {
        height: 210,
        crop: 'scale',
      }
    })

    const url_images = [
      {
        public_id: response1.public_id,
        secure_url: response1.secure_url,
      },
      {
        public_id: response2.public_id,
        secure_url: response2.secure_url,
      },
      {
        public_id: response3.public_id,
        secure_url: response3.secure_url,
      }
    ]

    const productRef = await updateProduct(ID_Document, {
      id,
      name: nombre,
      price: Number(precio),
      url_images,
      category: categoria,
      description: descripcion,
      supplier: supplier,
      stock: Number(stock),
      createdAt: createdAt,
      updatedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    })
    
    // Eliminar archivos
    fs.unlink(pathFile1, (err) => {
      if (err) throw err;
    });
    fs.unlink(pathFile2, (err) => {
      if (err) throw err;
    });
    fs.unlink(pathFile3, (err) => {
      if (err) throw err;
    });
    
    return NextResponse.json(
      { message: "Producto actualizado correctamente", status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}