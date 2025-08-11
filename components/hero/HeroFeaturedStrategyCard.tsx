"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function HeroFeaturedStrategyCard() {
  return (
    <motion.div
      className="p-5 rounded-xl border shadow-sm backdrop-blur bg-background/60
                 border-sky-500/20 hover:border-sky-500/40 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08, duration: 0.45 }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="h-4 w-4 text-sky-400" />
        <h3 className="text-base font-semibold">Estrategia destacada</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-3">
        Crea un Blog Automatizado con IA: Notion → generación → SEO → distribución.
      </p>

      <div className="flex items-center gap-2">
        <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]
                         border-sky-500/30 text-sky-300/90">Setup 90 min</span>
        <Link href="/estrategias/blog-automatizado-ia" className="text-primary text-sm hover:underline">
          Leer en 3 min →
        </Link>
      </div>
    </motion.div>
  );
}
