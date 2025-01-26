'use client'
import { FacebookIcon } from "@/icons/FacebookIcon";
import { InstagramIcon } from "@/icons/InstagramIcon";
import { TiktokIcon } from "@/icons/TiktokIcon";
import { YoutubeIcon } from "@/icons/YoutubeIcon";

import Logo from '../assets/components/logo.svg'
import Search from '../assets/components/search.svg'
import Whats from '../assets/components/whats.svg'
import Download from '../assets/components/download.svg'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SheetCart } from "./sheet-cart";
import { usePathname } from "next/navigation";
import TooltipUser from "./TooltipUser";

export function Header() {
  const pathname = usePathname()
  const[isScrolled, setIsScrolled] = useState<boolean>(false)
  const[lastScrollY, setLastScrollY] = useState<number>(0);
  const [isScrollingUp, setIsScrollingUp] = useState<boolean>(true);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Detectar si el scroll va hacia arriba
    if (currentScrollY < lastScrollY) {
      setIsScrollingUp(true);
    } else {
      setIsScrollingUp(false);
    }

    // Actualizar el último valor del scroll
    setLastScrollY(currentScrollY);
  };


  useEffect((): void => {
    if (window.scrollY > 10) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
      handleScroll();
    })
  })

  return (
    <>
      <header className='w-full bg-black h-auto z-10 relative'>
        <div className="max-w-[90rem] w-full mx-auto">
          <nav className="flex gap-4 p-2">
            <a href="#" title="Facebook" className="bg-white w-6 h-6 rounded-full" target="_blank">
              <FacebookIcon />
            </a>
            <a href="#" title="Instagram" className="bg-white w-6 h-6 rounded-full" target="_blank">
              <InstagramIcon />
            </a>
            <a href="#" title="Tiktok" className="bg-white w-6 h-6 rounded-full" target="_blank">
              <TiktokIcon />
            </a>
            <a href="#" title="Youtube" className="bg-white h-6 w-6 rounded-full" target="_blank">
              <YoutubeIcon />
            </a>
          </nav>
        </div>
      </header>
      <div className={`h-24 w-full ${pathname === '/contacto' ? 'bg-contacto' : 'bg-white'}`}></div>
      <header className={`w-full h-auto group fixed duration-100 transition-all ${isScrolled ? 'top-0' : 'top-10'}`}>
        <div className="bg-rojo relative z-30">
          <div className="max-w-[90rem] w-full mx-auto p-4 flex gap-6">
            <Image src={Logo} alt="" className="h-10 my-auto" width={190} height={50} />
            <div className="flex-grow my-auto flex focus-within:outline-2 focus-within:outline-black">
              <input
                type="search"
                id="buscar"
                placeholder="Buscar Productos..."
                className="px-4 py-2 w-full rounded-s-full round focus-within:outline-none"
              />
              <label
                htmlFor="buscar"
                className="bg-white px-4 py-4 rounded-e-full round my-auto"
              >
                <Image src={Search} alt="" className="h-5 w-6 my-auto" />
              </label>
            </div>
            <TooltipUser />
            {/*"<Cart />"*/}
            <SheetCart />

            <a href="#" className="flex items-center gap-2 text-white bg-verde px-6 py-2 my-auto rounded-lg h-fit">
              <Image src={Whats} alt="" className="h-5 my-auto" height={20} width={25} />
              <span className="text-white text-md">Contáctanos</span>
            </a>
          </div>
        </div>
        <div className={`w-full bg-rojo-claro relative ${isScrollingUp ? 'translate-y-0' : '-translate-y-60' } h-auto group-hover:translate-y-0 transition-all duration-500`}>
          <div className="max-w-[90rem] w-full mx-auto flex gap-4 py-9 p-5 justify-between items-end">
            <nav className="gap-9 flex h-10 items-end">	
              <Link href="/" className="text-white">
                Inicio
              </Link>
              <Link href="/nosotros" className="text-white">
                Nuestra Empresa
              </Link>
              <Link href="/contacto" className="text-white">
                Contacto
              </Link>
            </nav>
            <a href="/CATÁLOGO_POLONIA_2025.pdf" target="_blank" className="bg-black text-white rounded-xl py-2 px-6 h-fit flex gap-3">
              <Image src={Download} alt="download" className="h-5 my-auto" height={20} width={25}/> <span>Catálogo</span>
            </a>
          </div>
        </div>
      </header>
      <div className={`w-full h-24 ${pathname === '/contacto' ? 'bg-contacto' : 'bg-white'}`}></div>
    </>
  )
}