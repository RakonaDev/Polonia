import { StaticImageData } from "next/image"

interface Image {
  url: StaticImageData
}

export interface Product {
  id: string
  name: string
  price: number
  image: Image[]
  description?: string
  category?: string
  supplier: string
  createdAt?: Date
  updatedAt?: Date
}