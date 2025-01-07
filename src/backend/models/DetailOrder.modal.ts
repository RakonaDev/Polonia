import { Product } from "./Product.modal"

export interface DetailOrder {
  id: string
  product: Pick<Product, 'name' | 'id' | 'price' | 'supplier'>
  url_product?: string
  quantity: number
  subTotal: number
}