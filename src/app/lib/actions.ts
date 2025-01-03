'use server'
import { signIn } from "@/auth"
import { ADMIN_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

/*
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      
      redirectTo: ADMIN_LOGIN_REDIRECT
    })
  }
  catch ()
}
  */