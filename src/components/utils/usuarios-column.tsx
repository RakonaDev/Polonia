'use client'

import { UserDatabase, UserShop } from "@/backend/models/Users.modal";
import { JSX } from "react";

export default function UsuariosColumn(user: UserDatabase): JSX.Element {
  const emailFormateado = user.email_address?.toString()
  return (
    <tr key={user.id}>
      <td className='text-center p-2'>{user.id}</td>
      <td className='text-center p-2'>{emailFormateado}</td>
      <td className='text-center p-2'>{user.username}</td>
      <td className='text-center p-2'>{user.createdAt}</td>
      <td className='text-center p-2'>{user.updatedAt}</td>
    </tr>
  )
}