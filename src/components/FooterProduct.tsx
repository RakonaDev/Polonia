'use client'
import { useCart } from '@/zustand/useCart'
import Image from 'next/image'
import React, { useState } from 'react'
import IconProduct from "../assets/components/iconProduct.svg"
import Cancel from "../assets/components/cancel.svg"
import { ProductDatabase } from '@/backend/models/Product.modal'

export default function FooterProduct({ product }: { product: ProductDatabase}) {
  const[quantity, setQuantity] = useState<number>(1)
  const[isAdded, setIsAdded] = useState<boolean>(false)
  const { cart, addToCart, removeFromCart, searchFromCart } = useCart();

  const incrementQuantity = () : void => {
    if(isAdded) return
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () : void => {
    if (quantity === 1 || isAdded) return
    setQuantity(quantity - 1)
  }

  const handleCart = ( id : string, title: string, unit_price: number  , quantity: number, currency_id: string = "PEN" , supplier: string) : void => {
    if (isAdded) {
      removeFromCart(id)
      setIsAdded(false)
    } else {
      const subTotal = quantity * unit_price
      if( product.url_images == undefined ) return
      const { secure_url } = product.url_images[0]
      console.log({ id, title, unit_price, quantity, subTotal, secure_url, supplier, currency_id })
      addToCart({ id, title, unit_price, quantity, subTotal, secure_url, supplier, currency_id })
      setIsAdded(true)
    }
  }

  return (
    <div className="flex w-auto mt-4 gap-5">
      <div className={`w-auto flex ${isAdded ? 'bg-gray-500' : 'bg-rojo'} rounded-xl text-white transition-colors duration-500`}>
        <button
          type="button"
          className={`min-w-16 text-lg ${isAdded ? 'bg-gray-400' : 'bg-rojo-claro'} rounded-xl transition-colors duration-500`}
          onClick={decrementQuantity}
          disabled={isAdded}
        >
          -
        </button>
        <div className="w-14 h-full flex justify-center items-center text-lg text-white">
          {quantity}
        </div>
        <button
          type="button"
          className={`min-w-16 text-lg ${isAdded ? 'bg-gray-400' : 'bg-rojo-claro'} rounded-xl transition-colors duration-500`}
          onClick={incrementQuantity}
          disabled={isAdded}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="bg-rojo w-auto px-6 py-2 h-10 flex justify-center items-center rounded-md"
        onClick={() => handleCart(product.id, product.name, product.price, quantity, "PEN", product.supplier)}
        title="Eliminar de la cesta"
      >
        <Image src={isAdded ? Cancel : IconProduct} alt="iconProduct" className="w-7 h-7" />
        <span className='ms-6 text-white'>Ingresar a la cesta</span>
      </button>
    </div>
  )
}
