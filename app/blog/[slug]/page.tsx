import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";
import Image from "next/image";

export default function BlogPostPage({ params }: any) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="bg-background text-foreground px-4 sm:px-6 lg:px-8 py-12">
      <article className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Publicado en Julio 2025 por Pascal Espíritu
          </p>
        </header>

        <div className="w-full overflow-hidden rounded-2xl shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>

        <div className="bg-muted text-center py-6 rounded-xl text-sm text-muted-foreground shadow">
          📢 Espacio para Anuncio Premium (728x90)
        </div>

        <section className="prose prose-neutral dark:prose-invert max-w-none prose-lg mx-auto leading-relaxed">
          {post.content}
        </section>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-gray-900 p-8 rounded-xl text-center shadow-lg">
          <h3 className="text-2xl font-bold mb-2">¿Quieres más estrategias?</h3>
          <p className="text-muted-foreground mb-4">
            Suscríbete gratis y recibe ideas, recursos y herramientas cada semana para monetizar con IA y construir tu independencia financiera.
          </p>
          <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition">
            Recibir Estrategias Exclusivas
          </button>
        </div>

        <div className="bg-muted text-center py-6 rounded-xl text-sm text-muted-foreground shadow">
          🧠 Patrocinado por Notion AI – Organiza tu vida con inteligencia artificial
        </div>
      </article>
    </main>
  );
}
