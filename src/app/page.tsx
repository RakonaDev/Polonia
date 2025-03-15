'use client'
import { ProductCard } from "@/components/ProductCard";
import BannerInicio from '../assets/layouts/bannerInicio.jpg'
import Item1 from '../assets/layouts/item1.png'
import Item2 from '../assets/layouts/item2.png'
import Item3 from '../assets/layouts/item3.png'
import Item4 from '../assets/layouts/item4.png'
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import useProducts from "@/hook/useProducts";
import { ProductDatabase } from "@/backend/models/Product.modal";
import SwiperDynamic from "@/components/SwiperDynamic";
/* "S/. 20 Uni - S/ 15 3 Uni. a más" */
export default function InicioPage() {
  const { user } = useUser()
  const { products } = useProducts()
  /*
  console.log({
    projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
    clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  })
  */

  return (
    <>
      
      <main className='w-full min-h-screen h-auto'>
        <div className='max-w-[90rem] w-full mx-auto p-2'>
          <header className='mt-12'>
            <SwiperDynamic />
          </header>
          <section className='w-full h-auto grid grid-cols-product gap-10 mt-16 py-10'>
            {/*
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
            /> */}
            {
              products?.map((product: ProductDatabase) => (
                <ProductCard
                  key={product.ID_Document}
                  url_images={product.url_images}
                  name={product.name}
                  id={product.id}
                  supplier={product.supplier}
                  price={product.price}
                />
              ))
            }
          </section>
        </div>
      </main>
    </>
  );
}
