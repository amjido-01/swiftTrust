"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-[#151515] flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.1 }}
        animate={{ scale: 0.4 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center"
      >
        <Image src="/logo.svg" height={200} width={200} alt="Logo" />
          {/* <p className="text-white text-xl font-light mt-4 tracking-wide">swift-trust</p> */}
      </motion.div>
    </div>
  )
}
