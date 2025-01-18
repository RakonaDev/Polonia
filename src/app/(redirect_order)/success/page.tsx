'use client'
import { useCart } from '@/zustand/useCart'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SuccessPage() {
  const router = useRouter()
  const {
    clearFromCart
  } = useCart()

  React.useEffect(() => {
    clearFromCart()
    setTimeout(() => {
      router.push('/')
    }, 3000)
  }, [])

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div>
        <h1>✅ ✨</h1>
        <h1>Order Success</h1>
      </div>
    </div>
  )
}
