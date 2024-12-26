'use client'

import React from "react"
import IconProduct from "../assets/components/iconProduct.svg"
import Cancel from "../assets/components/cancel.svg"

import { useCart } from "@/zustand/useCart"
import { DetailOrder } from "@/backend/models/DetailOrder.modal"
import Image, { StaticImageData } from "next/image"
import { Inter } from "next/font/google"

interface ProductCardProps {
  img: string | StaticImageData
  nombre: string
  id: string
  precio: string
  proveedor: string
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const ProductCard : React.FunctionComponent<ProductCardProps> = ({ img, nombre, id, precio, proveedor }) => {

  const[quantity, setQuantity] = React.useState<number>(1)
  const[isAdded, setIsAdded] = React.useState<boolean>(false)

  const { addToCart, removeFromCart, searchFromCart } = useCart();

  React.useEffect(() => {
    if (searchFromCart(id)) {
      setIsAdded(true)
    }
  }, [])

  const incrementQuantity = () : void => {
    if(isAdded) return
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () : void => {
    if (quantity === 1 || isAdded) return
    setQuantity(quantity - 1)
  }

  const handleCart = ({ id, nombre, proveedor, precio, imagen: img }: DetailOrder) : void => {
    if (isAdded) {
      removeFromCart(id)
      setIsAdded(false)
    } else {
      addToCart({ id, nombre, proveedor, precio, imagen: img })
      setIsAdded(true)
    }
  }

  return (
    <>
      <div className={`w-64 h-auto rounded-lg ${inter.className}`} data-os="fade-up">
        <div className="bg-backProduct w-full h-[215px] flex justify-center items-center">
          <Image src={img} alt="product" className="mx-auto"/>
        </div>
        <div className='flex flex-col gap-2 w-full pt-3'>
          <p className='text-md font-medium w-full h-20'>{ nombre }</p>
          <p className="text-textProduct">{ id }</p>
          <p className="text-textProduct">{ proveedor }</p>
          <p className='text-md'>{ precio }</p> 
        </div>
        <div className="flex w-full mt-4 gap-5">
          <div className={`flex-grow flex ${isAdded ? 'bg-gray-500' : 'bg-rojo'} rounded-xl text-white transition-colors duration-500`}>
            <button 
              type="button" 
              className={`flex-grow text-lg ${isAdded ? 'bg-gray-400' : 'bg-rojo-claro'} rounded-xl transition-colors duration-500`}
              onClick={decrementQuantity}
              disabled={isAdded}
            >
              -
            </button>
            <div className="w-14 h-full flex justify-center items-center text-lg text-white"> 
              { quantity }
            </div>
            <button 
              type="button"
              className={`flex-grow text-lg ${isAdded ? 'bg-gray-400' : 'bg-rojo-claro'} rounded-xl transition-colors duration-500`}
              onClick={incrementQuantity}
              disabled={isAdded}
            > 
              +
            </button>
          </div>
          <button 
            type="button" 
            className="bg-rojo w-12 h-10 flex justify-center items-center rounded-md"
            onClick={() => handleCart({ id, nombre, proveedor : id, precio, imagen: img })} 
            title="Eliminar de la cesta"
          >
            <Image src={isAdded ? Cancel : IconProduct} alt="iconProduct" className="w-7 h-7" />
          </button>
        </div>
      </div>
    </>
  )
}