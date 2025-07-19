"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-950"
      aria-label="Sección principal de bienvenida"
    >
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroBackground />
      </div>

      {/* Overlay para mejorar contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/10 dark:from-black/60 dark:to-black/30 z-0" />

      {/* Contenido */}
      <div className="relative z-10 max-w-3xl text-center">
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white dark:text-white drop-shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Bienvenido a{" "}
          <motion.span
            className="text-blue-500 dark:text-blue-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            pascal.dev
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-800 dark:text-gray-300 drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          Estrategias inteligentes para monetizar en la era digital con IA,
          tecnología y libertad.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Button size="lg" asChild>
              <Link href="/estrategias" aria-label="Explorar estrategias">
                Explorar Estrategias
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog" aria-label="Leer el blog">
                Leer Blog
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 w-full flex justify-center z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-muted-foreground"
          aria-hidden="true"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}
