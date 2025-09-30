import { Estrategia } from '@/app/estrategias/types/estrategia';

export const estrategias: Estrategia[] = [
  {
    slug: "blog-automatizado-ia",
    title: "Blog Automatizado con IA",
    description: "Sistema automatizado para generar y monetizar contenido con IA, generando ingresos pasivos con mínimo esfuerzo.",
    image: "/images/estrategias/blog-ia.jpg",
    category: "Automatización",
    date: "2025-07-15",
    content: "Contenido detallado sobre cómo crear un blog automatizado con IA...",
    tags: ["IA", "Automatización", "Blogging", "Monetización"],
    difficulty: "Intermedio",
    readTime: "8 min",
    features: [
      "Generación automática de artículos con IA",
      "Programación de publicaciones",
      "Optimización SEO automática",
      "Monetización integrada"
    ],
    tools: [
      { name: "ChatGPT", description: "Generación de contenido" },
      { name: "Notion AI", description: "Organización de contenido" },
      { name: "Zapier", description: "Automatización de flujos de trabajo" }
    ],
    automationTools: ["ChatGPT", "Notion AI", "Zapier", "WordPress"],
    pricingStrategy: {
      model: "Recurrente",
      description: "Suscripciones premium y publicidad"
    },
    revenuePotential: {
      min: 1,
      max: 20,
      currency: "USD",
      period: "mes"
    },
    successStory: {
      example: "Blog de recetas con IA",
      result: "$5K/mes en 6 meses"
    }
  },
  {
    slug: "productos-digitales-ai",
    title: "Productos Digitales con IA",
    description: "Crea y vende productos digitales únicos generados con IA, desde ebooks hasta recursos creativos.",
    image: "/images/estrategias/productos-digitales.jpg",
    category: "Productos Digitales",
    date: "2025-07-10",
    content: "Guía completa para crear y vender productos digitales utilizando IA...",
    tags: ["IA Generativa", "Productos Digitales", "Monetización"],
    difficulty: "Principiante",
    readTime: "6 min",
    features: [
      "Creación de productos con IA generativa",
      "Tienda en línea automatizada",
      "Sistema de entrega automática",
      "Escalabilidad ilimitada"
    ],
    tools: [
      { name: "Midjourney", description: "Generación de imágenes" },
      { name: "Gumroad", description: "Plataforma de ventas" },
      { name: "Stripe", description: "Procesamiento de pagos" }
    ],
    automationTools: ["Midjourney", "DALL·E", "Canva", "Gumroad"],
    pricingStrategy: {
      model: "Unico",
      description: "Pago único por producto digital"
    },
    revenuePotential: {
      min: 0.5,
      max: 50,
      currency: "USD",
      period: "mes"
    },
    successStory: {
      example: "Plantillas de presentaciones con IA",
      result: "$2.5K en ventas el primer mes"
    }
  },
  {
    slug: "cursos-online-automatizados",
    title: "Cursos Online Automatizados",
    description: "Sistema para crear y vender cursos en línea con lecciones generadas por IA y corrección automática.",
    image: "/images/estrategias/cursos-online.jpg",
    category: "Educación",
    date: "2025-08-05",
    tags: ["IA", "Educación", "Automatización", "Cursos"],
    difficulty: "Avanzado",
    readTime: "10 min",
    features: [
      "Generación de contenido del curso con IA",
      "Sistema de evaluación automática",
      "Certificados personalizados",
      "Integración con plataformas de pago"
    ],
    tools: [
      { name: "Teachable", description: "Plataforma de cursos" },
      { name: "GPT-4", description: "Generación de contenido" },
      { name: "Zapier", description: "Automatización" }
    ],
    automationTools: ["Teachable", "GPT-4", "Zapier", "Stripe"],
    pricingStrategy: {
      model: "Suscripción",
      description: "Acceso mensual a la biblioteca de cursos"
    },
    revenuePotential: {
      min: 3,
      max: 100,
      currency: "USD",
      period: "mes"
    },
    successStory: {
      example: "Academia de fotografía con IA",
      result: "$15K/mes en suscripciones"
    }
  },
  {
    slug: "chatbots-para-empresas",
    title: "Chatbots para Empresas",
    description: "Crea y vende chatbots personalizados para negocios locales usando IA conversacional sin necesidad de programación.",
    image: "/images/estrategias/chatbot.jpg",
    category: "Automatización",
    date: "2025-08-12",
    tags: ["Chatbots", "IA", "Automatización", "Servicios"],
    difficulty: "Intermedio",
    readTime: "7 min",
    features: [
      "Integración con WhatsApp y Messenger",
      "Entrenamiento con IA",
      "Análisis de conversaciones",
      "Soporte multilingüe"
    ],
    tools: [
      { name: "ManyChat", description: "Plataforma de chatbots" },
      { name: "OpenAI", description: "IA conversacional" },
      { name: "Zapier", description: "Integraciones" }
    ],
    automationTools: ["ManyChat", "OpenAI", "Zapier", "Google Sheets"],
    pricingStrategy: {
      model: "Recurrente",
      description: "Membresía mensual por chatbot"
    },
    revenuePotential: {
      min: 50,
      max: 500,
      currency: "USD",
      period: "mes"
    },
    successStory: {
      example: "Chatbot para restaurantes",
      result: "$3K/mes con 10 clientes"
    }
  },
  {
    slug: "marketplace-ia",
    title: "Marketplace de Productos con IA",
    description: "Plataforma para vender productos digitales generados por IA, con sistema de recomendaciones inteligentes.",
    image: "/images/estrategias/marketplace.jpg",
    category: "E-commerce",
    date: "2025-09-01",
    tags: ["Marketplace", "IA", "E-commerce", "Automatización"],
    difficulty: "Avanzado",
    readTime: "12 min",
    features: [
      "Generación de productos con IA",
      "Sistema de recomendaciones",
      "Pagos automatizados",
      "Panel de control para vendedores"
    ],
    tools: [
      { name: "Bubble", description: "Plataforma sin código" },
      { name: "Stripe", description: "Pagos" },
      { name: "OpenAI", description: "Recomendaciones" }
    ],
    automationTools: ["Bubble", "Stripe", "OpenAI", "AWS"],
    pricingStrategy: {
      model: "Freemium",
      description: "Comisión por venta + membresías premium"
    },
    revenuePotential: {
      min: 10,
      max: 50,
      currency: "USD",
      period: "mes"
    },
    successStory: {
      example: "Marketplace de arte con IA",
      result: "$25K en ventas el primer trimestre"
    }
  }
];
