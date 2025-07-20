"use client";

import Image from "next/image";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const strategies = [
  {
    title: "Crea un Blog Automatizado con IA",
    description: "Utiliza herramientas como ChatGPT y Notion AI para generar contenido optimizado automáticamente. Monetiza con afiliados, ads o cursos.",
    image: "/images/estrategias/blog-ia.jpg",
  },
  {
    title: "Vende Productos Digitales con AI",
    description: "Diseña ebooks, plantillas o música usando IA generativa como Midjourney o DALL·E. Vende en Gumroad o tu sitio.",
    image: "/images/estrategias/productos-digitales.jpg",
  },
  {
    title: "Ofrece Consultoría de Automatización",
    description: "Ayuda a negocios a automatizar tareas con Zapier, Make o IA personalizada. Cobrando por servicio o suscripción.",
    image: "/images/estrategias/consultoria-automatizacion.jpg",
  },
  {
    title: "Construye Aplicaciones sin Código",
    description: "Usa plataformas como FlutterFlow, Bubble o Softr para crear apps y venderlas o alquilarlas como SaaS.",
    image: "/images/estrategias/no-code-app.jpg",
  },
  {
    title: "Monetiza Videos con Voz de IA",
    description: "Genera contenido en YouTube o TikTok usando avatares e inteligencia artificial para narrar ideas virales.",
    image: "/images/estrategias/videos-ia.jpg",
  },
  {
    title: "Crea Bots Inteligentes para Negocios",
    description: "Desarrolla chatbots con GPT para atención al cliente o generación de leads y véndelos como servicios premium.",
    image: "/images/estrategias/chatbots.jpg",
  },
];

export default function EstrategiasPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-background">
      <section className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Estrategias para Monetizar con Tecnología e IA</h1>
        <p className="text-muted-foreground mb-12 text-lg">
          Descubre formas inteligentes y reales de generar ingresos aprovechando el poder de la inteligencia artificial.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.map((strategy, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
              <Image
                src={strategy.image}
                alt={strategy.title}
                width={500}
                height={300}
                className="rounded-t-xl object-cover w-full h-52"
              />
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{strategy.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {strategy.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
