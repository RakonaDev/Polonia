'use client'
import { useCart } from "@/zustand/useCart";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import cartIcon from '../assets/components/cart.svg'
import { AnimatePresence } from "framer-motion";
import React from "react";
import Link from "next/link";
import { ProductCardOrder } from "./ProductCardOrder";

export function SheetCart() {
  const { cart, total } = useCart()
  /*const [total, setTotal] = React.useState<number>(0)*/
  /*
  React.useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.subTotal, 0);
    setTotal(newTotal);
  }, [cart.length]);
  */
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className='my-auto flex gap-2'>
          <Image src={cartIcon} alt="cart" className='h-6 my-auto' />
          <p className='text-xl'>{cart.length > 0 ? <span className='text-white'>{cart.length}</span> : <span className='text-white'>0</span>}</p>
        </button>
      </SheetTrigger>
      <AnimatePresence>
        <SheetContent
          side='right'
          className="bg-backProduct overflow-x-hidden overflow-y-auto sm:max-w-[40rem] w-full animate data-[state=open]:animate-sheet-slide-in data-[state=closed]:animate-sheet-slide-out"
        >
          <SheetHeader>
            <SheetTitle className="md:text-3xl text-xl font-bold my-8">
              Tu Carrito
            </SheetTitle>
            <SheetDescription className="text-lg md:text-xl mb-8">
              Aquí podrás ver los productos que has agregado a tu carrito.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-5 mt-5">
            
            {
              cart.length > 0 ? cart.map((item, index) => {
                return (
                  <ProductCardOrder 
                    url={item.url}
                    key={index}
                    id={item.id}
                    product={item.product}
                    quantity={item.quantity}
                    subTotal={item.subTotal}
                  />
                )
              })
                :
                <p className="text-black mt-8">
                  No tienes productos en tu carrito
                </p>
            }
          </div>
          {
            cart.length > 0 && (
              <SheetFooter className="mt-8 flex flex-col gap-5">
                <div className="my-auto">
                  <p className="font-bold text-lg">Total: S/.{total}</p>
                </div>
                <div>
                  <Link
                    href="/sign-in"
                    className="bg-gradient-to-b from-red-500 to-red-600 py-2 px-8 text-white text-lg rounded-xl focus:ring-2 focus:ring-black focus:ring-offset-black"
                  >
                    Comprar los Productos Pedidos {`(${cart.length})`}
                  </Link>
                </div>
              </SheetFooter>
            )
          }
        </SheetContent>
      </AnimatePresence>
    </Sheet>
  )
}
