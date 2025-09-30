"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Globe, Lightbulb, DollarSign, Sparkles } from "lucide-react";

// Animaciones
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 },
  },
};

const categories = [
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Estrategias de Monetización",
    description: "Tácticas comprobadas para ganar dinero con IA y herramientas digitales.",
    href: "/categorias/monetizacion",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Vida Nómada Digital",
    description: "Recursos y hacks para trabajar desde cualquier parte del mundo.",
    href: "/categorias/nomadas-digitales",
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Innovación Tecnológica",
    description: "Tendencias tecnológicas, startups y herramientas emergentes.",
    href: "/categorias/innovacion",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Marketing de Afiliados",
    description: "Multiplica tus ingresos con las mejores estrategias de afiliación.",
    href: "/categorias/afiliados",
  },
];

function CategoryCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <motion.div
      variants={item}
      whileHover="hover"
      className="h-full"
    >
      <Card 
        className="h-full p-6 flex flex-col items-center text-center hover:shadow-xl 
                 transition-all duration-300 rounded-2xl border border-border/30 
                 bg-background/50 backdrop-blur-sm hover:bg-background/80 hover:border-primary/20
                 group relative overflow-hidden"
      >
        {/* Efecto de brillo al hacer hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Icono con efecto de flotación */}
        <motion.div 
          className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 
                    text-primary mb-6 shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
          whileHover={{ 
            y: -5,
            scale: 1.05,
            rotate: [0, -5, 5, -5, 5, 0],
            transition: { duration: 0.5 }
          }}
        >
          {icon}
        </motion.div>
        
        <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          {description}
        </p>
        
        <Button 
          variant="ghost" 
          asChild 
          className="mt-auto group-hover:bg-primary/10 transition-colors duration-300"
        >
          <Link href={href} className="group/button flex items-center">
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover/button:translate-x-1">
                Explorar categoría
              </span>
              <ArrowRight className="ml-2 h-4 w-4 inline-block transition-all duration-300 transform group-hover/button:translate-x-1" />
            </span>
          </Link>
        </Button>
        
        {/* Efecto de partículas decorativas */}
        <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-500" />
        <div className="absolute -top-2 -left-2 h-8 w-8 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-500" />
      </Card>
    </motion.div>
  );
}

export default function CategoriesSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Encabezado con animación */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>Explora nuestro contenido</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent mb-4">
            Descubre Nuestras Categorías
          </h2>
          <p className="text-muted-foreground text-lg">
            Explora nuestros temas principales y encuentra el contenido que más se adapte a tus intereses y necesidades.
          </p>
        </motion.div>
        
        {/* Grid de categorías */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </motion.div>
        
        {/* CTA al final */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Button size="lg" className="group relative overflow-hidden">
            <span className="relative z-10 flex items-center">
              Ver todas las categorías
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
