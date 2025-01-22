/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDoc, collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { OrderDatabase } from "../models/Order.modal";
import { PoloniaDB } from "../firebase";
import { orderCollection } from "../collections/order.collection";

export async function saveOrder (order: OrderDatabase) {
  return await addDoc(collection(PoloniaDB, "orders"), order)
}

export async function getOrder (pageSize: number, lastDoc?: any) {
  let q
  let Qpending
  if (lastDoc) {
    q = query(orderCollection, limit(10), startAfter(lastDoc), startAt(''))
    Qpending = query(
      orderCollection,
      startAfter(lastDoc),
      where("status", "!=", "Pendiente"),
      orderBy("status"),
      limit(pageSize)
    );
  }
  q = query(
    orderCollection,
    where("status", "==", "Pendiente"),
    limit(pageSize)
  );

  Qpending = query(
    orderCollection,
    where("status", "!=", "Pendiente"),
    orderBy("status"),
    limit(pageSize)
  );

  // Realiza ambas consultas
  const querySnapshot = await getDocs(q)
  const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
  const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return {
    docs,
    lastVisible
  }
}

export async function getOrderById (id: string) {
  const docRef = doc(PoloniaDB, "orders", id)
  const order = await getDoc(docRef)
  return order
}