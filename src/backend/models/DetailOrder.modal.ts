import { StaticImageData } from "next/image"

export interface DetailOrder {
  id: string
  nombre: string
  proveedor: string
  precio: string
  imagen: string | StaticImageData
}