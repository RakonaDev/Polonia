'use client'
import { ImageUrl } from '@/backend/models/Product.modal'
import { CldImage } from 'next-cloudinary'
import React, { useState } from 'react'

export default function ListImagesProduct({ imagenes }: { imagenes?: ImageUrl[] }) {
  const [publicIDSelected, setPublicIDSelected] = useState<string>(imagenes == undefined ? "" : imagenes[0]?.public_id)
  if (!imagenes) return <div>No hay imagenes</div>
  return (
    <main className='flex gap-5 w-full'>
      <ul>
        {imagenes.map((imagen) => (
          <li key={imagen.public_id}>
            <button
              title='boton'
              onClick={() => setPublicIDSelected(imagen.public_id)}
              className="w-full min-h-28 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center"
            >
              <CldImage
                src={imagen.public_id}
                quality={100}
                width={100}
                height={100}
                alt="Producto"
              />
            </button>
          </li>
        ))}
      </ul>
      <div className='border-2 w-full min-h-[500px] border-gray-300 rounded-lg flex justify-center items-center'>
        <CldImage
          src={publicIDSelected}
          quality={100}
          width={450}
          height={450}
          alt="Producto"
        />
      </div>
    </main>
  )
}
