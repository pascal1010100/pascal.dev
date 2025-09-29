"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight, Clock, Zap, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroFeaturedStrategyCardProps {
  className?: string;
  title?: string;
  description?: string;
  timeEstimate?: string;
  difficulty?: 'Principiante' | 'Intermedio' | 'Avanzado';
  href?: string;
}

export default function HeroFeaturedStrategyCard({
  className,
  title = "Blog Automatizado con IA",
  description = "Flujo completo desde Notion hasta la publicación automática con generación de contenido por IA y optimización SEO.",
  timeEstimate = "90 min",
  difficulty = "Intermedio",
  href = "/estrategias/blog-automatizado-ia"
}: HeroFeaturedStrategyCardProps) {
  const difficultyColors = {
    Principiante: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Intermedio: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Avanzado: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
  };

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300",
        "border-border/50 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5",
        "dark:border-muted/30 dark:hover:border-primary/40 dark:bg-gradient-to-br dark:from-card dark:to-card/80",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative elements */}
      <div className="absolute right-4 top-4 z-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary/80 dark:bg-primary/20 dark:text-primary/90">
          <Sparkles className="h-5 w-5" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Badge */}
        <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary-foreground">
          <Zap className="mr-1.5 h-3.5 w-3.5" />
          Estrategia destacada
        </div>

        {/* Title and description */}
        <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h3>
        
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
          {description}
        </p>

        {/* Metadata */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center
            rounded-full bg-muted/50 px-3 py-1.5
            dark:bg-muted/30">
            <Clock className="mr-1.5 h-3.5 w-3.5" />
            {timeEstimate}
          </div>
          
          <div className={cn(
            "flex items-center rounded-full px-3 py-1.5 font-medium",
            difficultyColors[difficulty as keyof typeof difficultyColors]
          )}>
            <BarChart2 className="mr-1.5 h-3.5 w-3.5" />
            {difficulty}
          </div>
        </div>

        {/* CTA */}
        <Link 
          href={href}
          className="group/button inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 group-hover/button:after:w-full">
            Ver estrategia completa
          </span>
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
        </Link>
      </div>
      
      {/* Subtle gradient background effect */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
    </motion.div>
  );
}
