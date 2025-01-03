import { DetailOrder } from "./DetailOrder.modal"

type utilsProduct = {
  found: boolean
  quantityMain: number
}
export interface Cart {
  cart: DetailOrder[]
  addToCart: (item: DetailOrder) => void
  removeFromCart: (id: string) => void
  clearFromCart: () => void
  searchFromCart: (id: string) => utilsProduct
}