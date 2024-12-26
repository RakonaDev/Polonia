import { ProductCard } from "@/components/ProductCard";
import BannerInicio from '../assets/layouts/bannerInicio.jpg'
import Item1 from '../assets/layouts/item1.png'
import Item2 from '../assets/layouts/item2.png'
import Item3 from '../assets/layouts/item3.png'
import Item4 from '../assets/layouts/item4.png'
import Image from "next/image";

export default function InicioPage() {
  return (
    <>
      
      <main className='w-full min-h-screen h-auto'>
        <div className='max-w-[90rem] w-full mx-auto p-2'>
          <header className='mt-28'>
            <Image src={BannerInicio} alt="banner" className='w-full h-auto' width={1280} height={341} />
          </header>
          <section className='w-full h-auto flex gap-4 mt-16 py-10 justify-between'>
            <ProductCard
              img={Item1}
              nombre="INTERRUPTOR LUZ DE EMERGENCIA CUADRADO 24V 7 PINES - CAMION/BUSES"
              id="IM - 11209"
              proveedor='MARILIA'
              precio="S/. 20 Uni - S/ 15 3 Uni. a más"
            />
            <ProductCard
              img={Item2}
              nombre="INTERRUPTOR DE 3 PINES 1 GOLPE (FIG DE FARO) CAMION/BUSES"
              id="IM - 10621"
              proveedor='MARILIA'
              precio="S/. 20 Uni - S/ 15 3 Uni. a más"
            />
            <ProductCard
              img={Item3}
              nombre="CHAPA DE LUZ MARILLA DE 2 GOLPES 4 PINES UNIVERSAL "
              id="IM - 11006"
              proveedor='MARILIA'
              precio="S/. 20 Uni - S/ 15 3 Uni. a más"
            />
            <ProductCard
              img={Item4}
              nombre="BOTON DE ARRANQUE MARILIA CUADRADI UNIVERSAL"
              id="IM - 11031"
              proveedor='MARILIA'
              precio="S/. 20 Uni - S/ 15 3 Uni. a más"
            />
          </section>
        </div>
      </main>
    </>
  );
}
