"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// tarjetas (ruta relativa porque no usas /src)
import HeroQuickStartCard from "./hero/HeroQuickStartCard";
import HeroFeaturedStrategyCard from "./hero/HeroFeaturedStrategyCard";

// Canvas p5 en panel derecho (no como fondo de toda la sección)
const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8
                 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950"
      aria-label="Sección principal de bienvenida"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* IZQUIERDA: copy + CTAs + tarjetas */}
        <div>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Monetiza con IA y vive libre desde donde quieras.
          </motion.h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            Estrategias reales, proyectos prácticos y herramientas para creadores y nómadas digitales.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Button size="lg" asChild>
                <Link href="/estrategias" aria-label="Explorar estrategias">
                  Explorar Estrategias <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog" aria-label="Leer el blog">Ver Blog</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Tarjetas */}
          <div className="mt-8 space-y-4">
            <HeroQuickStartCard />
            <HeroFeaturedStrategyCard />
          </div>
        </div>

        {/* DERECHA: panel con animación p5 */}
        <div className="relative h-[360px] sm:h-[420px] lg:h-[520px] rounded-2xl overflow-hidden
                        border border-white/10 dark:border-white/5">
          <HeroBackground />
          {/* Overlay para contraste dentro del panel */}
          <div className="pointer-events-none absolute inset-0
                          bg-gradient-to-b from-black/30 via-transparent to-black/25
                          dark:from-black/50" />
          {/* Glow sutil en borde */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        </div>
      </div>
    </section>
  );
}
