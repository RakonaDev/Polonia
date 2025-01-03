import { ProductCard } from "@/components/ProductCard";
import BannerInicio from '../assets/layouts/bannerInicio.jpg'
import Item1 from '../assets/layouts/item1.png'
import Item2 from '../assets/layouts/item2.png'
import Item3 from '../assets/layouts/item3.png'
import Item4 from '../assets/layouts/item4.png'
import Image from "next/image";
/* "S/. 20 Uni - S/ 15 3 Uni. a más" */
export default function InicioPage() {
  console.log({
    projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
    clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  })
  return (
    <>
      
      <main className='w-full min-h-screen h-auto'>
        <div className='max-w-[90rem] w-full mx-auto p-2'>
          <header className='mt-28'>
            <Image src={BannerInicio} alt="banner" className='w-full h-auto' width={1280} height={341} />
          </header>
          <section className='w-full h-auto flex gap-4 mt-16 py-10 justify-between'>
            <ProductCard
              image={[
                { url: Item1 },
              ]}
              name="INTERRUPTOR LUZ DE EMERGENCIA CUADRADO 24V 7 PINES - CAMION/BUSES"
              id="IM - 11209"
              supplier='MARILIA'
              price={20} 
            />
            <ProductCard
              image={[
                { url: Item2 },
              ]}
              name="INTERRUPTOR DE 3 PINES 1 GOLPE (FIG DE FARO) CAMION/BUSES"
              id="IM - 10621"
              supplier='MARILIA'
              price={20}
            />
            <ProductCard
              image={[
                { url: Item3 },
              ]}
              name="CHAPA DE LUZ MARILLA DE 2 GOLPES 4 PINES UNIVERSAL "
              id="IM - 11006"
              supplier='MARILIA'
              price={20}
            />
            <ProductCard
              image={[{url: Item4}]}
              name="BOTON DE ARRANQUE MARILIA CUADRADI UNIVERSAL"
              id="IM - 11031"
              supplier='MARILIA'
              price={20}
            />
          </section>
        </div>
      </main>
    </>
  );
}
