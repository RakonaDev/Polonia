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
  stock?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface ProductDatabase {
  ID_Document?: string
  id: string
  name: string
  price: number
  url_images: ImageUrl[]
  description?: string
  category?: string
  supplier: string
  stock?: number
  createdAt?: string
  updatedAt?: string
}

interface ImageUrl {
  public_id: string
  secure_url: string
}

export interface StatusProduct {
  isAdded: boolean
  setIsAdded: (isAdded: boolean) => void
}