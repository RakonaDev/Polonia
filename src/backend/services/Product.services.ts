import { addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ProductDatabase } from "../models/Product.modal";
import { productCollection } from "../collections/product.collection";
import { PoloniaDB } from "../firebase";

export async function saveProduct (product: ProductDatabase) {
  return addDoc(productCollection, product)
}

export async function deleteProduct (id: string) {
  await deleteDoc(doc(PoloniaDB, "products", id))
}

export async function searchProduct (id: string) {
  const q = doc(PoloniaDB, "products", id)
  const product = await getDoc(q)
  return product
}

export async function updateProduct (id: string, data: ProductDatabase) {
  if (!id) {
    throw new Error("Faltan ID del producto");
  }
  console.log("Llego hasta aqui chavales")
  await updateDoc(doc(PoloniaDB, "products", id), {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    category: data.category,
    supplier: data.supplier,
    updatedAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  })
}