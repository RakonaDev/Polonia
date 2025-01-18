'use client'

import { DetailOrder } from "@/backend/models/DetailOrder.modal"
import Image from "next/image"
import Trash from '@/assets/components/trash.svg'
import Minus from '@/assets/icons/caret-down.svg'
import Plus from '@/assets/icons/caret-up.svg'
import { useCart } from "@/zustand/useCart"
import React from "react"

export function ProductCardOrder(item: DetailOrder) {
  const [quantity, setQuantity] = React.useState<number>(item.quantity)
  const { removeFromCart, incrementQuantity, decrementQuantity, updateQuantity } = useCart()

  const handleQuiantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ( e.target.value === '0' ) {
      setQuantity(1)
    }
    setQuantity(Number(e.target.value))
    updateQuantity(item.id, Number(e.target.value))
  }

  return (
    <div className="flex gap-4 w-full">
      <div className="w-48 h-52 p-3 bg-white grid place-items-center">
        <Image 
          src={item.url}
          alt="product"
          width={125}
          height={125}
          className="w-36 h-auto object-cover"
        />
      </div>
      <div className="flex-grow max-w-96">
        <h1 className="overflow-hidden" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{item.title}</h1>
        <p className="text-sm text-gris">{item.id}</p>
        <p className="text-sm text-gris">{item.supplier}</p>
        <div className="bg-white p-2 w-fit mt-5 rounded-lg">
          <div className="font-medium flex items-center">
            <span>CANT </span>
            <input 
              type="number" 
              title="quantity" 
              name="quantity" 
              value={item.quantity} 
              min='1'
              className="min-w-10 h-auto w-10 text-center focus:outline-none"
              readOnly
              onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            />
            <div>
              <Image src={Plus} alt="plus" className="w-5 h-5 cursor-pointer" onClick={() => incrementQuantity(item.id)} />
              <Image src={Minus} alt="minus" className="w-5 h-5 cursor-pointer" onClick={() => decrementQuantity(item.id, item.quantity)} />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5">
        <p className="font-medium text-lg">S/. {item.subTotal}</p>
        <button type="button" title="Eliminar" onClick={() => removeFromCart(item.id)}>
          
          <Image src={Trash} alt="trash" className="w-6 h-6" />
        </button>
        </div>
      </div>
    </div>
  )
}
