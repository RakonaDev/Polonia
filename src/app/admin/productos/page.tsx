'use client'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import useFormProducto from '@/hook/useFormProducto'
import React from 'react'
import useProducts from '@/hook/useProducts';
import { useFeatures } from '@/zustand/useFeatures';
import { AxiosRequestConfig } from 'axios';
import { ProductosColumn } from '@/components/utils/productos-column';
import { apiUrl } from '@/helper/Global';
import { useFeaturesAdmin } from '@/zustand/useFeaturesAdmin';
import { ProductDatabase } from '@/backend/models/Product.modal';

const axiosOptions: AxiosRequestConfig = {
  method: 'GET'
}

export default function ProductosPage () {
  const { setError, setLoading } = useFeatures()
  const { loadingMain } = useFeaturesAdmin()
  const { products } = useProducts()
  const { handleSubmit, handleChange,handleChangeTextarea, IDProducto, nombreProducto, precioProducto, categoriaProducto, proveedorProducto, stockProducto, descripcionProducto, imagenProducto } = useFormProducto(products)
  console.log(products)
  return (
    <main className="mt-6">
      <h1 className="text-4xl font-bold">Productos</h1>

      <section className='w-full my-10'>
        <Dialog>
          <DialogTrigger className='px-8 py-2 rounded-xl text-lg bg-rojo text-white'>Nuevo</DialogTrigger>
          <DialogContent className='bg-bg-form p-6 rounded-xl'>
            <DialogHeader>
              <DialogTitle className='text-center text-2xl'>Nuevo Producto</DialogTitle>
              <DialogDescription className='text-center text-lg'>
                Cuéntanos que producto vamos a crear ✨😮
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleSubmit} 
              className='max-w-4xl w-full flex flex-col gap-6 items-center'
            >
              <div className='grid grid-cols-inputs gap-6 w-full'>
                <div>
                  <input
                    type="text"
                    placeholder='ID del producto'
                    className='p-3 rounded-2xl'
                    value={IDProducto}
                    onChange={handleChange}
                    name="IDProducto"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Nombre del producto"
                    className='p-3 rounded-2xl'
                    value={nombreProducto}
                    onChange={handleChange}
                    name="nombreProducto"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    placeholder="Precio del producto"
                    className='p-3 rounded-2xl'
                    onChange={handleChange}
                    name="precioProducto"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Categoria del producto"
                    className='p-3 rounded-2xl'
                    value={categoriaProducto}
                    onChange={handleChange}
                    name="categoriaProducto"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Proveedor"
                    className='p-3 rounded-2xl'
                    value={proveedorProducto}
                    onChange={handleChange}
                    name="proveedorProducto"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    min={0}
                    placeholder="Stock"
                    className='p-3 rounded-2xl'
                    onChange={handleChange}
                    name="stockProducto"
                    required
                  />
                </div>
                <div>
                  <input
                    type="file"
                    placeholder="Ingrese sus imagenes (Máximo 3 fotos)" accept="image/png, image/jpeg, image/jpg"
                    className='p-3 rounded-2xl'
                    onChange={handleChange}
                    name="imagenProducto"
                    multiple
                    required
                  />
                </div>
              </div>
              <div className='w-full'>
                <textarea 
                  name="descripcion" 
                  id="descripcion"
                  placeholder="Descripción del producto" 
                  rows={6} 
                  cols={10} 
                  className='w-full p-3 rounded-2xl resize-none' 
                  value={descripcionProducto}
                  onChange={handleChangeTextarea}
                  required
                  ></textarea>
              </div>
              <button 
                type="submit" 
                className={`w-fit px-6 py-2 rounded-xl text-lg ${loadingMain.loading ? 'bg-gray-500' : 'bg-rojo'} duration-500 transition-colors text-white`}
              >
                Crear
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </section>
      <section>
        <table className='w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoria</th>
              <th>Proveedor</th>
              <th>Stock</th>
              <th>Descripcion</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              products?.map((product: ProductDatabase) => (
                <ProductosColumn
                  key={product.ID_Document}
                  ID_Document={product.ID_Document}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  supplier={product.supplier}
                  stock={product.stock}
                  description={product.description}
                  url_images={product.url_images}
                />
              ))
            }
          </tbody>
        </table>
      </section>
    </main>
  )
}
