'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import EyesOpen from '@/assets/components/login/eyes-open.svg'
import EyesClosed from '@/assets/components/login/eyes-closed.svg'
import UserIcon from '@/assets/components/login/user.svg'
import { useRouter } from "next/navigation";

type FormValues = {
  email: string,
  password: string
}

export default function FormLogin() {
  const router = useRouter()

  const[showPassword, setShowPassword] = useState(false)
  const[error, setError] = useState<boolean>(false)
  const { register, handleSubmit, formState: {errors} } = useForm<FormValues>();
  const onSubmit = handleSubmit(async (data: FieldValues) => {
    try{
      const responseAuth = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })
      
      if (!responseAuth?.ok || responseAuth === undefined) {
        setError(true)
        console.log("Error en la autenticación")
        throw new Error('Correo Electrónico o contraseña incorrectos')
      }
      router.push('/admin/dashboard')
    }
    catch(error) {
      console.log(error)
    }
  })

  return (
    <>
      <form onSubmit={onSubmit} className='flex flex-col gap-10 w-full'>
        <div className='flex flex-col'>
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
              <span>* {errors.email?.message}</span>
            )
          }
          {
            error && (
              <span>* Correo Electrónico o contraseña incorrectos</span>
            )
          }
        </div>
        <div className='flex flex-col relative'>
          <label 
            htmlFor="password"
            className="absolute top-[50%] translate-y-[-50%] right-3"
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
          <input
            type={showPassword ? "text": "password"}
            id="password"
            placeholder="******"
            className='w-full px-5 py-3 border-2 rounded-md text-black font-bold focus:outline-none'
            {...register('password', {
              required: {
                value: true,
                message: 'Contraseña es requerida',
              },
            })}
          />
          {
            errors.password?.message && (
              <span>* {errors.password?.message}</span>
            )
          }
        </div>
        
        <button 
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
        </button>
      </form>
    </>
  )
}
