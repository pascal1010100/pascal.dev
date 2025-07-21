import { notFound } from "next/navigation";
import { estrategias } from "@/data/estrategias";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Props = {
  params: {
    slug: string;
  };
};

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
          <h2 className="text-2xl font-semibold mt-8">¿Qué significa tener un blog automatizado?</h2>
          <p>
            Un blog automatizado con IA significa tener una máquina de contenido que trabaja para ti 24/7. Genera artículos, programa publicaciones y hasta posiciona en buscadores sin que tengas que escribir una sola línea cada día.
          </p>

          <h2 className="text-2xl font-semibold mt-10">Paso a paso para crear tu blog con IA</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Elige tu nicho</strong>: educación, salud, tecnología, etc.</li>
            <li><strong>Genera contenido con ChatGPT</strong>: crea artículos, guías y títulos atractivos.</li>
            <li><strong>Organiza todo en Notion AI</strong>: estructura ideas, categorías y calendario.</li>
            <li><strong>Publica automáticamente</strong>: con Zapier, Substack o Notion-to-Blog.</li>
          </ol>

          {/* Anuncio medio contenido */}
          <div className="w-full max-w-3xl mx-auto my-8">
            <div className="bg-gray-100 dark:bg-gray-800 text-center py-4 rounded-xl text-sm text-muted-foreground">
              Publicidad relacionada (468x60)
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-10">Monetiza desde el primer mes</h2>
          <p>
            Agrega enlaces de afiliados, publicidad contextual (como Google AdSense) o promociona tus propios productos digitales. Incluso puedes convertir tu blog en un boletín pago con plataformas como Beehiiv.
          </p>

          <h2 className="text-2xl font-semibold mt-10">Lo que nadie te dice</h2>
          <p>
            El verdadero valor de un blog automatizado no es solo el dinero, sino el tiempo libre que te da para crear, viajar o simplemente descansar. Empiezas escribiendo para vivir, y terminas dejando que el blog escriba por ti.
          </p>

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
