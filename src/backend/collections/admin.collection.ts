import { collection } from "firebase/firestore";
import { PoloniaDB } from "../firebase";

export const collectionAdmin = collection(PoloniaDB, "admin")