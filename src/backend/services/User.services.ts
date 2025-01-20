import { getDocs } from "firebase/firestore";
import { userCollection } from "../collections/user.collection";

export async function getUsers () {
  const querySnapshot = await getDocs(userCollection)
  const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return {
    docs
  }
}