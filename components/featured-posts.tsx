"use client";

import { motion } from "framer-motion";

const featuredArticles = [
  {
    title: "Cómo ganar dinero con inteligencia artificial",
    excerpt: "Explora estrategias reales para monetizar herramientas de IA como ChatGPT, Midjourney y más.",
    link: "/articulos/inteligencia-artificial-monetizacion",
  },
  {
    title: "Top 5 apps para nómadas digitales en 2025",
    excerpt: "Productividad, finanzas y conexión: estas apps te facilitarán la vida viajando por el mundo.",
    link: "/articulos/apps-nomadas-2025",
  },
  {
    title: "¿Vale la pena invertir en cripto en 2025?",
    excerpt: "Un análisis moderno y técnico sobre oportunidades reales en blockchain este año.",
    link: "/articulos/cripto-2025",
  },
];

export default function FeaturedPosts() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold tracking-tight mb-12">
          Artículos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-muted shadow-md hover:shadow-xl transition-all bg-card p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {article.title}
                </h3>
                <p className="text-muted-foreground mb-6">{article.excerpt}</p>
              </div>
              <a
                href={article.link}
                className="mt-auto inline-block text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
              >
                Leer más →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
