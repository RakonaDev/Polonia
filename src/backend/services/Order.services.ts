/* eslint-disable @typescript-eslint/no-explicit-any */
import { addDoc, collection, getDocs, limit, orderBy, query, startAfter, startAt, where } from "firebase/firestore";
import { OrderDatabase } from "../models/Order.modal";
import { PoloniaDB } from "../firebase";
import { orderCollection } from "../collections/order.collection";
import { start } from "repl";

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
  const [pendingSnapshot, nonPendingSnapshot] = await Promise.all([
    getDocs(q),
    getDocs(Qpending),
  ]);
  const querySnapshot = await getDocs(q)
  const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return docs
}