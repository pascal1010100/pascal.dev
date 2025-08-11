"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Compass } from "lucide-react";

export default function HeroQuickStartCard() {
  return (
    <motion.div
      className="p-5 rounded-xl border shadow-sm backdrop-blur bg-background/60
                 border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Compass className="h-4 w-4 text-cyan-400" />
        <h3 className="text-base font-semibold">Empieza aquí</h3>
      </div>

      <ol className="space-y-2 text-sm text-muted-foreground">
        <li>1. <Link href="/estrategias" className="text-primary hover:underline">Explora estrategias</Link></li>
        <li>2. <Link href="/blog" className="text-primary hover:underline">Lee el blog</Link></li>
        <li>3. <Link href="#newsletter" className="text-primary hover:underline">Suscríbete</Link></li>
      </ol>
    </motion.div>
  );
}
