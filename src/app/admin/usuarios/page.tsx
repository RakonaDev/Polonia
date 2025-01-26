'use client'
import UsuariosColumn from '@/components/utils/usuarios-column'
import { apiUrl } from '@/helper/Global'
import useUsers from '@/hook/useUsers'
import { useFeatures } from '@/zustand/useFeatures'
import { AxiosRequestConfig } from 'axios'
import React from 'react'

const axiosOptions: AxiosRequestConfig = {
  method: 'GET'
}

export default function UsuariosPage() {
  const { setError, setLoading } = useFeatures()

  const { data } = useUsers({ setLoading, setError, url: apiUrl + 'private/user', options: axiosOptions, immediate: true })
  console.log(data)
  return (
    <main className="mt-6">
      <h1 className="text-4xl font-bold">Comunidad</h1>

      <div className='w-full mt-10'>
        <table className="w-full">
          <thead>
            <tr>
              <th className='p-2'>ID</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Usuario</th>
              <th className='p-2'>Creado en</th>
              <th className='p-2'>Actualizado en</th>
            </tr>
          </thead>
          <tbody>
            {data?.docs.map((user) => (
              <UsuariosColumn
                key={user.id}
                email_address={user.email_address}
                id={user.id}
                username={user.username}
                createdAt={user.createdAt}
                updatedAt={user.updatedAt}
              />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
