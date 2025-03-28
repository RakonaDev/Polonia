'use client'
import { useState, useEffect, useCallback } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { OrderDatabase } from "@/backend/models/Order.modal";

type FetchState<T> = {
  data: T | null;
};

type OrderResponse = {
  docs: OrderDatabase[]
  lastVisible: OrderDatabase
}

type OrderProps = {
  url: string
  options?: AxiosRequestConfig
  immediate: boolean 
  setLoading: (loading: boolean) => void
  setError: (error: boolean) => void
}

export default function useOrder<T = OrderResponse>({ url, options, immediate = true, setLoading, setError }: OrderProps) {
  const [state, setState] = useState<FetchState<T>>({
    data: null
  });

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const response = await axios(url, options);
      setState({ data: response.data });
      setLoading(false)
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(true)
        setState({
          data: null,
        });
        setLoading(false)
      }
    }
  }, [url, options]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate]);

  return { ...state, refetch: fetchData };
}

