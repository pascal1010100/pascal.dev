"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type Post = {
  slug: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
};

const posts: Post[] = [
  {
    slug: "como-monetizar-con-ia",
    title: "Cómo monetizar con IA en 2025",
    content: `
      <p>La inteligencia artificial es la clave para generar ingresos en el futuro cercano...</p>
      <p>En este artículo descubrirás tácticas comprobadas y herramientas que puedes usar hoy mismo...</p>
    `,
    author: "José Martínez",
    date: "2025-07-10",
    image: "/images/monetizar-ia.jpg",
  },
  {
    slug: "vida-nomada-digital",
    title: "Vida Nómada Digital: Trabaja desde cualquier lugar",
    content: `
      <p>Trabajar mientras viajas es posible y cada vez más sencillo con las tecnologías actuales...</p>
      <p>Aprende cómo organizar tu vida laboral para mantener productividad en remoto.</p>
    `,
    author: "Ana López",
    date: "2025-06-25",
    image: "/images/nomada-digital.jpg",
  },
];

export default function PostPage() {
  const params = useParams();
  const { slug } = params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">Post no encontrado</h1>
        <Link
          href="/blog"
          className="text-primary hover:underline font-semibold"
          aria-label="Volver al blog"
        >
          &larr; Volver al blog
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-extrabold mb-4 text-primary">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Publicado el{" "}
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>{" "}
        por {post.author}
      </p>
      <img
        src={post.image}
        alt={`Imagen del artículo ${post.title}`}
        className="rounded-2xl mb-10 w-full h-64 object-cover"
        loading="lazy"
      />
      <article
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <Link
        href="/blog"
        className="inline-block mt-12 text-primary font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
        aria-label="Volver al blog"
      >
        &larr; Volver al blog
      </Link>
    </main>
  );
}
