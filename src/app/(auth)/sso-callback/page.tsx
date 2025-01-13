'use client'
import { useRedirect } from "@/zustand/useRedirect"
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

export default function SSOCallbackPage() {
  const { redirectUrl } = useRedirect()

  return (
    <AuthenticateWithRedirectCallback 
      redirectUrl={redirectUrl}
    />
  )
}