import { notFound } from "next/navigation";
import { estrategias } from "@/data/estrategias";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

// ✅ Esta es la corrección importante: props tipado dinámico
type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const estrategia = estrategias.find((item) => item.slug === params.slug);
  return {
    title: estrategia?.title || "Estrategia no encontrada",
    description: estrategia?.description,
  };
}

export default async function Page({ params }: Props) {
  const estrategia = estrategias.find((item) => item.slug === params.slug);

  if (!estrategia) return notFound();

  return (
    <main className="min-h-screen px-4 sm:px-6 py-10 sm:py-16 bg-background text-foreground">
      <article className="max-w-4xl mx-auto animate-fade-in">
        <header className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-2">
            {estrategia.title}
          </h1>
          <p className="text-muted-foreground text-base mb-1">
            Por <span className="font-medium">Pascal Espíritu</span> — Julio 2025
          </p>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {estrategia.description}
          </p>
        </header>

        {/* Publicidad superior */}
        <div className="w-full max-w-3xl mx-auto mb-6">
          <div className="bg-gray-100 dark:bg-gray-800 text-center py-4 rounded-xl text-sm text-muted-foreground">
            Publicidad (728x90)
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-2xl mb-10">
          <Image
            src={estrategia.image}
            alt={estrategia.title}
            width={1200}
            height={600}
            className="w-full h-[300px] sm:h-[450px] object-cover"
            priority
          />
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none text-lg leading-relaxed">
          {/* ... (contenido del artículo completo como ya está) ... */}

          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
            Un blog con IA no es el futuro. Es el presente que todavía no todos están usando.
          </blockquote>

          <div className="flex flex-wrap gap-2 mt-10">
            <Badge variant="outline">IA</Badge>
            <Badge variant="outline">Automatización</Badge>
            <Badge variant="outline">Marketing de Contenidos</Badge>
            <Badge variant="outline">Monetización</Badge>
          </div>

          {/* CTA final */}
          <div className="bg-muted text-center py-8 px-6 rounded-xl mt-16 shadow">
            <h3 className="text-2xl font-semibold mb-3">¿Listo para lanzar tu blog con IA?</h3>
            <p className="mb-4 text-muted-foreground text-base">
              Únete a nuestro boletín gratuito y recibe tutoriales, recursos y estrategias exclusivas cada semana.
            </p>
            <button className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary/90 transition">
              Quiero Empezar Gratis
            </button>
          </div>
        </div>
      </article>
    </main>
  );
}
