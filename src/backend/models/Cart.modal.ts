import { DetailOrder } from "./DetailOrder.modal"

type utilsProduct = {
  found: boolean
  quantityMain: number
}
export interface Cart {
  cart: DetailOrder[]
  total: number
  addToCart: (item: DetailOrder) => void
  removeFromCart: (id: string) => void
  clearFromCart: () => void
  searchFromCart: (id: string) => utilsProduct
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string, quantity: number) => void
  updateQuantity: (id: string, quantity: number) => void
}