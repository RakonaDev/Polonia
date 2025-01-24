import { ProductDatabase } from "@/backend/models/Product.modal";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

type ProductResponse = {
  products: ProductDatabase[]
}

type ProductProps = {
  url: string
  options?: AxiosRequestConfig
  immediate: true | false
  setLoading?: (loading: boolean) => void 
  setError?: (error: boolean) => void
}

export default function useProducts<T = ProductResponse>({ url, options, immediate = true, setLoading, setError }: ProductProps) {
  const [products, setState] = useState<ProductDatabase[]>([]);

  const fetchData = useCallback(async () => {
    if (setLoading) setLoading(true)
    try {
      const response = await axios(url, options);
      setState(response.data);
      if(setLoading && setError) {
        setLoading(false)
        setError(false)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setState([]);
        if(setLoading && setError) {
          setLoading(false)
          setError(true)
        }
      }
    }
  }, [url, options]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [immediate]);

  return { products, refetch: fetchData, setState };
}