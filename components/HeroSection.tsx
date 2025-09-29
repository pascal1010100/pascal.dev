"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Globe, Code, BarChart2 } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import dynamic from "next/dynamic";

// Componentes dinámicos con carga optimizada
const HeroQuickStartCard = dynamic(() => import("./hero/HeroQuickStartCard"), {
  loading: () => <div className="h-32 bg-muted/50 rounded-lg animate-pulse" />,
});

const HeroFeaturedStrategyCard = dynamic(() => import("./hero/HeroFeaturedStrategyCard"), {
  loading: () => <div className="h-32 bg-muted/50 rounded-lg animate-pulse mt-4" />,
});

const HeroBackground = dynamic(() => import("./HeroBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />,
});

// Configuración de características
const features = [
  { icon: <Zap className="h-5 w-5" />, text: "Estrategias probadas" },
  { icon: <Code className="h-5 w-5" />, text: "Código abierto" },
  { icon: <Globe className="h-5 w-5" />, text: "Comunidad global" },
  { icon: <BarChart2 className="h-5 w-5" />, text: "Métricas en tiempo real" }
] as const;

export default function HeroSection() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Configuración de animaciones
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  } as const;

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] // easeOutQuart
      }
    }
  } as const;

  return (
    <section 
      ref={ref}
      className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Inicio - Estrategias de automatización con IA"
    >
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Contenido principal */}
          <motion.div
            className="w-full max-w-3xl mx-auto lg:mx-0"
            initial="hidden"
            animate={controls}
            variants={container}
          >
            {/* Badge destacado */}
            <motion.div 
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              <span>Nuevo: Estrategias con IA 2025</span>
            </motion.div>
            
            {/* Título principal */}
            <motion.h1 
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground"
            >
              Domina la era digital
              <span className="block text-primary mt-2">con IA y automatización</span>
            </motion.h1>
            
            {/* Descripción */}
            <motion.p 
              variants={item}
              className="mt-6 text-lg text-muted-foreground"
            >
              Estrategias prácticas para crear ingresos pasivos y vivir con libertad geográfica.
            </motion.p>

            {/* Características */}
            <motion.div 
              variants={item}
              className="mt-8 grid grid-cols-2 sm:flex flex-wrap gap-3"
            >
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-lg text-sm"
                >
                  <span className="text-primary">{feature.icon}</span>
                  <span className="text-foreground/90">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Botones de acción */}
            <motion.div 
              variants={item}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="h-12 px-8 text-base group"
                asChild
              >
                <Link href="/estrategias" className="inline-flex items-center">
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-12 px-6 text-base group"
                asChild
              >
                <Link href="/blog" className="inline-flex items-center">
                  Ver casos de éxito
                </Link>
              </Button>
            </motion.div>

            {/* Tarjetas informativas */}
            <motion.div 
              variants={item}
              className="mt-8 grid sm:grid-cols-2 gap-4 w-full"
            >
              <HeroQuickStartCard 
                className="h-full border-2 border-transparent hover:border-primary/20 transition-colors"
              />
              <HeroFeaturedStrategyCard 
                className="h-full"
                title="Blog Automatizado con IA"
                description="Aprende a crear un blog autónomo que genera contenido con IA y te brinda ingresos pasivos."
                timeEstimate="60 min"
                difficulty="Intermedio"
                href="/estrategias/blog-automatizado-ia"
              />
            </motion.div>
          </motion.div>

          {/* Panel con animación */}
          <motion.div 
            className="relative w-full h-[400px] lg:h-[600px] rounded-2xl overflow-hidden border border-border/20"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1] 
              } 
            }}
          >
            <div className="absolute inset-0">
              <HeroBackground />
            </div>
            
            {/* Efecto de vidrio esmerilado */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/5 to-background/30 backdrop-blur-[1px]" />
            
            {/* Contenido flotante */}
            <motion.div 
              className="absolute bottom-6 left-6 right-6 p-5 bg-background/90 backdrop-blur-sm rounded-xl border border-border/20 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: 0, 
                opacity: 1,
                transition: { 
                  delay: 0.8, 
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1]
                } 
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-medium text-foreground/90">En vivo: 1.2K usuarios</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Únete a nuestra comunidad de emprendedores digitales.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
