'use client'

import { Header } from '@/components/Header'
import { useFeatures } from '@/zustand/useFeatures'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import Polonia from '@/assets/Polonia.svg'

const Routes = [
  '/',
  '/nosotros',
  '/contacto',
  '/pago'
]

export default function HeaderLayout() {

  const pathname = usePathname()
  const { loading } = useFeatures()

  return (
    <>
      {loading ? (
        <div className='w-full h-screen fixed top-0 bg-[#212121] z-[10000] flex flex-col justify-center items-center gap-6'>
          <p className='flex gap-5 items-center'>
            <Image src={Polonia} alt='Polonia' width={80} height={80} priority/>
            <span className='text-rojo font-bold text-xl'>Cargando Datos...</span>
          </p>
          <p className='relative'><span className="loader"></span></p>
        </div>
      ) : null}
      {Routes.includes(pathname) ? <Header /> : null}
    </>
  )
}
