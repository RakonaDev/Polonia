import { addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { ProductDatabase } from "../models/Product.modal";
import { productCollection } from "../collections/product.collection";
import { PoloniaDB } from "../firebase";

export async function saveProduct(product: ProductDatabase) {
  return addDoc(productCollection, product);
}

export async function deleteProduct(id: string) {
  const docRef = doc(PoloniaDB, "products", id);
  const docSnap = await getDoc(docRef);
  await deleteDoc(docRef);
  return {
    id: docSnap.id
  }
}

export async function searchProduct(id: string) {
  const q = doc(PoloniaDB, "products", id);
  const product = await getDoc(q);
  return product;
}

export async function updateProduct(id: string, data: ProductDatabase) {
  if (!id) {
    throw new Error("Falta ID del producto");
  }

  const docRef = doc(PoloniaDB, "products", id);
  const docSnap = await getDoc(docRef);
  

  if (!docSnap.exists()) {
    throw new Error("El documento no existe");
  }
  console.log("Llego hasta aqui chavales");
  await updateDoc(docRef, {
    ...data,
  });

}
