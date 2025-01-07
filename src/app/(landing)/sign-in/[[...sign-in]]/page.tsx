'use client'
import Image from 'next/image'
import React, { useId } from 'react'
import backgroundLogin from "@/assets/components/background.jpg"
import FormUserLogin from '@/components/FormUserLogin'
import FormUserRegister from '@/components/FormUserRegister'
import { AnimatePresence, motion } from 'framer-motion'

export default function LoginPage() {

  const [isLogin, setIsLogin] = React.useState(true)
  

  const handlerForms = () => setIsLogin(!isLogin)

  return (
    <>
      <div>
        <main className="w-full h-screen relative overflow-hidden">
          <Image
            src={backgroundLogin}
            alt="backgroundLogin"
            className="w-full h-screen object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute top-0 right-0 w-[50vw] max-w-[800px] h-screen bg-rojo-login rounded-tl-[200px] rounded-br-[200px] flex justify-center flex-col">

            <section className="w-[55%] mx-auto">
              <div className="mb-10 flex gap-5">
                <button
                  type='button'
                  className={`font-bold border-b-4 ${isLogin ? 'border-white' : 'border-transparent'} w-fit text-white transition-all duration-700`}
                  onClick={handlerForms}
                >
                  SIGN IN
                </button>
                <button
                  type='button'
                  className={`font-bold border-b-4 ${isLogin ? 'border-transparent' : 'border-white'} w-fit text-white transition-all duration-700`}
                  onClick={handlerForms}
                >
                  SIGN UP
                </button>
              </div>
              <div className={` ${isLogin ? 'min-h-[201px]' : 'h-min-[361px]'} transition-all duration-700 w-full`}>
                <AnimatePresence>

                  {isLogin ? <FormUserLogin /> : <FormUserRegister />}

                </AnimatePresence>
              </div>

            </section>
            {
              isLogin && (
                <footer className="w-[55%] mx-auto mt-10">
                  <p className="text-white">Olvidaste tu contraseña?</p>
                </footer>
              )
            }
          </div>
        </main>
      </div>
    </>
  )
}
