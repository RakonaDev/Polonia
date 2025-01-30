import { ProductDatabase } from "@/backend/models/Product.modal";
import { apiUrl } from "@/helper/Global";
import { useFeaturesAdmin } from "@/zustand/useFeaturesAdmin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosRequestConfig } from "axios";


const axiosOptions: AxiosRequestConfig = {
  method: 'GET'
}

const updateProduct = async (newProduct: ProductDatabase) => {
  try{
    const response = await axios.patch(`${apiUrl}private/product`, newProduct)
    return response.data
  }
  catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message)
    }
    throw error
  }
}

export default function useProducts () {
  const queryClient = useQueryClient()
  const { setLoading, setError, setSuccess } = useFeaturesAdmin()

  /* Get all products */
  const { data: products, isLoading, isError, error, refetch } = useQuery<ProductDatabase[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(apiUrl + 'public/producto', axiosOptions);
      return response.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: false,
  })

  /* Add new product */
  const { mutate } = useMutation({
    mutationFn: async (newProduct: ProductDatabase) => {
      const response = await axios.post(apiUrl + 'private/product', newProduct, {
        method: 'POST'
      })
      return response.data.producto
    },
    onSuccess: async (newProduct: ProductDatabase) => {
      await queryClient.setQueryData(['products'], (oldData: ProductDatabase[]) => {
        if (oldData === null) return [newProduct]
        return [...oldData, newProduct]
      })
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

  const { mutate: deleteProduct } = useMutation({
    mutationFn: async (id: string) => {
      
    }
  })

  const { mutate: actualizarProducto } = useMutation({
    mutationFn: updateProduct,
    onSuccess: (newProduct: ProductDatabase) => {

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