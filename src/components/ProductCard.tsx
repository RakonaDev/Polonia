'use client'

import React, { useState } from "react"
import IconProduct from "../assets/components/iconProduct.svg"
import Cancel from "../assets/components/cancel.svg"

import { useCart } from "@/zustand/useCart"
import Image from "next/image"
import { Inter } from "next/font/google"
import { Product, ProductDatabase } from "@/backend/models/Product.modal"
import { CldImage } from "next-cloudinary"
import Link from "next/link"
import { slugify } from "@/lib/utils"

/*
interface ProductCardProps {
  img: string | StaticImageData
  name: string
  id: string
  precio: string
  proveedor: string
}
*/

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

type product = Pick<Product, 'id' | 'name' | 'price' | 'supplier'>

export const ProductCard = ({ url_images , name, id, price, supplier }: ProductDatabase) => {

  const[quantity, setQuantity] = useState<number>(1)
  const[isAdded, setIsAdded] = useState<boolean>(false)
  const[product] = useState<product>({
    id,
    name,
    price,
    supplier,
  })
  
  const { cart, addToCart, removeFromCart, searchFromCart } = useCart();
  const productUsed = cart.find((item) => item.id === id)
  React.useEffect(() => {
    const { found, quantityMain } = searchFromCart(id)
    if (found) {
      setIsAdded(true)
      setQuantity(quantityMain)
    }
    else {
      setIsAdded(false)
    }
  }, [productUsed])

  const incrementQuantity = () : void => {
    if(isAdded) return
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () : void => {
    if (quantity === 1 || isAdded) return
    setQuantity(quantity - 1)
  }

  const handleCart = ( id : string, title: string, unit_price: number  , quantity: number, secure_url : string, currency_id: string = "PEN" , supplier: string) : void => {
    if (isAdded) {
      removeFromCart(id)
      setIsAdded(false)
    } else {
      const subTotal = quantity * unit_price
      console.log({ id, title, unit_price, quantity, subTotal, secure_url, supplier, currency_id })
      addToCart({ id, title, unit_price, quantity, subTotal, secure_url, supplier, currency_id })
      setIsAdded(true)
    }
  }
  if (!url_images) return null
  const { public_id, secure_url } = url_images[0]
  return (
    <>
      <div className={`w-64 h-auto rounded-lg ${inter.className} mx-auto`}>
        <Link href={`/producto/${encodeURIComponent(product.name.toLowerCase())}`} className="bg-backProduct w-full h-[215px] flex justify-center items-center overflow-hidden">
          <CldImage src={public_id} alt="product" className="mx-auto hover:scale-125 transition-all duration-500" width={170} height={100} quality={100}  />
        </Link>
        <div className='flex flex-col gap-2 w-full pt-3'>
          <Link href={`/producto/${encodeURIComponent(product.name.toLowerCase())}`} className='text-md font-medium w-full h-20 hover:underline hover:underline-offset-2'>{ name.toUpperCase() }</Link>
          <p className="text-textProduct">{ id.toUpperCase() }</p>
          <p className="text-textProduct">{ supplier.toUpperCase() }</p>
          <p className='text-md'>{"S/. "+ price.toFixed(2) + " x Uni." }</p> 
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
            onClick={() => handleCart(product.id, product.name, product.price ,quantity, secure_url , "PEN", product.supplier )} 
            title="Eliminar de la cesta"
          >
            <Image src={isAdded ? Cancel : IconProduct} alt="iconProduct" className="w-7 h-7" />
          </button>
        </div>
      </div>
    </>
  )
}