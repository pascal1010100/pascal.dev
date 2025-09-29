"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroQuickStartCardProps {
  className?: string;
}

export default function HeroQuickStartCard({ className }: HeroQuickStartCardProps) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 h-full",
        "border-border/50 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5",
        "dark:border-muted/30 dark:hover:border-primary/40 dark:bg-gradient-to-br dark:from-card dark:to-card/80",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Decorative elements */}
      <div className="absolute right-4 top-4 z-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary/80 dark:bg-primary/20 dark:text-primary/90">
          <Compass className="h-5 w-5" />
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary dark:bg-primary/20 dark:text-primary-foreground">
          <Compass className="mr-1.5 h-3.5 w-3.5" />
          Guía Rápida
        </div>

        <h3 className="mb-4 text-xl font-bold tracking-tight text-foreground">
          Empieza tu viaje
        </h3>
        
        <div className="flex-1 space-y-3">
          {[
            { text: "Explora estrategias", href: "/estrategias" },
            { text: "Aprende con el blog", href: "/blog" },
            { text: "Únete a la comunidad", href: "/comunidad" }
          ].map((item, index) => (
            <Link 
              key={index} 
              href={item.href}
              className="group/link flex items-center justify-between rounded-lg p-2 -mx-2 text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              <span className="flex items-center">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-xs font-medium mr-3">
                  {index + 1}
                </span>
                {item.text}
              </span>
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover/link:opacity-100 group-hover/link:translate-x-0" />
            </Link>
          ))}
        </div>
      </div>
      
      {/* Subtle gradient background effect */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/5 blur-3xl dark:bg-primary/10" />
    </motion.div>
  );
}
