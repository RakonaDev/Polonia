import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image"
import User from '../assets/components/user.svg'
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

export default function TooltipUser() {
  const { user, isSignedIn } = useUser()
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Image src={User} alt="" className="h-6 my-auto" />
        </TooltipTrigger>
        <TooltipContent className="data-[side=top]:translate-y-20 bg-white font-medium text-base flex gap-4">
          {
            isSignedIn ?
              (
                <>Hola Mundo</>
              )
              :
              (
                <>
                  <Link href="/sign-in">
                    Inicia Sesión
                  </Link>
                  <span>/</span>
                  <Link
                    href="/sign-in"
                  >
                    Registrate
                  </Link>
                </>
              )
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
