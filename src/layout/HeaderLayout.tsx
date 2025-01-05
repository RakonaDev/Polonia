'use client'

import { Header } from '@/components/Header'
import { usePathname } from 'next/navigation'
import React from 'react'

const Routes = [
  '/admin/dashboard',
  '/admin/ventas',
  '/admin/usuarios',
  '/admin/productos',
  '/',
  '/nosotros',
  '/login'
]

export default function HeaderLayout() {
  const pathname = usePathname()
  return (
    <>
      {!pathname.includes('admin') && Routes.includes(pathname) ? <Header /> : null}
    </>
  )
}
