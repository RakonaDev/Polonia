import { StaticImageData } from "next/image"
import { Product } from "./Product.modal"

export interface DetailOrder {
  id: string
  title: string,
  unit_price: number,
  supplier: string,
  url: StaticImageData
  quantity: number
  currency_id: string
  subTotal: number
}
