'use client'

import axios, { AxiosError } from "axios"
import { useState } from "react"
import Swal from 'sweetalert2'
import { ProductDatabase } from "@/backend/models/Product.modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useFormProducto(setState: any) {
  const [IDProducto, setIDProducto] = useState<string>('')
  const [nombreProducto, setNombreProducto] = useState<string>('')
  const [precioProducto, setPrecioProducto] = useState<number>(0)
  const [categoriaProducto, setCategoriaProducto] = useState<string>('')
  const [proveedorProducto, setProveedorProducto] = useState<string>('')
  const [stockProducto, setStockProducto] = useState<number>(0)
  const [descripcionProducto, setDescripcionProducto] = useState<string>('')
  const [imagenProducto, setImagenProducto] = useState<File[]>()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('id', IDProducto)
    formData.append('nombre', nombreProducto)
    formData.append('precio', precioProducto.toString())
    formData.append('categoria', categoriaProducto)
    formData.append('supplier', proveedorProducto)
    formData.append('stock', stockProducto?.toString())
    formData.append('descripcion', descripcionProducto)
    if (imagenProducto) {
      formData.append('imagen1', imagenProducto[0])
      formData.append('imagen2', imagenProducto[1])
      formData.append('imagen3', imagenProducto[2])
    }
  
    try{
      const response = await axios.post(process.env.NEXT_PUBLIC_URL + 'api/private/product', formData, {
        method: 'POST'
      })
      setState((prevState: ProductDatabase[]) => [...prevState, response.data.producto])
      Swal.fire({
        title: 'Producto creado',
        text: 'El producto ha sido creado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })
    }
    catch(error){
      if (error instanceof AxiosError) {
        Swal.fire({
          title: 'Error',
          text: error.response?.data.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          backdrop: false,
        })
        console.log(error.message)
      }
      console.log(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    if (name === 'IDProducto') {
      setIDProducto(value)
    }
    else if (name === 'nombreProducto') {
      setNombreProducto(value)
    }
    else if (name === 'precioProducto') {
      setPrecioProducto(Number(value))
    }
    else if (name === 'categoriaProducto') {
      setCategoriaProducto(value)
    }
    else if (name === 'proveedorProducto') {
      setProveedorProducto(value)
    }
    else if (name === 'stockProducto') {
      setStockProducto(Number(value))
    }
    else if (name === 'imagenProducto') {
      if (files === null) return
      setImagenProducto(Array.from(files).slice(0, 3))
    }
  }

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'descripcion') {
      setDescripcionProducto(value)
    }
  }

  return {
    handleSubmit,
    handleChange,
    handleChangeTextarea,
    IDProducto,
    nombreProducto,
    precioProducto,
    categoriaProducto,
    proveedorProducto,
    stockProducto,
    descripcionProducto,
    imagenProducto
  }
}