'use client'

import { Header } from '@/components/Header'
import { usePathname } from 'next/navigation'
import React from 'react'

const Routes = [
  '/',
  '/nosotros',
  '/contacto'
]

export default function HeaderLayout() {

  const pathname = usePathname()
  
  return (
    <>
      {Routes.includes(pathname) ? <Header /> : null}
    </>
  )
}
