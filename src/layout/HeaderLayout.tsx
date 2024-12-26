'use client'

import { Header } from '@/components/Header'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function HeaderLayout() {
  const pathname =usePathname()
  return (
    <>
      {pathname === '/' ? <Header /> : null}
    </>
  )
}
