import { Cart } from "@/backend/models/Cart.modal";
import { DetailOrder } from "@/backend/models/DetailOrder.modal";
import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useCart = create<Cart>()(
  persist(
    (set) => ({
      cart: [],
      total: 0,
      addToCart: (item: DetailOrder) => {
        set((state) => {
          const newCart = state.cart.concat(item)
          const newTotal = newCart.reduce((acc, item) => acc + item.subTotal, 0)
          return { cart: newCart, total: newTotal }
        })
      },
      removeFromCart: (id: string) => {
        set((state) => {
          const newCart = state.cart.filter((item) => item.id !== id)
          const newTotal = newCart.reduce((acc, item) => acc + item.subTotal, 0)
          return { cart: newCart, total: newTotal }
        })
      },
      clearFromCart: () => {
        set(() => ({
          cart: [],
          total: 0
        }))
      },
      searchFromCart(id) {
        let found = false
        let quantityMain = 0
        set((state) => {
          state.cart.map((item) => {
            if (item.id === id) {
              found = true
              quantityMain = item.quantity
            }
          })
          const newTotal = state.cart.reduce((acc, item) => acc + item.subTotal, 0)
          return { cart: state.cart, total: newTotal }
        })
        return {
          found,
          quantityMain
        }
      },
      incrementQuantity: (id: string) => {
        set((state) => {
          state.cart.map((item) => {
            if (item.id === id) {
              item.quantity = item.quantity + 1
              item.subTotal = item.quantity * item.unit_price
            }
          })
          const newTotal = state.cart.reduce((acc, item) => acc + item.subTotal, 0)
          return { cart: state.cart, total: newTotal }
        })
      },
      decrementQuantity: (id: string, quantity: number) => {
        if (quantity === 1 || quantity === 0) return
        set((state) => {
          state.cart.map((item) => {
            if (item.id === id) {
              if (item.quantity === 1) return
              item.quantity = item.quantity - 1
              item.subTotal = item.quantity * item.unit_price
            }
          })
          const newTotal = state.cart.reduce((acc, item) => acc + item.subTotal, 0)
          return { cart: state.cart, total: newTotal }
        })
      },
      updateQuantity: (id: string, quantity: number) => {
      
        set((state) => {
          state.cart.map((item) => {
            if (item.id === id) {
              item.quantity = quantity
              item.subTotal = item.quantity * item.unit_price
            }
          })
          const newTotal = state.cart.reduce((acc, item) => acc + item.subTotal, 0)
          return { cart: state.cart, total: newTotal }
        })
      },
    }),
    {
      name: "cart"
    }
  )
)