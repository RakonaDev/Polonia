'use client'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { useFeatures } from '@/zustand/useFeatures'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
import Polonia from '@/assets/Polonia.svg'
import { AnimatePresence } from 'framer-motion'
import { useFeaturesAdmin } from '@/zustand/useFeaturesAdmin'
import Loading from '@/assets/icons/loading.svg'
import useProducts from '@/hook/useProducts'
import Success from '@/assets/icons/success.svg'
import Error from '@/assets/icons/error.svg'

const Routes = [
  '/',
  '/nosotros',
  '/contacto',
  '/pago',
  '/producto',
]

export default function HeaderLayout() {
  const { loadingMain, successMain, errorMain } = useFeaturesAdmin()
  const pathname = usePathname()
  const { loading } = useFeatures()
  const { isLoading: LoadingProducts } = useProducts()
  return (
    <>
      {loading || LoadingProducts ? (
        <div className='w-full h-screen fixed top-0 bg-[#212121] z-[10000] flex flex-col justify-center items-center gap-6'>
          <p className='flex gap-5 items-center'>
            <Image src={Polonia} alt='Polonia' width={80} height={80} priority />
            <span className='text-rojo font-bold text-xl'>Cargando Datos...</span>
          </p>
          <p className='relative'><span className="loader"></span></p>
        </div>
      ) : null}
      <AnimatePresence mode='popLayout'>
        {
          loadingMain.loading ?
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex gap-5 items-center z-[10000] bg-blue-400 max-w-xl w-full rounded-2xl p-4 fixed top-7 left-1/2 -translate-x-1/2 text-black'
            >
              <div>
                <Image src={Loading} alt='Loading' width={50} height={50} priority className='animate-spin' />
              </div>
              <div>
                <h1 className='font-bold text-xl'>
                  Está cargando tu petición al Servidor
                </h1>
                {loadingMain.messageLoading}
              </div>
            </motion.div>
            :
            null
        }
        {
          successMain.success ?
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex gap-5 items-center z-[10000] bg-green-400 max-w-xl w-full rounded-2xl p-4 fixed top-7 left-1/2 -translate-x-1/2 text-black'
            >
              <div>
                <Image src={Success} alt='Success' width={50} height={50} priority />
              </div>
              <div>
                <h1 className='font-bold text-xl'>
                  Tu petición ha sido exitosa
                </h1>
                {successMain.messageSuccess}
              </div>
            </motion.div>
            :
            null
        }
        {
          errorMain.error ?
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='flex gap-5 items-center z-[10000] bg-red-400 max-w-xl w-full rounded-2xl p-4 fixed top-7 left-1/2 -translate-x-1/2 text-black'
            >
              <div>
                <Image src={Error} alt='Error' width={50} height={50} priority />
              </div>
              <div>
                <h1 className='font-bold text-xl'>
                  Error
                </h1>
                {errorMain.messageError}
              </div>
            </motion.div>
            :
            null
        }
      </AnimatePresence>
      {Routes.includes(pathname) || pathname.includes('/producto/') ? <Header /> : null}
    </>
  )
}
