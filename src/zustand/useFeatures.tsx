import { create } from "zustand";

interface Features {
  loading: boolean;
  loadingMessage: string;
  setLoading: (loading: boolean) => void;
  setLoadingMessage: (loadingMessage: string) => void;
  error: boolean;
  errorMessage: string;
  setError: (error: boolean) => void;
  setErrorMessage: (errorMessage: string) => void;
}

export const useFeatures = create<Features>()(set => ({
  loading: false,
  loadingMessage: '',
  setLoading: (loading) => set({ loading }),
  setLoadingMessage: (loadingMessage) => set({ loadingMessage }),
  errorMessage: '',
  error: false,
  setError: (error) => set({ error }),
  setErrorMessage: (errorMessage) => set({ errorMessage })
}));