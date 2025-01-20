import { create } from "zustand";

interface Features {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
}

export const useFeatures = create<Features>()(set => ({
  loading: false,
  error: false,
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));