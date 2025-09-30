"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Sparkles } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Importar el fondo mejorado
const HeroBackground = dynamic(
  () => import('./HeroBackground'),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background/50" />
  }
);

const features = [
  { 
    icon: <Sparkles className="h-4 w-4" />, 
    text: 'Automatización' 
  },
  { 
    icon: <Code className="h-4 w-4" />, 
    text: 'Desarrollo Web' 
  },
  { 
    icon: <ArrowRight className="h-4 w-4" />, 
    text: 'Estrategias' 
  },
  { 
    icon: <div className="h-4 w-4 rounded-full bg-primary" />, 
    text: 'IA Avanzada' 
  },
];

export default function HeroSection() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // easeOutQuart mejorado
        staggerChildren: 0.1
      }
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  } as const;

  const buttonHover = {
    hover: {
      scale: 1.02,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative overflow-hidden py-16 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center z-10"
      aria-label="Inicio - Estrategias de automatización con IA"
    >
      {/* Fondo animado mejorado */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/10 dark:to-primary/5" />
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/10 to-background/30" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Contenido principal - Ocupa 7/12 en pantallas grandes */}
          <motion.div
            className="lg:col-span-7 xl:col-span-6"
            initial="hidden"
            animate={controls}
            variants={container}
          >
            {/* Badge destacado */}
            <motion.div 
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-pulse hover:animate-none transition-all duration-300"
            >
              <Sparkles className="h-4 w-4 flex-shrink-0" />
              <span>Nuevo: Estrategias con IA 2025</span>
            </motion.div>
            
            {/* Título principal */}
            <motion.h1 
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-foreground"
            >
              Domina la era digital
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 mt-2">
                con IA y automatización
              </span>
            </motion.h1>
            
            {/* Descripción */}
            <motion.p 
              variants={item}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl"
            >
              Estrategias prácticas para crear ingresos pasivos y vivir con libertad geográfica.
              <span className="block mt-2 text-sm text-muted-foreground/80">
                Sin tecnicismos, solo resultados reales y comprobados.
              </span>
            </motion.p>

            {/* Características */}
            <motion.div 
              variants={item}
              className="mt-8 grid grid-cols-2 md:flex flex-wrap gap-3 max-w-2xl"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted/80 rounded-lg text-sm transition-all duration-200 cursor-default"
                >
                  <span className="text-primary flex-shrink-0">{feature.icon}</span>
                  <span className="text-foreground/90 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Botones de acción */}
            <motion.div 
              variants={item}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover="hover"
                variants={buttonHover}
                initial={false}
                className="relative"
              >
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-base group relative overflow-hidden"
                  asChild
                >
                  <Link 
                    href="/estrategias" 
                    className="inline-flex items-center relative z-10"
                  >
                    <span className="relative z-10 flex items-center">
                      Comenzar ahora
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500"></span>
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover="hover"
                variants={{
                  hover: {
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }
                }}
                className="relative"
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 px-8 text-base group border-2"
                  asChild
                >
                  <Link href="/blog" className="inline-flex items-center">
                    Ver casos de éxito
                    <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Panel de demostración - Ocupa 5/12 en pantallas grandes */}
            <motion.div 
              className="lg:col-span-5 xl:col-span-6 relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden border border-border/20 shadow-2xl bg-background/50 backdrop-blur-md group"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.2
                } 
              }}
              whileHover={{ 
                y: -10,
                scale: 1.01,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transition: { 
                  duration: 0.4,
                  ease: 'easeOut'
                }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { 
                  duration: 0.2,
                  ease: 'easeOut'
                }
              }}
            >
            {/* Efecto de vidrio esmerilado */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/10 to-background/20 dark:from-background/40 dark:via-background/20 dark:to-background/30 backdrop-blur-sm" />
            
              {/* Contenido informativo */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <Code className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Automatización con IA</h3>
                <p className="text-muted-foreground mb-6">
                  Descubre cómo la inteligencia artificial puede potenciar tus proyectos
                </p>
                <Button variant="outline" asChild>
                  <Link href="/estrategias/ia">
                    Explorar estrategias
                  </Link>
                </Button>
              </div>
              
              {/* Efecto de gradiente sutil */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-70" />
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl opacity-50" />
            </motion.div>
        </div>
      </div>
    </section>
  );
}
