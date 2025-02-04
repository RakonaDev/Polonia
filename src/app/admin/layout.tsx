'use client'
import { AdminProvider } from '@/context/AdminContext'
import HeaderAdminLayout from '@/layout/HeaderAdminLayout'
import HeaderUserAdminLayout from '@/layout/HeaderUserAdminLayout'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function AdminLayout({
  children,
}: { children: React.ReactNode }) {

  const pathname = usePathname()

  return (
    <AdminProvider>
      <div className='w-full min-h-screen bg-LayoutAdmin'>
        {!pathname.includes('login') && <div className='h-12 w-full' />}
        <main className={`${!pathname.includes('login') && 'max-w-[1980px] mx-auto px-5'} w-full text-white flex`}>
          <HeaderAdminLayout />
          <div className={`flex-grow min-h-screen ${pathname.includes('login') ? 'bg-transparent text-white' : 'bg-white text-black p-6'} rounded-3xl`}>
            {!pathname.includes('login') && <HeaderUserAdminLayout />}
            {children}
          </div>
        </main>
      </div>
    </AdminProvider>
  )
}
