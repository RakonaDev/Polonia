import Image from 'next/image'
import React from 'react'
import Carro from '@/assets/carro.png'

export default function ContactoPage() {
  return (
    <>
      <section className='bg-contacto w-full'>
        <main className='max-w-[90rem] w-full mx-auto flex px-4'>
          <div className='w-[50%]'>
            <Image
              src={Carro}
              alt="carro"
            />
          </div>
          <div className='w-[50%]'>
            <h1 className='text-5xl font-bold text-rojo mt-10'>Contacto</h1>

            <form action="">
              <div className='w-full mt-10 flex gap-8 mb-5'>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder='Nombres'
                  required
                  className='w-[50%] py-3 px-6 rounded-xl focus:outline-none font-bold bg-white/70 placeholder:text-black'
                />
                <input
                  type="text"
                  name="apellido"
                  id="apellido"
                  placeholder='Apellidos'
                  required
                  className='w-[50%] py-3 px-6 rounded-xl focus:outline-none font-bold bg-white/70 placeholder:text-black'
                />
              </div>

              <div className='w-full flex gap-8 mb-5'>
                <input
                  type="tel"
                  name="telefono"
                  id="telefono"
                  placeholder='Telefono'
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                  className='w-[50%] py-3 px-6 rounded-xl focus:outline-none font-bold bg-white/70 placeholder:text-black'
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder='E-mail'
                  required
                  className='w-[50%] py-3 px-6 rounded-xl focus:outline-none font-bold bg-white/70 placeholder:text-black'
                />
              </div>
              <input 
                type="text" 
                name="nombreEmpresa" 
                id="nombreEmpresa" 
                placeholder='Nombre Empresa' 
                required 
                className='w-full py-2 px-6 rounded-xl focus:outline-none font-bold bg-white/70 placeholder:text-black mb-5' 
              />
              <textarea name="mensaje" id="mensaje" cols={30} rows={7} placeholder='Mensaje' required className='w-full py-2 px-6 rounded-xl focus:outline-none font-bold bg-white/70 placeholder:text-black mb-5 resize-none'></textarea>
              <div className='flex justify-end gap-4'>
                <a href='#' target='_blank' className='bg-verde px-3 py-3 rounded-lg text-white'>Enviar Mensaje al Whatsapp</a>
                <button type="submit" className='bg-rojo px-6 py-3 text-white rounded-lg'>Enviar Mensaje</button>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  )
}
