'use client'
import useOrder from '@/hook/useOrder'
import React from 'react'

export default function VentasPage() {
  const { data } = useOrder(process.env.NEXT_PUBLIC_URL + 'api/private/order')

  console.log(data)

  return (
    <main className="mt-6">
      <h1 className="text-4xl font-bold">Ventas</h1>
    </main>
  )
}
