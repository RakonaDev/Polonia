import { collection } from "firebase/firestore";
import { PoloniaDB } from "../firebase";

export const orderCollection = collection(PoloniaDB, "orders")