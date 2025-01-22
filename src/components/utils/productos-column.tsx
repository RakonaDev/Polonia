import { ProductDatabase } from "@/backend/models/Product.modal"
import Image from "next/image"
import { JSX } from "react"
import { CldImage } from 'next-cloudinary';
import axios from "axios";

export const ProductosColumn = (product: ProductDatabase): JSX.Element => {
  const eliminarProducto = async () => {
    await axios.delete('http://localhost:3000/api/private/product', {
      data: {
        id: product.ID_Document
      }
    })
  }
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
        <div className="flex flex-col gap-2 items-center">
          <button className='px-3 py-2 rounded-xl text-lg bg-rojo text-white w-fit'>
            Editar
          </button>
          <button className='px-3 py-2 rounded-xl text-lg bg-blue-500 text-white w-fit' onClick={eliminarProducto}>
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  )
}