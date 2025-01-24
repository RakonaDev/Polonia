import { ProductDatabase } from "@/backend/models/Product.modal"
import { JSX } from "react"
import { CldImage } from 'next-cloudinary';
import axios from "axios";
import useProducts from "@/hook/useProducts";
import { apiUrl } from "@/app/admin/productos/page";

export const ProductosColumn = (product: ProductDatabase): JSX.Element => {
  const { setState } = useProducts({
    url: apiUrl,
    immediate: false
  })
  const eliminarProducto = async () => {
    try{ 
      const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL+ 'private/product', {
        data: {
          id: product.ID_Document
        }
      })
      
      console.log("Exitoso")
      setState((prevState: ProductDatabase[]) => prevState.filter(product => product.ID_Document !== product.ID_Document))
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <tr key={product.ID_Document}>
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