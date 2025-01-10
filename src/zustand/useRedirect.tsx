import { create } from "zustand";

type RedirectUrl = {
  redirectUrl: string
}

type RedirectUrlActions = {
  setRedirectUrl: (url: string) => void
}

export const useRedirect = create<RedirectUrl & RedirectUrlActions>()(
  (set) => ({
    redirectUrl: '/',
    setRedirectUrl(url) {
      set({ redirectUrl: url })
    },
  })
)