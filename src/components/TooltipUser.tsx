import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"
import User from '../assets/components/user.svg'
import Link from "next/link"
import { useClerk, useUser } from "@clerk/nextjs"


const ProfileUser = ({ name }: { name: string }) => {
  const { signOut } = useClerk()

  return (
    <div className="flex flex-col gap-2 items-center">
      <p>Bienvenido {name}</p>
      <button
        type="button"
        className="text-white bg-rojo px-6 py-2 rounded-md font-medium"
        onClick={() => signOut({ redirectUrl: '/' })}
      >
        Cerrar Sesión
      </button>
    </div>
  )
}

export default function TooltipUser() {
  const { user, isSignedIn } = useUser()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image src={User} alt="" className="h-6 my-auto" />
        </TooltipTrigger>
        <TooltipContent className="data-[side=top]:translate-y-24 mt-4 ring-2 ring-black bg-white font-medium text-base flex gap-4">
          {
            isSignedIn ?
              (
                <>
                  <div className="p-2">
                    {user.fullName && <ProfileUser name={user.fullName} />}
                    {user.username && <ProfileUser name={user.username} />}
                  </div>
                </>
              )
              :
              (
                <section className="p-2">
                  <div className="p-2 flex gap-3 items-center">
                    <Link href="/sign-in" className="text-black bg-gray-300 transition-all duration-700 p-4 rounded-lg hover:bg-slate-400">
                      Inicia Sesión
                    </Link>
                    <span>/</span>
                    <Link
                      href="/sign-in"
                      className="text-black bg-gray-300 transition-all duration-700 p-4 rounded-lg hover:bg-slate-400"
                    >
                      Registrate
                    </Link>
                  </div>
                </section>
              )
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
