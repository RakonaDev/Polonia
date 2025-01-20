import { ProductDatabase } from "@/backend/models/Product.modal"
import Image from "next/image"
import { JSX } from "react"
import { CldImage } from 'next-cloudinary';

export const ProductosColumn = (product: ProductDatabase): JSX.Element => {
  
  return (
    <tr key={product.id}>
      <td className='text-center p-2'>{product.id}</td>
      <td className='text-center p-2'>{product.name}</td>
      <td className='text-center p-2'>{product.price}</td>
      <td className='text-center p-2'>{product.category}</td>
      <td className='text-center p-2'>{product.supplier}</td>
      <td className='text-center p-2'>{product.stock}</td>
      <td className='text-center p-2'>{product.description}</td>
      <td className='text-center p-2 flex justify-center'>
        <CldImage src={product.url_images[0].public_id ? product.url_images[0].public_id : ''} alt="web" width={100} height={100} />
      </td>
      <td className='text-center p-2'>
        <button className='px-6 py-2 rounded-xl text-lg bg-rojo text-white'>
          Editar
        </button>
      </td>
    </tr>
  )
}