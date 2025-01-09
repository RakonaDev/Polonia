import { StaticImageData } from "next/image"
import { Product } from "./Product.modal"
import { StaticImport } from "next/dist/shared/lib/get-img-props"

export interface DetailOrder {
  id: string
  product: Pick<Product, 'name' | 'id' | 'price' | 'supplier'>
  url: string
  quantity: number
  subTotal: number
}
