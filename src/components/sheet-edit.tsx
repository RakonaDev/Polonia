import React, { useState } from 'react'
import Edit from '@/assets/icons/edit.svg'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import { ProductDatabase } from '@/backend/models/Product.modal'
import { CldImage } from 'next-cloudinary'
import axios from 'axios'
import { apiUrl } from '@/helper/Global'
import { useFeaturesAdmin } from '@/zustand/useFeaturesAdmin'
import useProducts from '@/hook/useProducts'

export default function SheetEdit({ product }: { product: ProductDatabase }) {
  const { products } = useProducts()
  const { setLoading, setError, setSuccess } = useFeaturesAdmin()
  const [id_producto, setId_producto] = useState<string>(product.id)
  const [nombreEditar, setNombreEditar] = useState<string>(product.name.toUpperCase())
  const [precioEditar, setPrecioEditar] = useState<string>(product.price.toString())
  const [categoriaEditar, setCategoriaEditar] = useState<string | undefined>(product.category?.toUpperCase())
  const [proveedorEditar, setProveedorEditar] = useState<string>(product.supplier.toUpperCase())
  const [stockEditar, setStockEditar] = useState<number | undefined>(product.stock)
  const [descripcionEditar, setDescripcionEditar] = useState<string | undefined>(product.description)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Validar que el valor sea un número decimal o vacío
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setPrecioEditar(inputValue); // Actualizamos el estado solo si es válido
    }
  };

  const handleBlur = () => {
    // Si el usuario deja el campo vacío o con ".", asignar 0 por defecto
    if (precioEditar === '' || precioEditar === '.') {
      setPrecioEditar('0');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append('ID_Document', product.ID_Document as string);
    data.append('id', id_producto);
    data.append('nombre', nombreEditar);
    data.append('precio', precioEditar);
    data.append('categoria', categoriaEditar as string);
    data.append('supplier', proveedorEditar);
    data.append('stock', String(stockEditar));
    data.append('description', descripcionEditar as string);
    setLoading({
      loading: true,
      messageLoading: 'Actualizando producto...'
    })
    try {
      await axios.patch(apiUrl + 'private/product', data, {
        method: 'PATCH'
      }).finally(() => {
        setLoading({
          loading: false,
          messageLoading: ''
        })
      });
      setSuccess({
        success: true,
        messageSuccess: 'Producto actualizado exitosamente'
      })
      setInterval(() => {
        setSuccess({
          success: false,
          messageSuccess: ''
        })
      }, 5000)
      setNombreEditar('')
      setPrecioEditar('')
      setCategoriaEditar('')
      setProveedorEditar('')
      setStockEditar(0)
      setDescripcionEditar('')
      products?.map((product) => {
        if (product.id === id_producto) {
          product.name = nombreEditar
          product.price = Number(precioEditar)
          product.category = categoriaEditar
          product.supplier = proveedorEditar
          product.stock = stockEditar
          product.description = descripcionEditar
          product.updatedAt = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
        }
      })
    }
    catch (error) {
      console.log(error);
      setError({
        error: true,
        messageError: 'Error al actualizar producto'
      })
      setLoading({
        loading: false,
        messageLoading: ''
      })
      setInterval(() => {
        setError({
          error: false,
          messageError: ''
        })
      }, 5000)

    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          title="Editar"
          className='px-3 py-2 rounded-xl text-lg bg-edit text-white w-fit'
        >
          <Image src={Edit} alt="editar" width={30} height={30} />
        </button>
      </SheetTrigger>
      <SheetContent className='bg-white'>
        <SheetHeader>
          <SheetTitle className="md:text-3xl text-xl font-bold my-8">
            Editar Producto
          </SheetTitle>
          <SheetDescription className="text-base md:text-lg mb-10">
            Cometiste un Error o un cambio de Stock? No te preocupes, puedes
            editar el producto en cualquier momento.
          </SheetDescription>
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <label htmlFor="id_producto" className='font-bold'>ID del producto: </label>
              <input type="text" id='ID_Document' className='p-3 rounded-2xl bg-gray-200' placeholder="ID del producto" value={id_producto} onChange={(e) => setId_producto(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="nombreEditar" className='font-bold'>Nombre del producto: </label>
              <input type="text" id='nombreEditar' value={nombreEditar.toUpperCase()} onChange={(e) => setNombreEditar(e.target.value)} className='p-3 rounded-2xl bg-gray-200' placeholder="Nombre del producto" />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="precioEditar" className='font-bold'>Precio: </label>
              <input type="text" value={precioEditar} onChange={(e) => handleChange(e)} onBlur={handleBlur} step={0.01} className='p-3 rounded-2xl bg-gray-200' placeholder="Precio del producto" />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="categoriaEditar" className='font-bold'>Categoria: </label>
            <input type="text" className='p-3 rounded-2xl bg-gray-200' placeholder="Categoria del producto" value={categoriaEditar?.toUpperCase()} onChange={(e) => setCategoriaEditar(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="" className='font-bold'>Proveedor</label>
              <input type="text" className='p-3 rounded-2xl bg-gray-200' placeholder="Proveedor" value={proveedorEditar.toUpperCase()} onChange={(e) => setProveedorEditar(e.target.value)} />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="" className='font-bold'>Stock</label>
            <input type="number" min={0} step={0.01} className='p-3 rounded-2xl bg-gray-200' placeholder="Stock" value={stockEditar} onChange={(e) => setStockEditar(e.target.valueAsNumber)} />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="" className='font-bold'>Descripción</label>
            <textarea name="description" id="description" placeholder="Descripción del producto" rows={6} cols={10} className='w-full p-3 rounded-2xl resize-none bg-gray-200' value={descripcionEditar?.toUpperCase()} onChange={(e) => setDescripcionEditar(e.target.value)}></textarea>
            </div>
            <input type="submit" value="Guardar" className='px-3 py-2 rounded-xl text-lg bg-rojo text-white w-fit cursor-pointer hover:bg-rojo-login' />
            {/*<h1>Sus fotos registradas</h1>
            <div className='flex gap-5 flex-wrap items-center'>
              {
                product.url_images.map((imagen, index) => {
                  return (
                    <div key={index} className='cursor-pointer'>
                      <label htmlFor={`imagen${index}`}>
                        <img src={imagen.secure_url ? imagen.secure_url : ''} alt="web" width={100} height={100} />
                      </label>
                      <input type="file" hidden id={`imagen${index}`} placeholder="Ingrese sus imagenes (Máximo 3 fotos)" accept="image/png, image/jpeg, image/jpg" className='p-3 rounded-2xl bg-gray-100' onChange={(e) => console.log(e.target.files)} />
                    </div>
                  )
                })
              }
            </div>*/}
          </form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
