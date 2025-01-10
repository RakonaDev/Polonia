"use client"
import { useCart } from '@/zustand/useCart'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function PagoPage() {
  const { cart } = useCart()
  const router = useRouter()

  React.useEffect(() => {
    if(cart.length == 0) {
      router.push('/')
    }
  },[cart.length])

  return (
    <div>
      
    </div>
  )
}
