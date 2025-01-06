import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import React from 'react'

const socios = [
  {
    url: '/socios/image-13.png'
  },
  {
    url: '/socios/image-2.png'
  },
  {
    url: '/socios/image-3.png'
  },
  {
    url: '/socios/image-4.png'
  },
  {
    url: '/socios/image-5.png'
  },
  {
    url: '/socios/image-6.png'
  },
  {
    url: '/socios/image-7.png'
  },
  {
    url: '/socios/image-8.png'
  },
  {
    url: '/socios/image-9.png'
  },
  {
    url: '/socios/image-10.png'
  },
  {
    url: '/socios/image-11.png'
  },
  {
    url: '/socios/image-12.png'
  }
]

export default async function NosotrosPage() {
  return (
    <>
      <div className='max-w-[90rem] mx-auto mt-12 w-full px-2 text-justify'>
        <h1 className='text-5xl text-gris mt-10 font-bold'>Nuestra Historia</h1>
        <p className='text-gris text-lg mt-5'>
          En octubre de 2020, tres intrépidos hermanos comenzaron su emocionante viaje en el mundo de las autopartes. Con un modesto capital, iniciaron vendiendo productos de puerta en puerta. Cada día representaba un nuevo paso hacia adelante, ganando la confianza de clientes leales. Nuestra política siempre ha sido la dedicación y la perseverancia para llegar a más personas y ganar su confianza.
          Con el tiempo, nuestra empresa creció y, lo que es aún más emocionante, ayudamos a dar a conocer a varias marcas que no eran nuestras, todo gracias a la confianza, la seguridad y la amistad que construimos con nuestros clientes. En la actualidad, nuestra empresa emplea a cinco trabajadores y los tres socios originales, todos trabajando incansablemente para seguir expandiendo nuestros horizontes.
          Hoy, nos enorgullece anunciar que estamos lanzando nuestra propia marca con el objetivo de convertirla en líder en el mercado. Con una dedicación inquebrantable, estamos decididos a hacer que este sueño se convierta en una realidad tangible.
        </p>
        <section className='text-gris mt-10 flex gap-10'>
          <div>
            <h1 className='text-5xl font-bold'>Misión</h1>
            <p className='text-lg mt-5'>
              Impulsar el crecimiento de los negocios de nuestros clientes a través de la distribución de una amplia variedad de repuestos eléctricos, iluminación y sistemas de encendido automotriz. Nos comprometemos a proporcionar la mejor calidad, sostenibilidad y eficiencia operativa en cada producto que ofrecemos, para que nuestros clientes puedan prosperar y alcanzar sus metas comerciales de manera exitosa.
            </p>
          </div>
          <div>
            <h1 className='text-5xl font-bold'>Visión</h1>
            <p className='text-lg mt-5'>
                Es convertirnos en la empresa líder en ventas, distribución e importación de repuestos eléctricos, iluminación y sistemas de encendido automotriz en el Perú. Nos esforzamos por ofrecer un servicio de la más alta calidad, construyendo relaciones basadas en la confianza y el compromiso con nuestros valiosos clientes.
            </p>
          </div>
        </section>
      </div>
      <div className='mt-20 bg-black w-full h-60'>
        <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-[#130F26] dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">

          <InfiniteMovingCards
            items={socios}
            direction="right"
            speed="normal"
          />
        </div>
      </div>
    </>
  )
}
