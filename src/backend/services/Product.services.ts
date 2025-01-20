import { addDoc, getDocs } from "firebase/firestore";
import { ProductDatabase } from "../models/Product.modal";
import { productCollection } from "../collections/product.collection";

export async function saveProduct (product: ProductDatabase) {
  return addDoc(productCollection, product)
}
