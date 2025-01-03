import { collection } from "firebase/firestore";
import { PoloniaDB } from "../firebase";

export const collectionProducts = collection(PoloniaDB, "products")