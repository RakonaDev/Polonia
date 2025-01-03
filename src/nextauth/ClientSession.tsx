'use client'

import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

export default function ClientSession({ children } : { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider >
        { children }
      </SessionProvider>
    </>
  )
}
