import { signInWithEmailAndPassword, UserCredential, createUserWithEmailAndPassword, AuthError, signOut } from 'firebase/auth'
import { authFireBase } from '../firebase'

export async function signUp (email: string, password: string) {

  return createUserWithEmailAndPassword(authFireBase, email, password)
    .then((userCredential: UserCredential) => {
      return userCredential
    })
    .catch((error: AuthError) => {
      console.log(error.message)
      throw new Error()
    })
}

export async function signIn (email: string, password: string) {
  return signInWithEmailAndPassword(authFireBase, email, password)
    .then((userCredential: UserCredential) => {
      return userCredential
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export async function authUser () {
  
  const user = authFireBase.currentUser
  if (user) {
    return user
  }
  else {
    throw new Error()
  }
}

export async function logout () {
  try {
    await signOut(authFireBase)
  }
  catch (error) {
    console.log(error)
    throw new Error()
  }
}