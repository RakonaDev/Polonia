import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'
import mercadopago from 'mercadopago'

export const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN_MERCADO_PAGO as string,
  options: {
    timeout: 10000,
    idempotencyKey: 'abc'
  }
})

export const preference = new Preference(client)

export const payment = new Payment(client)