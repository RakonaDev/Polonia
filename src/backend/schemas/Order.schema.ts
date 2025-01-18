import { z } from "zod";

export const userInfoSchema = z
  .object({
    nombre: z.string(),
    apellido : z.string(),
    direccion : z.string(),
    distrito : z.string(),
    ubicacion : z.string(),
    telefono : z.string(),
    correo : z.string().email(),
    cart : z.array(z.object({
      id : z.string(),
      title : z.string(),
      quantity : z.number(),
      currency_id : z.string(),
      unit_price : z.number(),
      description : z.string().optional()
    }))
  })
  .required();

