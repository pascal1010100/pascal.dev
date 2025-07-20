import { notFound } from "next/navigation";
import Image from "next/image";

const strategies = [
  {
    slug: "blog-automatizado-ia",
    title: "Crea un Blog Automatizado con IA",
    description:
      "Utiliza herramientas como ChatGPT y Notion AI para generar contenido optimizado automáticamente. Monetiza con afiliados, ads o cursos.",
    image: "/images/estrategias/blog-ia.jpg",
  },
  {
    slug: "productos-digitales-ai",
    title: "Vende Productos Digitales con AI",
    description:
      "Diseña ebooks, plantillas o música usando IA generativa como Midjourney o DALL·E. Vende en Gumroad o tu sitio.",
    image: "/images/estrategias/productos-digitales.jpg",
  },
  {
    slug: "consultoria-automatizacion",
    title: "Ofrece Consultoría de Automatización",
    description:
      "Ayuda a negocios a automatizar tareas con Zapier, Make o IA personalizada. Cobrando por servicio o suscripción.",
    image: "/images/estrategias/consultoria-automatizacion.jpg",
  },
  {
    slug: "no-code-app",
    title: "Construye Aplicaciones sin Código",
    description:
      "Usa plataformas como FlutterFlow, Bubble o Softr para crear apps y venderlas o alquilarlas como SaaS.",
    image: "/images/estrategias/no-code-app.jpg",
  },
  {
    slug: "videos-ia",
    title: "Monetiza Videos con Voz de IA",
    description:
      "Genera contenido en YouTube o TikTok usando avatares e inteligencia artificial para narrar ideas virales.",
    image: "/images/estrategias/videos-ia.jpg",
  },
  {
    slug: "chatbots",
    title: "Crea Bots Inteligentes para Negocios",
    description:
      "Desarrolla chatbots con GPT para atención al cliente o generación de leads y véndelos como servicios premium.",
    image: "/images/estrategias/chatbots.jpg",
  },
];

export default function EstrategiaPage({
  params,
}: {
  params: { slug: string };
}) {
  const estrategia = strategies.find((item) => item.slug === params.slug);

  if (!estrategia) return notFound();

  return (
    <main className="min-h-screen px-6 py-20 bg-background">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{estrategia.title}</h1>
        <Image
          src={estrategia.image}
          alt={estrategia.title}
          width={800}
          height={400}
          className="rounded-xl object-cover w-full mb-6"
        />
        <p className="text-lg text-muted-foreground">
          {estrategia.description}
        </p>
      </div>
    </main>
  );
}
