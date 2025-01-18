'use client'
import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { OrderDatabase } from "@/backend/models/Order.modal";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
};

export default function useOrder<T = OrderDatabase>(
  url: string,
  options?: AxiosRequestConfig,
  immediate: boolean = true // Si se debe hacer el fetch inmediatamente al montar el componente
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const response = await axios(url, options);
      setState({ data: response.data, error: null, loading: false });
    } catch (error) {
      if (error instanceof AxiosError) {
        setState({
          data: null,
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    }
  }, [url, options]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return { ...state, refetch: fetchData };
}

