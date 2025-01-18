"use client"
import { useCart } from '@/zustand/useCart'
import { useRouter } from 'next/navigation'
import React from 'react'
import LogoVisa from '@/assets/icons/logo-visa.svg'
import LogoMaster from '@/assets/icons/logo-master.svg'
import LogoMaestro from '@/assets/icons/logo-maestro.svg'
import LogoYape from '@/assets/icons/logo-yape.png'
import Image from 'next/image'
import { useUser } from '@clerk/nextjs'
import axios, { AxiosError } from 'axios'

export default function PagoPage() {
  const { cart, total } = useCart()
  const { user } = useUser()
  
  const [nombre, setNombre] = React.useState<string>('')
  const [apellido, setApellido] = React.useState<string>('')
  const [direccion, setDireccion] = React.useState<string>('')
  const [distrito, setDistrito] = React.useState<string>('')
  const [ubicacion, setUbicacion] = React.useState<string>('')
  const [telefono, setTelefono] = React.useState<string>('')
  const [correo, setCorreo] = React.useState<string>(user?.primaryEmailAddress?.emailAddress || '')
  const router = useRouter()

  React.useEffect(() => {
    if (cart.length === 0) {
      router.push('/')
    }
  }, [cart.length])

  const submitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/public/order', {
        nombre,
        apellido,
        direccion,
        distrito,
        ubicacion,
        telefono,
        correo,
        cart
      })
      window.location = response.data.init_point
    }
    catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.status)
      }
    }
    
  }

  return (
    <div>
      <form 
        onSubmit={submitOrder}
        className="container mx-auto px-4 mt-10 flex gap-6"
      >
        <div className='w-[60%]'>
          <main className='w-full p-10 bg-gray-100 rounded-3xl shadow-sm shadow-gray-500 flex flex-col gap-4'>
            <h1 className='font-bold text-xl'>DIRECCIÓN DE ENVIO</h1>
            <section className='mt-5 w-full flex gap-5 '>
              <input
                type="text"
                placeholder='Nombre'
                className='bg-gray-300 w-1/2 p-4 placeholder:text-gray-700'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder='Apellido'
                className='bg-gray-300 w-1/2 p-4 placeholder:text-gray-700'
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </section>
            <input
              type="text"
              placeholder='Ubicación'
              className='bg-gray-300 w-full p-4 placeholder:text-gray-700'
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
            />
            <section className='w-full flex gap-5 '>
              <input
                type="text"
                placeholder='Dirección'
                className='bg-gray-300 w-1/2 p-4 placeholder:text-gray-700'
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder='Distrito'
                className='bg-gray-300 w-1/2 p-4 placeholder:text-gray-700'
                value={distrito}
                onChange={(e) => setDistrito(e.target.value)}
                required
              />
            </section>
            <section className='w-full flex gap-5 '>
              <input
                type="text"
                placeholder='Teléfono'
                className='bg-gray-300 w-1/2 p-4 placeholder:text-gray-700'
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder='Correo'
                className='bg-gray-300 w-1/2 p-4 placeholder:text-gray-700'
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </section>
            <p className='mt-5 text-green-500'>Seguridad y Privacidad</p>
            <p>Mantenemos medidas físicas, técnicas y administrativas estándar de la industria para proteger su información personal.</p>
          </main>
        </div>
        <aside className='w-[40%]'>
          <div className='w-full px-8 py-3 bg-gray-100 rounded-xl'>
            <h1 className='font-bold text-xl'>RESUMEN DEL PEDIDO</h1>
            <footer className='flex justify-start font-medium mt-5'>
              <p>Precio Estimado:     S/. {total}</p>
            </footer>
          </div>
          <button
            type="submit"
            className='w-full mt-5 bg-rojo text-white py-4 text-xl font-medium duration-500 transition-colors hover:bg-red-700'
          >
            PROCEDER CON EL PAGO
          </button>
          <footer className='mt-5 bg-gray-100 rounded-xl px-8 py-3'>
            <p className='text-green-600'>Seguridad de Pago</p>
            <p>POLONIA se compromete a proteger su información de pago y solo comparte la información de su tarjeta de crédito con nuestros proveedores de servicios de pago que acordaron proteger su información.</p>
            <article className='flex gap-5 my-5'>
              <Image 
                src={LogoVisa}
                alt='logo visa'
                width={60}
                height={60}
              />
              <Image 
                src={LogoMaestro}
                alt='logo visa'
                width={60}
                height={60}
              />
              <Image 
                src={LogoMaster}
                alt='logo visa'
                width={60}
                height={60}
              />
              <Image 
                src={LogoYape}
                alt='logo visa'
                width={70}
                height={60}
              />
            </article>
            <p className='text-green-600'>Seguridad y Privacidad</p>
            <p>El socio procesador de pagos de POLONIA almacena los datos de su tarjeta de crédito mediante el uso de tecnología de cifrado de datos estándar de la industria. POLONIA no almacenará la información real de su tarjeta de crédito.</p>
          </footer>
        </aside>
      </form>
    </div>
  )
}
