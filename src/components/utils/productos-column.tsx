import { ProductDatabase } from "@/backend/models/Product.modal"
import { JSX } from "react"
import { CldImage } from 'next-cloudinary';
import axios, { AxiosError } from "axios";
import useProducts from "@/hook/useProducts";
import Trash from '@/assets/icons/trash.svg'
import Edit from '@/assets/icons/edit.svg'
import Image from "next/image";
import { useFeatures } from "@/zustand/useFeatures";
import { useFeaturesAdmin } from "@/zustand/useFeaturesAdmin";

export const ProductosColumn = (product: ProductDatabase): JSX.Element => {
  const { refetch } = useProducts()
  const { error: Error, setError, setErrorMessage } = useFeatures()
  const { setLoading: setLoadingAdmin, loadingMain: loadingMainAdmin, setSuccess } = useFeaturesAdmin()

  const eliminarProducto = async (ID_Document?: string) => {
    if (loadingMainAdmin.loading) return
    try{ 
      setLoadingAdmin({
        loading: true,
        messageLoading: 'Eliminando producto...'
      })
      const url_publics: string[] = []
      product.url_images.map((image) => {
        url_publics.push(image.public_id)
      })
      const response = await axios.delete(process.env.NEXT_PUBLIC_BACKEND_URL+ 'private/product', {
        data: {
          id: ID_Document,
          url_publics
        }
      })
      .finally(() => setLoadingAdmin({
        loading: false,
        messageLoading: ''
      }))
      console.log("Exitoso")
      if (response.status === 200 || response.data.status === 'ok') {
        refetch()
        setSuccess({
          success: true,
          messageSuccess: 'Producto eliminado exitosamente'
        })
        setInterval(() => {
          setSuccess({
            success: false,
            messageSuccess: ''
          })
        }, 3000)
      }
    }
    catch (error) {
      setLoadingAdmin({
        loading: false,
        messageLoading: ''
      })
      setError(!Error)
      if (error instanceof AxiosError) {
        setErrorMessage(error.message)
      }
      console.log(error)
    }
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
          <button 
            type="button" 
            title="Editar"
            onClick={() => eliminarProducto(product.ID_Document)}
            className='px-3 py-2 rounded-xl text-lg bg-rojo text-white w-fit'
          >
            <Image src={Trash} alt="trash" width={30} height={30} />
          </button>
          <button 
            type="button"
            title="Eliminar"
            className='px-3 py-2 rounded-xl text-lg bg-edit text-white w-fit' 
          >
            <Image src={Edit} alt="editar" width={30} height={30} />
          </button>
        </div>
      </td>
    </tr>
  )
}