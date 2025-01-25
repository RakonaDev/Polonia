import { create } from "zustand";

type LoadingObject = {
  loading: boolean,
  messageLoading: string,
}

type ErrorObject = {
  error: boolean,
  messageError: string,
}

type SuccessObject = {
  success: boolean,
  messageSuccess: string,
}

interface FeaturesObject {
  loadingMain: LoadingObject,
  errorMain: ErrorObject,
  successMain: SuccessObject,
  setError: (error: ErrorObject) => void,
  setLoading: (loading: LoadingObject) => void
  setSuccess: (success: SuccessObject) => void
}

export const useFeaturesAdmin = create<FeaturesObject>()(
  (set) => ({
    loadingMain: {
      loading: false,
      messageLoading: 'Cargando...'
    },
    errorMain: {
      error: false,
      messageError: ''
    },
    successMain: {
      success: false,
      messageSuccess: ''
    },
    setError: (error: ErrorObject) => set(() => ({ errorMain: error })),
    setLoading: (loading: LoadingObject) => set(() => ({ loadingMain: loading })),
    setSuccess: (success: SuccessObject) => set(() => ({ successMain: success }))
  })
)