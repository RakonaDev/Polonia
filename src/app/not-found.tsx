'use client'
import { motion } from "framer-motion";
import AuroraBackground from "@/components/ui/aurora-background";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 text-white h-screen"
      >
        <motion.h1
          initial={{ opacity: 0.0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl md:text-4xl font-bold text-center"
        >
          404 - Página no encontrada
        </motion.h1>
        <Link href='/' className="px-4 text-xs md:text-xl md:px-8 py-2 rounded-full bg-gradient-to-b from-red-500 to-red-600 text-white focus:ring-2 focus:ring-red-500 hover:shadow-xl hover:bg-gradient-to-b hover:from-red-600 hover:to-red-700 transition-all duration-200">
          Volver al Inicio
        </Link>
      </motion.div>

    </AuroraBackground>
  );
}