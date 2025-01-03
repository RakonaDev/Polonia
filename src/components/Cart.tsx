import { useCart } from '@/zustand/useCart'
import cartIcon from '../assets/components/cart.svg'
import Image from 'next/image'

export default function Cart () {


  const { cart } = useCart()

  return (
    <>
      <div className='my-auto flex gap-2'>
        <Image src={cartIcon} alt="cart" className='h-6 my-auto'/>
        <p className='text-xl'>{ cart.length > 0 ? <span className='text-white'>{cart.length}</span> : <span className='text-white'>0</span> }</p>
      </div>
    </>
  )
}