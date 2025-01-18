import { Items } from "mercadopago/dist/clients/commonTypes"
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

export interface OrderDatabase {
  id: string
  email: string
  total?: number
  direccion?: string
  distrito?: string
  ubicacion?: string
  telefono?: string
  items?: Items[]
  createdAt?: string
  status: string
} 

export interface DetailOrderDatabase {
  id: string
  title: string
  quantity: string
  unit_price: number
}