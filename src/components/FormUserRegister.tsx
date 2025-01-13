
import { useSignUp } from '@clerk/clerk-react'
import Image from 'next/image';
import React from 'react'
import { useForm } from 'react-hook-form';
import EyesOpen from '@/assets/components/login/eyes-open.svg'
import EyesClosed from '@/assets/components/login/eyes-closed.svg'
import UserIcon from '@/assets/components/login/user.svg'
import { motion } from 'framer-motion'
import { signUpUser } from '@/backend/services/UserShop.services';
import { useRouter } from 'next/navigation';
import OtpInput from "react-otp-input";
import { set } from 'zod';
import { useRedirect } from '@/zustand/useRedirect';

type FormValues = {
  name: string,
  email: string,
  password: string
  confirm_password: string
}

type RegisterValues = {
  username: string,
  email: string,
  password: string
}

const initial = { opacity: 0, x: -30 }
const animate = { opacity: 1, x: 0 }
const exit = { opacity: 0, x: -30 }

export default function FormUserRegister() {
  const router = useRouter()
  const { redirectUrl, setRedirectUrl } = useRedirect()

  const [error, setError] = React.useState<boolean>(false)
  const [mensajeError, setMensajeError] = React.useState<string>('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [verifying, setVerifying] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [data, setData] = React.useState<RegisterValues>({
    username: '',
    email: '',
    password: '',
  })

  const { signUp, setActive, isLoaded } = useSignUp()

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
  const password = watch('password');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return

    try {

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })


      if (completeSignUp.status === 'complete') {

        const userId = await signUpUser(data.email, data.password, data.username)
        if (userId) {
          await setActive({ session: completeSignUp.createdSessionId })
          router.push(redirectUrl)
          setRedirectUrl('/')
        }

      } else {
        setError(true)
        setMensajeError('Código de Verificación incorrecto')
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err) {
      setError(true)
      setMensajeError('Código de Verificación incorrecto')
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  const submitRegister = handleSubmit(async (data: FormValues) => {
    if (!isLoaded) return

    try {
      const result = await signUp?.create({
        emailAddress: data.email,
        password: data.password,
        username: data.name,
      })
      setData({
        username: data.name,
        email: data.email,
        password: data.password,
      })
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      setVerifying(true)
    }
    catch (error) {
      setError(true)
    }
  })

  if (verifying) {
    return (
      <motion.div
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{ duration: 0.4 }}
      >
        <h1 className='text-2xl font-bold text-white text-center'>Revise su correo electrónico</h1>
        <form onSubmit={handleVerify} className='mt-7 w-full flex flex-col items-center'>
          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="code" className='text-white font-medium'>Ingrese su codigo de Verifación: </label>
            <OtpInput
              value={code}
              onChange={setCode}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              renderSeparator={(props) => <span className='mx-2 text-white'> o </span>}
              inputStyle={{
                width: "60px",
                height: "60px",
                fontSize: "24px",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}

            />
            {
              error && (
                <span className="text-white">* {mensajeError}</span>
              )
            }
          </div>
          <button type="submit" className='mt-5 w-fit  bg-gradient-to-r from-white to-slate-300 py-2 px-8 text-black text-lg rounded-lg'>Verificar Código</button>
        </form>
      </motion.div>
    )
  }

  return (
    <>
      <motion.form layoutId='register' className='flex flex-col w-full' onSubmit={submitRegister}>
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ duration: 0.4 }}
          className='flex flex-col mb-7'
        >
          <input
            type="text"
            id="user"
            className='w-full px-5 py-3 border-2 border-gray-400 rounded-md text-black font-bold focus:outline-none'
            placeholder="Usuario"
            {...register('name', {
              required: {
                value: true,
                message: 'El usuario es requerido',
              },
            })}
          />
          {
            errors.name?.message && (
              <span className="text-white">* {errors.name?.message}</span>
            )
          }
        </motion.div>
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ duration: 0.4, delay: 0.1 }}
          className='flex flex-col mb-7'
        >
          <input
            type="email"
            id="email"
            className='w-full px-5 py-3 border-2 border-gray-400 rounded-md text-black font-bold focus:outline-none'
            placeholder="Correo Electrónico"
            {...register('email', {
              required: {
                value: true,
                message: 'El Correo Electrónico es requerido',
              },
            })}
          />
          {
            errors.email?.message && (
              <span className="text-white">* {errors.email?.message}</span>
            )
          }
        </motion.div>
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ duration: 0.4, delay: 0.2 }}
          className='flex flex-col relative'
        >
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className='w-full px-5 py-3 border-2 border-gray-400 rounded-md text-black font-bold focus:outline-none'
            placeholder="*****************"
            {...register('password', {
              required: {
                value: true,
                message: '* Contraseña es requerida',
              },
              minLength: {
                value: 7,
                message: '* La contraseña debe tener al menos 7 caracteres',
              },
              maxLength: {
                value: 25,
                message: '* Contraseña debe tener menos 25 caracteres',
              }
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
        <div className='mb-7'>
          {
            errors.password?.message && (
              <span className="text-white">* {errors.password?.message}</span>
            )
          }
        </div>
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ duration: 0.4, delay: 0.3 }}
          className='flex flex-col relative'
        >
          <input
            type={showPassword ? "text" : "password"}
            id="confirm_password"
            className='w-full px-5 py-3 border-2 border-gray-400 rounded-md text-black font-bold focus:outline-none'
            placeholder="*****************"
            {...register('confirm_password', {
              required: {
                value: true,
                message: '* La confirmacion de contraseña es requerida',
              },
              minLength: {
                value: 7,
                message: '* La contraseña debe tener al menos 7 caracteres',
              },
              validate: (value) => value === password || 'Las contraseñas no coinciden',
            })}
          />
          <label
            htmlFor="confirm_password"
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
        <div className='mb-7'>
          {
            errors.confirm_password?.message && (
              <span className="text-white">* {errors.confirm_password?.message}</span>
            )
          }
        </div>
        {/* CAPTCHA Widget */}
        <div id="clerk-captcha"></div>
        <motion.button
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
          Registrarme
        </motion.button>
      </motion.form>
    </>
  )
}