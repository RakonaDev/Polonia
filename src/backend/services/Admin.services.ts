import { addDoc, getDocs, query, QuerySnapshot, where } from "firebase/firestore"
import bcrypt from "bcrypt"
import { userCollection } from "../collections/user.collection"

type UserLogin = {
  id: string
  username: string
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
  status: string
}

export async function signInAdmin( email: string, password: string ) {
  const adminSearchQuery = query(
    userCollection,
    where("email", "==", email),
  )
  try{
    const userLoged: UserLogin = {
      id: "",
      email: "",
      username: "",
      password: "",
      role: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: ""
    }
    const user: QuerySnapshot = await getDocs(adminSearchQuery)
    if (user.empty) {
      return null
    }
    user.forEach((doc) => {
      userLoged.id = doc.id
      userLoged.username = doc.data().username
      userLoged.email = doc.data().email
      userLoged.password = doc.data().passwordHash
      userLoged.role = doc.data().role
      userLoged.createdAt = doc.data().createdAt
    })

    const isCorrectPassword = await bcrypt.compare(password, userLoged.password)
    if (!isCorrectPassword) {
      return null
    }
    return userLoged
  }
  catch (error) {
    console.log(error)
    console.log("No se encontro el usuario")
    return null
  }
}

export async function signUpAdmin (email: string, password: string) {
  const username = "Administrador" 
  const role = "admin"
  const passwordHash = await bcrypt.hash(password, 10)
  const user = {
    email,
    passwordHash,
    role,
    username,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  try {
    const docRef = await addDoc(userCollection, user)
    return docRef
  }
  catch (error) {
    console.log(error)
    throw new Error()
  }
}