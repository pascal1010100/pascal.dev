"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface StrategyHeroProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
}

export function StrategyHero({ searchTerm, onSearchChange, onClearSearch }: StrategyHeroProps) {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-grid-[#e5e7eb] dark:bg-grid-[#1f2937] [mask-image:linear-gradient(to_bottom,transparent,white_90%,white)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge de categoría */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-6"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Estrategias Digitales
          </motion.div>

          {/* Título principal */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Domina el Juego Digital con 
            <span className="relative">
              <span className="relative z-10">Estrategias que Funcionan</span>
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-primary/20 -rotate-1 -z-0" />
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Descubre tácticas probadas, casos de estudio y herramientas para llevar tu negocio al siguiente nivel en el mundo digital.
          </motion.p>

          {/* Barra de búsqueda */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Buscar estrategias (ej: redes sociales, SEO, email marketing...)"
                className="block w-full pl-11 pr-10 py-3.5 text-sm bg-background/80 backdrop-blur-sm border border-border/50 hover:border-border/70 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200 outline-none shadow-sm"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={onClearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Limpiar búsqueda</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              )}
            </div>
            <div className="mt-3 text-xs text-muted-foreground/70">
              Prueba con: <button onClick={() => onSearchChange('redes sociales')} className="text-primary hover:underline">redes sociales</button>, 
              <button onClick={() => onSearchChange('SEO')} className="text-primary hover:underline ml-1">SEO</button>, 
              <button onClick={() => onSearchChange('email marketing')} className="text-primary hover:underline ml-1">email marketing</button>
            </div>
          </motion.div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute -bottom-24 left-20 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
}
