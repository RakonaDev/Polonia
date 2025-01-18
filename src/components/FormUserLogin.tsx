'use client'
import Image from 'next/image'
import React, { useId, useState } from 'react'
import EyesOpen from '@/assets/components/login/eyes-open.svg'
import EyesClosed from '@/assets/components/login/eyes-closed.svg'
import UserIcon from '@/assets/components/login/user.svg'
import { FieldValues, useForm } from 'react-hook-form'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useRedirect } from '@/zustand/useRedirect'

const initial = { opacity: 0, x: -30 }
const animate = { opacity: 1, x: 0 }
const exit = { opacity: 0, x: -30 }

type FormValues = {
  email: string,
  password: string
}

export default function FormUserLogin() {
  const router = useRouter()
  const { signIn, setActive } = useSignIn()
  const id = useId()
  const { redirectUrl, setRedirectUrl } = useRedirect()

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const [error, setError] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try {
      const result = await signIn?.create({
        identifier: data.email,
        password: data.password,
      })
      if (result?.status == 'complete' && result.createdSessionId) {
        if (setActive) {
          setActive({
            session: result.createdSessionId,
          })
        }
        router.push(redirectUrl)
        setRedirectUrl('/')
      }

    }
    catch (error) {
      setError(true)
      console.log('Credenciales incorrectas')
    }

  })

  return (
    <>
      <motion.form
        key={id}
        layoutId='login'
        onSubmit={onSubmit} className='flex flex-col w-full'>
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ duration: 0.4 }}
          className='flex flex-col mb-7'
        >
          <input

            type="email"
            id="email"
            className='w-full px-5 py-3 border-2 border-gray-400 rounded-md text-black font-bold focus:outline-none'
            placeholder="Usuario"
            {...register('email', {
              required: {
                value: true,
                message: 'Correo Electrónico es requerido',
              },
            })}
          />
          {
            errors.email?.message && (
              <span className="text-white">* {errors.email?.message}</span>
            )
          }
          {
            error && (
              <span className="text-white">* Correo Electrónico incorrecto</span>
            )
          }
        </motion.div>
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ duration: 0.4, delay: 0.1 }}
          className='flex flex-col relative'
        >
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="******"
            className='w-full px-5 py-3 border-2 border-gray-400 rounded-md text-black font-bold focus:outline-none relative'
            {...register('password', {
              required: {
                value: true,
                message: 'Contraseña es requerida',
              },
            })}
          />
          <label
            htmlFor="password"
            className="absolute top-[50%] translate-y-[-50%] right-3 z-10"
          >
            <Image
              src={showPassword ? EyesOpen : EyesClosed}
              alt="eyes"
              width={25}
              height={25}
              className='cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            />
          </label>

        </motion.div>
        <div className="mb-7 text-white">
          {
            errors.password?.message && (
              <span>* {errors.password?.message}</span>
            )
          }
          {
            error && (
              <span>* Contraseña incorrecta</span>
            )
          }
        </div>
        <motion.button
          whileTap="tapped"
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ duration: 0.1 }}
          className="text-base w-fit px-6 py-2 border-2 mx-auto bg-white rounded-md text-rojo font-medium cursor-pointer flex gap-3 items-center hover:bg-gray-300 border-none transition-all duration-500"
          type="submit"
        >
          <Image
            src={UserIcon}
            alt="user"
            width={25}
            height={25}
          />
          Iniciar Sesión
        </motion.button>
      </motion.form>
    </>
  )
}
