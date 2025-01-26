import React from 'react'
import LogoFooter from '@/assets/icons/logo-footer.svg'
import Image from 'next/image'

export default function Footer() {

  return (
    <footer className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
      <section className='flex mb-10'>
        <div className='contacto-container '>
          <h1 className='text-white font-bold text-4xl'>CONTACTO</h1>
          <ul className='my-10 text-white flex flex-col gap-4'>
            <li>Tel : +51 967 064 275</li>
            <li>Email : <a href='mailto:info@poloniacar.com'>info@poloniacar.com</a></li>
            <li>www.poloniacar.com</li>
          </ul>
          <Image src={LogoFooter} alt='Logo' width={200} height={200} priority />
        </div>
      </section>
      <p className='text-white'>Diseñado por <a href="https://www.raikicor.com/" rel='noopener' target='_blank' className='hover:text-rojo'>Raiki</a> | By POLONIA. 2023 © Reservados todos los derechos.</p>
    </footer>
  )
}
