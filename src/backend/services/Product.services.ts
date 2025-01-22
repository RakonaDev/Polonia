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

export async function updateProduct (id:string, product: ProductDatabase) {
  await updateDoc(doc(PoloniaDB, "products", id), {
    ...product
  })
}