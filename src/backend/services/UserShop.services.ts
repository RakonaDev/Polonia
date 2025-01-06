import { signInWithEmailAndPassword, UserCredential, signOut } from 'firebase/auth'
import { authFireBase } from '../firebase'
import { addDoc, FirestoreError } from 'firebase/firestore'
import { userCollection } from '@/backend/collections/user.collection'
import { UserShop } from '../models/Users.modal'
import { createHash } from 'crypto'
import { EmailAddress } from '@clerk/nextjs/server'

export async function signUpUser (email: string | EmailAddress | null, password: string, username: string | null) {

  try {
    const createdAt = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    const updatedAt = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    const role = 'user'
    password = createHash('sha256').update(password).digest('hex')

    const user:UserShop = {
      email,
      password,
      username,
      role,
      createdAt,
      updatedAt
    }
    const docRef = await addDoc(userCollection, user)
    if (docRef) {
      return docRef
    }
    else {
      throw new Error()
    }
  }
  catch (error) {
    if (error instanceof FirestoreError) {
      console.log(error.message)
    }
  } 
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