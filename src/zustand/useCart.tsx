import { Cart } from "@/backend/models/Cart.modal";
import { DetailOrder } from "@/backend/models/DetailOrder.modal";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useCart = create<Cart>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item: DetailOrder) => {
        set((state) => ({
          cart: [...state.cart, item],
        }))
      },
      removeFromCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }))
      },
      clearFromCart: () => {
        set(() => ({
          cart: [],
        }))
      },
      searchFromCart(id) {
        let found = false
        set((state) => {
          state.cart.map((item) => {
            if (item.id === id) {
              found = true
            }
          })
          return { cart: state.cart }
        })
        return found
      },
    }),
    {
      name: "cart"
    }
  )
)