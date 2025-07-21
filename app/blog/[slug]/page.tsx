"use client";

import { notFound } from "next/navigation";
import { estrategias } from "@/data/estrategias";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: {
    slug: string;
  };
}

export default function EstrategiaDetallePage({ params }: Props) {
  const estrategia = estrategias.find((item) => item.slug === params.slug);

  if (!estrategia) return notFound();

  return (
    <main className="min-h-screen px-6 py-16 bg-background text-foreground">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 text-center">
          {estrategia.title}
        </h1>

        <p className="text-muted-foreground text-lg text-center mb-8">
          {estrategia.description}
        </p>

        <div className="overflow-hidden rounded-2xl shadow-lg mb-10">
          <Image
            src={estrategia.image}
            alt={estrategia.title}
            width={1200}
            height={600}
            className="w-full h-[300px] sm:h-[400px] object-cover"
            priority
          />
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed">
          <h2 className="text-2xl font-semibold mt-8">¿Cómo funciona esta estrategia?</h2>
          <p>
            Esta estrategia consiste en aprovechar herramientas de IA como ChatGPT,
            Notion AI y otras, para generar contenido automáticamente, programarlo
            y publicarlo de forma continua. Es ideal para personas que quieren crear
            un blog sin necesidad de escribir manualmente.
          </p>

          <h2 className="text-2xl font-semibold mt-10">Herramientas recomendadas</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>ChatGPT</strong> – Para generar ideas, títulos y contenido.</li>
            <li><strong>Notion AI</strong> – Para organizar artículos y automatizar redacción.</li>
            <li><strong>Zapier</strong> – Para automatizar la publicación en CMS o redes.</li>
            <li><strong>WordPress o Notion como CMS</strong> – Para mostrar el blog públicamente.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-10">¿Para quién es esta estrategia?</h2>
          <p>
            Ideal para creadores, educadores, freelancers, marketers o cualquier persona
            que quiera tener una presencia digital constante sin estar escribiendo todo el tiempo.
          </p>

          <blockquote>
            La IA no reemplaza al escritor, potencia su productividad.
          </blockquote>

          <div className="flex flex-wrap gap-2 mt-10">
            <Badge variant="outline">IA</Badge>
            <Badge variant="outline">Automatización</Badge>
            <Badge variant="outline">Blogging</Badge>
            <Badge variant="outline">Productividad</Badge>
          </div>
        </div>
      </article>
    </main>
  );
}
