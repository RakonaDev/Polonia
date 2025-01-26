'use client'

import axios, { AxiosError } from "axios"
import { useState } from "react"
import Swal from 'sweetalert2'
import { ProductDatabase } from "@/backend/models/Product.modal";
import { useFeaturesAdmin } from "@/zustand/useFeaturesAdmin";
import useProducts from "./useProducts";

export default function useFormProducto() {
  const [IDProducto, setIDProducto] = useState<string>('')
  const [nombreProducto, setNombreProducto] = useState<string>('')
  const [precioProducto, setPrecioProducto] = useState<number>(0)
  const [categoriaProducto, setCategoriaProducto] = useState<string>('')
  const [proveedorProducto, setProveedorProducto] = useState<string>('')
  const [stockProducto, setStockProducto] = useState<number>(0)
  const [descripcionProducto, setDescripcionProducto] = useState<string>('')
  const [imagenProducto, setImagenProducto] = useState<File[]>()
  const { setLoading, loadingMain, setSuccess, setError } = useFeaturesAdmin()
  const { products, mutate } = useProducts()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (loadingMain.loading) return
    const formData = new FormData()
    formData.append('id', IDProducto)
    formData.append('nombre', nombreProducto)
    formData.append('precio', precioProducto.toString())
    formData.append('categoria', categoriaProducto)
    formData.append('supplier', proveedorProducto)
    formData.append('stock', stockProducto?.toString())
    formData.append('descripcion', descripcionProducto)
    const INPUT_FILES = document.getElementById('imagenes') as HTMLInputElement;
    const files = INPUT_FILES.files;
    if (files === null) return
    for (const file of files) {
      formData.append("imagenes", file); // Usa el mismo campo "imagenes"
    }
    /*
    if (imagenProducto) {
      formData.append('imagen1', imagenProducto[0])
      formData.append('imagen2', imagenProducto[1])
      formData.append('imagen3', imagenProducto[2])
    }
    */
    try {
      setLoading({
        loading: true,
        messageLoading: 'Agregando nuevo producto...'
      })
      mutate(formData)
    }
    catch (error) {
      if (error instanceof AxiosError) {
        setError({
          error: true,
          messageError: error.response?.data.message
        })
        setInterval(() => {
          setError({
            error: false,
            messageError: ''
          })
        }, 3000)
        console.log(error.message)
      }

      setError({
        error: true,
        messageError: 'Algo salió mal...'
      })
      setInterval(() => {
        setError({
          error: false,
          messageError: ''
        })
      }, 3000)
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