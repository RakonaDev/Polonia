import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase() // Convierte a minúsculas
    .normalize("NFD") // Normaliza acentos
    .replace(/[\u0300-\u036f]/g, "") // Elimina diacríticos (acentos, tildes)
    .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales
    .trim()
    .replace(/\s+/g, "-"); // Reemplaza espacios con guiones
}

export function deslugify(slug: string): string {
  return slug
    .replace(/-/g, " ") // Reemplaza guiones por espacios
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitaliza la primera letra de cada palabra
}