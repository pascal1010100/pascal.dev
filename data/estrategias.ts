export interface Estrategia {
  slug: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  content?: string;
  date?: string;
  tags?: string[];
}

export const estrategias: Estrategia[] = [
  {
    slug: "blog-automatizado-ia",
    title: "Crea un Blog Automatizado con IA",
    description: "Utiliza herramientas como ChatGPT y Notion AI para generar contenido optimizado automáticamente. Monetiza con afiliados, ads o cursos.",
    image: "/images/estrategias/blog-ia.jpg",
    category: "Automatización",
    date: "2025-07-15",
    content: "Contenido detallado sobre cómo crear un blog automatizado con IA...",
    tags: ["IA", "Automatización", "Blogging", "Monetización"]
  },
  {
    slug: "productos-digitales-ai",
    title: "Vende Productos Digitales con AI",
    description: "Diseña ebooks, plantillas o música usando IA generativa como Midjourney o DALL·E. Vende en Gumroad o tu sitio.",
    image: "/images/estrategias/productos-digitales.jpg",
    category: "Productos Digitales",
    date: "2025-07-10",
    content: "Guía completa para crear y vender productos digitales utilizando IA...",
    tags: ["IA Generativa", "Productos Digitales", "Monetización"]
  },
  // Agrega más estrategias aquí si quieres
];
