import { useCart } from '@/zustand/useCart'
import cartIcon from '../assets/components/cart.svg'

export function Cart () {

  const { cart } = useCart()

  return (
    <>
      <div className='my-auto flex gap-2'>
        <img src={cartIcon} alt="cart" className='h-6 my-auto'/>
        <p className='text-xl'>{ cart.length > 0 ? <span className='text-white'>{cart.length}</span> : <span className='text-white'>0</span> }</p>
      </div>
    </>
  )
}