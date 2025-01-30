
import { PoloniaDB } from "@/backend/firebase";
import { ProductDatabase } from "@/backend/models/Product.modal";
import FooterProduct from "@/components/FooterProduct";
import ListImagesProduct from "@/components/ListImagesProduct";
import { deslugify } from "@/lib/utils";
import { collection, getDocs, query, where } from "firebase/firestore";
import { List, LucideChartGantt } from "lucide-react";
import { notFound } from "next/navigation";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCreditCard } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";

export default async function Page({ params }: { params: { name: string } }) {
  const { name } = await params
  if (!params?.name) return <div>Producto no encontrado</div>;
  const nombre = decodeURIComponent(name.replace(/-/g, " ").toLowerCase());
  // const name = deslugify(params.name as string
  const q = query(
    collection(PoloniaDB, "products"),
    where("name", "==", nombre)
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty || !snapshot.docs[0]) {
    return notFound();  // Retorna un 404 si no hay coincidencias
  }

  const producto = snapshot.docs[0].data() as ProductDatabase

  return (
    <main className="mt-6 w-full ">
      <div className="max-w-[90rem] w-full mx-auto p-2 flex gap-10">
        <aside className="w-1/2">
          <ListImagesProduct imagenes={producto.url_images} />
        </aside>
        <main className="w-1/2 flex flex-col gap-4">
          <h1 className="font-bold text-xl">{producto.name.toUpperCase()}</h1>
          <p className="text-contacto">Codigo: {producto.id}</p>
          <p className="text-contacto">Marca: {producto.supplier}</p>
          <p className="font-bold text-xl">S/. {producto.price.toFixed(2)}</p>
          <FooterProduct
            product={producto}
          />
        </main>
      </div>
      <footer className="mt-10 w-full">
        <main className="max-w-[90rem] mx-auto w-full flex flex-wrap py-20">
          <div className="flex gap-10 items-center border-2 border-black p-3 w-1/4 min-w-[200px]">
            <CiDeliveryTruck size={100} />
            <div>
              <h1 className="font-bold">Envios</h1>
              <p>Rápidos y Seguros</p>
            </div>
          </div>
          <div className="flex gap-10 items-center border-2 border-black p-3 w-1/4 min-w-[200px]">
            <FaCreditCard size={70} />
            <div>
              <h1 className="font-bold">Pago Seguro </h1>
              <p>Paga con nuestra
                pasarela Confiable</p>
            </div>
          </div>
          <div className="flex gap-10 items-center border-2 border-black p-3 w-1/4 min-w-[200px]">
            <MdDiscount size={70} />
            <div>
              <h1 className="font-bold">Descuentos</h1>
              <p>En todos nuestros Productos</p>
            </div>
          </div>
          <div className="flex gap-10 items-center border-2 border-black p-3 w-1/4 min-w-[200px]">
            <MdSupportAgent size={70} />
            <div>
              <h1 className="font-bold">Ayuda</h1>
              <p>Te ayudamos en todo el proceso de compra</p>
            </div>
          </div>  
        </main>
      </footer>
    </main>
  )
}