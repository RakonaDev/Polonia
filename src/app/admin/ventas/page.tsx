'use client'
import VentasColumn from '@/components/utils/ventas-column'
import useOrder from '@/hook/useOrder'
import React from 'react'

export default function VentasPage() {
  const { data } = useOrder(process.env.NEXT_PUBLIC_URL + 'api/private/order')

  console.log(data)

  return (
    <main className="mt-6">
      <h1 className="text-4xl font-bold">Ventas</h1>

      <div className='w-full mt-10'>
        <table className="w-full">
          <thead>
            <tr>
              <th className='p-2'>ID</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Total</th>
              <th className='p-2'>Status</th>
              <th className='p-2'>Ubicación</th>
              <th className='p-2'>Dirección</th>
              <th className='p-2'>Distrito</th>
              <th className='p-2'>Teléfono</th>
              <th className='p-2'>Creado en</th>
            </tr>
          </thead>
          <tbody>
            {data?.docs.map((order) => (
              <VentasColumn
                key={order.id}
                email={order.email}
                id={order.id}
                status={order.status}
                total={order.total}
                ubicacion={order.ubicacion}
                createdAt={order.createdAt}
                direccion={ order.direccion}
                distrito={ order.distrito}
                telefono={ order.telefono}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
