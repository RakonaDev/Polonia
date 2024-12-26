import { DetailOrder } from "./DetailOrder.modal"


export interface Cart {
  cart: DetailOrder[]
  addToCart: (item: DetailOrder) => void
  removeFromCart: (id: string) => void
  clearFromCart: () => void
  searchFromCart: (id: string) => boolean
}