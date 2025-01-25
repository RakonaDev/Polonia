import { ProductDatabase } from "@/backend/models/Product.modal";
import { apiUrl } from "@/helper/Global";
import { useQuery } from "@tanstack/react-query";
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

const axiosOptions: AxiosRequestConfig = {
  method: 'GET'
}

export default function useProducts() {
  
  const { data: products, isLoading, isError, error, refetch } = useQuery<ProductDatabase[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(apiUrl, axiosOptions);
      return response.data;
    },
  })
  
  return {
    products,
    isLoading,
    isError,
    error,
    refetch
  }
}