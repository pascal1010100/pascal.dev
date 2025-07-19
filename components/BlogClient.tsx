"use client";

import React from "react";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
};

const posts: Post[] = [
  {
    slug: "como-monetizar-con-ia",
    title: "Cómo monetizar con IA en 2025",
    excerpt:
      "Descubre las mejores técnicas para ganar dinero con inteligencia artificial en el mundo digital actual...",
    author: "José Martínez",
    date: "2025-07-10",
    image: "/images/monetizar-ia.jpg",
  },
  {
    slug: "vida-nomada-digital",
    title: "Vida Nómada Digital: Trabaja desde cualquier lugar",
    excerpt:
      "Consejos y herramientas para mantener tu trabajo en remoto sin importar dónde estés...",
    author: "Ana López",
    date: "2025-06-25",
    image: "/images/nomada-digital.jpg",
  },
  {
    slug: "marketing-de-afiliados-exitoso",
    title: "Marketing de Afiliados: Estrategias para el éxito",
    excerpt:
      "Aprende cómo construir ingresos pasivos con técnicas de marketing de afiliados efectivas y comprobadas.",
    author: "Carlos Pérez",
    date: "2025-07-05",
    image: "/images/marketing-afiliados.jpg",
  },
];

export default function BlogClient() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-extrabold text-center mb-16 text-primary">
        Blog de pascal.dev
      </h1>

      <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(({ slug, title, excerpt, author, date, image }) => (
          <article
            key={slug}
            className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <Link href={`/blog/${slug}`} aria-label={`Leer artículo: ${title}`}>
              <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={image}
                  alt={`Imagen del artículo ${title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
              <Link href={`/blog/${slug}`} className="hover:underline">
                <h2 className="text-2xl font-semibold mb-3 leading-snug">{title}</h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">{excerpt}</p>
              <div className="mt-6 flex justify-between items-center text-sm text-gray-400 dark:text-gray-500 font-medium">
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span>Por {author}</span>
              </div>
              <Link
                href={`/blog/${slug}`}
                className="mt-6 inline-block text-primary font-semibold hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                aria-label={`Leer más sobre ${title}`}
              >
                Leer más &rarr;
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
