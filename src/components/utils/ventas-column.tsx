'use client'

import { OrderDatabase } from "@/backend/models/Order.modal";
import { JSX } from "react";

export default function VentasColumn(order: OrderDatabase): JSX.Element {
  let fecha
  if (order.createdAt) {
    fecha = Date.parse(order.createdAt)
    fecha = new Date(fecha).toLocaleString()
  }
  return (
    <tr key={order.id}>
      <td className='text-center p-2'>{order.id}</td>
      <td className='text-center p-2'>{order.email}</td>
      <td className='text-center p-2'>{order.total}</td>
      <td className='text-center p-2'>{order.status === "Pendiente" ? "Pendiente" : "Completo"}</td>
      <td className='text-center p-2'>{order.ubicacion}</td>
      <td className='text-center p-2'>{order.direccion}</td>
      <td className='text-center p-2'>{order.distrito}</td>
      <td className='text-center p-2'>{order.telefono}</td>
      <td className='text-center p-2'>{fecha}</td>
    </tr>
  )
}