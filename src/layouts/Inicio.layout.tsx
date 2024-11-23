import { ProductCard } from '@/components/ProductCard'
import BannerInicio from '../assets/layouts/bannerInicio.jpg'
import Item1 from '../assets/layouts/item1.png'

export function InicioLayout () {
  return (
    <>
      <main className='w-full min-h-screen h-auto'>
        <div className='max-w-[90rem] w-full mx-auto p-2'>
          <header className='mt-28'>
            <img src={BannerInicio} alt="banner" className='w-full h-auto' />
          </header>
          <section className='w-full h-auto flex gap-4 mt-16 py-10'>
            <ProductCard
              img={Item1}
              nombre="INTERRUPTOR LUZ DE EMERGENCIA CUADRADO 24V 7 PINES - CAMION/BUSES"
              id="IM - 11209"
              proveedor='MARILIA'
              precio="S/. 20 Uni - S/ 15 3 Uni. a más"
            />
          </section>
        </div>
      </main>
    </>
  )
}