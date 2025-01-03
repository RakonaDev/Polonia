import { collection } from "firebase/firestore";
import { PoloniaDB } from "../firebase";

export const collectionPedidos = collection(PoloniaDB, "pedidos")