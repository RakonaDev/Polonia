import { collection } from "firebase/firestore";
import { PoloniaDB } from "../firebase";

export const productCollection = collection(PoloniaDB, "products")