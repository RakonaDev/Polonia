import { DetailOrder } from "./DetailOrder.modal"
import { UserShop } from "./Users.modal"

export interface Order {
  id: string
  details: DetailOrder[]
  userOrdered: Pick<UserShop, 'id' | 'username' | 'email'>
  total: number
  status: string
  createdAt: Date
  updatedAt: Date
}