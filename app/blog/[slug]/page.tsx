

import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import Image from "next/image";

// ✅ para rutas dinámicas en Next 13–15 con App Router
type Props = {
  params: { slug: string };
};


export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="bg-background text-foreground px-4 sm:px-6 lg:px-8 py-12">
      <article className="max-w-4xl mx-auto space-y-12">
        {/* Encabezado */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground">Publicado en Julio 2025 por Pascal Espíritu</p>
        </header>

        {/* Imagen destacada */}
        <div className="w-full overflow-hidden rounded-2xl shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>

        {/* Publicidad superior */}
        <div className="bg-muted text-center py-6 rounded-xl text-sm text-muted-foreground shadow">
          📢 Espacio para Anuncio Premium (728x90)
        </div>

        {/* Contenido del artículo */}
        <section className="prose prose-neutral dark:prose-invert max-w-none prose-lg mx-auto leading-relaxed">
          <p>
            La inteligencia artificial generativa como ChatGPT ha revolucionado la manera en que las personas crean contenido, lanzan negocios y ganan dinero. En este artículo exploraremos cómo puedes aprovechar su poder para generar ingresos desde casa en 2025.
          </p>

          <h2>🔍 ¿Por qué ChatGPT en 2025?</h2>
          <p>
            Las nuevas actualizaciones y capacidades multimodales de GPT permiten automatizar tareas, producir contenido viral y construir productos digitales sin necesidad de saber programar. Es una herramienta ideal para creadores, emprendedores y freelancers.
          </p>

          <h2>🧰 Herramientas imprescindibles</h2>
          <ul>
            <li><strong>ChatGPT</strong>: generación de texto, ideas y scripts.</li>
            <li><strong>Midjourney / DALL·E</strong>: creación de imágenes personalizadas.</li>
            <li><strong>Notion AI</strong>: organización, calendarios y planificación.</li>
            <li><strong>Gumroad</strong>: venta de productos digitales.</li>
          </ul>

          <h2>💼 Modelos de negocio recomendados</h2>
          <ol>
            <li><strong>Blog de contenido optimizado</strong>: usa IA para publicar artículos SEO y monetiza con Google Ads.</li>
            <li><strong>Cursos automatizados</strong>: crea un curso con IA (texto, imágenes, video) y véndelo en plataformas como Podia.</li>
            <li><strong>Ebooks</strong>: redacta ebooks con IA y publícalos en Amazon Kindle o Gumroad.</li>
            <li><strong>Consultoría con IA</strong>: ofrece soluciones personalizadas a emprendedores usando herramientas de IA.</li>
          </ol>

          <h2>📚 Recursos recomendados</h2>
          <ul>
            <li><a href="https://openai.com" target="_blank" rel="noopener noreferrer">ChatGPT en OpenAI</a></li>
            <li><a href="https://gumroad.com" target="_blank" rel="noopener noreferrer">Gumroad</a></li>
            <li><a href="https://notion.so" target="_blank" rel="noopener noreferrer">Notion AI</a></li>
            <li><a href="https://podia.com" target="_blank" rel="noopener noreferrer">Podia</a></li>
          </ul>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-gray-900 p-8 rounded-xl text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-2">¿Quieres más estrategias?</h3>
          <p className="text-muted-foreground mb-4">Suscríbete gratis y recibe ideas, recursos y herramientas cada semana para monetizar con IA y construir tu independencia financiera.</p>
          <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition">
            Recibir Estrategias Exclusivas
          </button>
        </div>

        {/* Publicidad inferior */}
        <div className="bg-muted text-center py-6 rounded-xl text-sm text-muted-foreground shadow">
          🧠 Patrocinado por Notion AI – Organiza tu vida con inteligencia artificial
        </div>
      </article>
    </main>
  );
}
