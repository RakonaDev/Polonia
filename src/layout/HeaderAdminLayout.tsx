'use client'

import HeaderAdmin from "@/components/HeaderAdmin";
import { usePathname } from "next/navigation";


export default function HeaderAdminLayout() {
  const pathname = usePathname()
  return (
    <>
      { 
        pathname.includes('login') ? null : 
          <div className="w-72 pe-8 h-screen relative">
            <HeaderAdmin />
          </div> 
      }
    </>
  )
}
