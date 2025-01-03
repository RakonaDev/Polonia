import { z } from "zod";

export const AdminRegisterSchema = z.object({
  email: z.string({
    required_error: 'Email es requerido',
  }).min(3, {
    message: 'Email es muy corto',
  }).max(50, {
    message: 'Email es muy largo',
  }).email(),

  password: z.string()
  .min(7, {
    message: 'Contraseña es muy corta (mínimo 7 caracteres)',
  }).max(15, {
    message: 'Contraseña es muy larga (máximo 15 caracteres)',
  }),

  confirm_password: z.string()
  .min(7, {
    message: 'Contraseña es muy corta (mínimo 7 caracteres)',
  }).max(15, {
    message: 'Contraseña es muy larga (máximo 15 caracteres)',
  }),
})