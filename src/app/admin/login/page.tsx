import FormLogin from "@/components/FormLogin";
import Image from "next/image";
import backgroundLogin from "@/assets/components/background.jpg"

export default function LoginPage() {
  return (
    <div>
      <main className="w-full h-screen relative">
        <Image 
          src={backgroundLogin}
          alt="backgroundLogin"
          className="w-full h-screen object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute top-0 right-0 w-[50vw] max-w-[800px] h-screen bg-rojo-login rounded-tl-[200px] rounded-br-[200px] flex justify-center items-center flex-col">

          <section className="w-[55%]">
            <div className="mb-10">
              <p className="font-bold border-b-4 border-white w-fit">SIGN IN</p>
            </div>
            <FormLogin />
          </section>
        </div>
      </main>
    </div>
  )
}
