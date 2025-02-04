'use client'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'
import React from 'react'
const Routes = [
  '/',
  '/nosotros',
  '/contacto',
  '/pago',
  '/producto',
]

export default function FooterLayout() {
  const pathname = usePathname()
  return (
    <>
      {
        Routes.includes(pathname) || pathname.includes('/producto/')
          ?
          (
            <div className='bg-[#353535] w-full py-20'>
              {Routes.includes(pathname) || pathname.includes('/producto/') ? <Footer /> : null}
            </div>
          )
          :
          null
      }
    </>
  )
}
