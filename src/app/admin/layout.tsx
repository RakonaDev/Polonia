import HeaderAdminLayout from '@/layout/HeaderAdminLayout'
import HeaderUserAdminLayout from '@/layout/HeaderUserAdminLayout'
import React from 'react'

export default function AdminLayout({
  children,  
}: { children: React.ReactNode }) {
  return (
    <div className='w-full min-h-screen bg-LayoutAdmin'>
      <div className='h-12 w-full'></div>
      <main className='max-w-[1980px] mx-auto w-full px-5 text-white flex'>
        <HeaderAdminLayout />
        <div className='flex-grow min-h-screen bg-white text-black rounded-3xl p-5'>
          <HeaderUserAdminLayout />
          {children}
        </div>
      </main>
    </div>
  )
}
