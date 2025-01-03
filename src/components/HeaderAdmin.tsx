'use client'
import Image from "next/image";
import PoloniaLogo from '@/assets/layouts/dashboard/logo.svg'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const navItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '/header/dashboard.svg', position: 'translate-y-0' },
  { name: 'Ventas', href: '/admin/ventas', icon: '/header/sales.svg', position: 'translate-y-16' },
  { name: 'Comunidad', href: '/admin/usuarios', icon: '/header/user.svg', position: 'translate-y-[8rem]' },
  { name: 'Productos', href: '/admin/productos', icon: '/header/products.svg', position: 'translate-y-[12rem]' },
]

export default function HeaderAdmin() {
  const[position, setPosition] = useState<string>("translate-y-0")
  const pathname = usePathname()

  useEffect(() => {
    console.log(new Date().toLocaleDateString())
    if(pathname.includes('dashboard')) {
      setPosition(navItems[0].position)
    }
    if(pathname.includes('ventas')) {
      setPosition(navItems[1].position)
    }
    if(pathname.includes('usuarios')) {
      setPosition(navItems[2].position)
    }
    if(pathname.includes('productos')) {
      setPosition(navItems[3].position)
    }
  })

  return (
    <>
      <header className="w-72 fixed top-14 pe-5 z-50">
        <div className="flex flex-col items-end w-fit mx-auto cursor-pointer" onClick={() => signOut()}>
          <Image src={PoloniaLogo} alt="logo" className="h-10" width={190} height={50} />
          <section className="px-2 py-1 bg-white text-black text-xs rounded-md -translate-y-1">
            ADMIN
          </section>
        </div>
        <nav className="w-full flex flex-col ps-10 items-center mt-14 relative">
          <div className={`w-56 bg-rojo h-16 absolute top-0 right-3 rounded-xl duration-300 transition-all ${position}`}></div>
          {
            navItems.map((item, index) => {
              if (pathname === item.href) {
                return (
                  <Link key={index} href={item.href} className="text-white font-bold py-5 w-full flex gap-4 ms-10 z-10">
                    <Image src={item.icon} alt="icon" className="my-auto" height={24} width={24} />
                    {item.name}
                  </Link>
                )
              }
              return (
                <Link key={index} href={item.href} className="text-white font-medium py-5 w-full flex gap-4 ms-10 z-10">
                  <Image src={item.icon} alt="icon" className="my-auto" height={24} width={24} />
                  {item.name}
                </Link>
              )
            })
          }
        </nav>
      </header>
    </>
  )
}
