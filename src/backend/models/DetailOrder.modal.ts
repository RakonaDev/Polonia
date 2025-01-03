import { StaticImageData } from "next/image"
import { Product } from "./Product.modal"

export interface DetailOrder {
  id: string
  product: Pick<Product, 'name' | 'uid' | 'price'>
  quantity: number
  subTotal: string
  image: string | StaticImageData
}