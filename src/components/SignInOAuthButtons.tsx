'use client'
import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs"
import GoogleButton from "@/assets/icons/google.svg"
import Image from "next/image"

export const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn()
  const { signUp } = useSignUp()

  console.log(isLoaded)

  if (!isLoaded) {
    return <>
      
    </>
  }
  else {
    const signInWithGoogle = () => {
      signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
      
      
    }
    const signUpwithGoogle = () => {
      signUp?.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
        continueSignUp: true,
      })
    }

    return (
      <>
        <button
          type="button"
          onClick={signUpwithGoogle}
          title="Google Auth"
          className="p-2 bg-white rounded-xl ring-4 ring-black mb-5 w-fit flex gap-4 items-center font-medium z-50"
        >
          <Image
            src={GoogleButton}
            width={30}
            alt="google"
            height={30}
          />
          Inicia Sesión con Google
        </button>
      </>
    )
  }
}