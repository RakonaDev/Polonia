import { collection } from "firebase/firestore";
import { PoloniaDB } from "../firebase";

export const userCollection = collection(PoloniaDB, "users")