interface Image {
  url: string
}

export interface Product {
  uid: string
  name: string
  price: number
  image: Image[]
  description: string
  category: string
  supplier: string
  createdAt: Date
  updatedAt: Date
}