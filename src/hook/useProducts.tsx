/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDatabase } from "@/backend/models/Product.modal";
import { apiUrl } from "@/helper/Global";
import { useFeaturesAdmin } from "@/zustand/useFeaturesAdmin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";


const axiosOptions: AxiosRequestConfig = {
  method: 'GET'
}

export default function useProducts() {
  const queryClient = useQueryClient()
  const { setLoading, setError, setSuccess } = useFeaturesAdmin()

  /* Get all products */
  const { data: products, isLoading, isError, error, refetch } = useQuery<ProductDatabase[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(apiUrl, axiosOptions);
      return response.data;
    },
    refetchOnWindowFocus: false,
  })

  /* Add new product */
  const { mutate } = useMutation({
    mutationFn: async (newProduct: any) => {
      const response = await axios.post(apiUrl, newProduct, {
        method: 'POST'
      })
      return response.data.producto
    },
    onSuccess: async (newProduct: any) => {
      await queryClient.setQueryData(['products'], (oldData: any) => {
        if (oldData === null) return [newProduct]
        return [...oldData, newProduct]
      })
      queryClient.invalidateQueries({
        queryKey: ['products']
      });
      setLoading({
        loading: false,
        messageLoading: ''
      })
      setSuccess({
        success: true,
        messageSuccess: 'Producto agregado exitosamente'
      })
      setInterval(() => {
        setSuccess({
          success: false,
          messageSuccess: ''
        })
      }, 3000)
    },
    onError: (error) => {
      setError({
        error: true,
        messageError: 'Error al agregar producto'
      })
      setLoading({
        loading: false,
        messageLoading: ''
      })
      setInterval(() => {
        setError({
          error: false,
          messageError: ''
        })
      }, 3000)
      console.log(error.message)
    }
  })
  
  return {
    mutate,
    products,
    isLoading,
    isError,
    error,
    refetch
  }
}