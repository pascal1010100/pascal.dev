import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from "@/data/blog";
import { CategoryBadge } from "@/components/blog/CategoryBadge";
import { TagBadge } from "@/components/blog/TagBadge";
import { Prose } from "@/components/blog/Prose";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Publicación no encontrada',
    };
  }

  return {
    title: `${post.title} | Blog de Pascal Dev`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 2);

  return (
    <main className="bg-background text-foreground">
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <header className="space-y-6">
          <div className="flex items-center space-x-4">
            <CategoryBadge category={post.category} />
            <time
              dateTime={post.date}
              className="text-sm text-muted-foreground"
            >
              {new Date(post.date).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground">
            {post.description}
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <div className="flex items-center space-x-2">
              <span className="h-10 w-10 overflow-hidden rounded-full bg-gray-800">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </span>
              <div>
                <p className="text-sm font-medium">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {post.readTime} de lectura
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Imagen destacada */}
        <div className="my-8 overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        {/* Contenido */}
        <Prose className="my-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Prose>

        {/* Etiquetas */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Sección de suscripción */}
        <div className="my-12 rounded-2xl bg-gradient-to-br from-blue-900/20 to-gray-900 p-8 text-center shadow-lg">
          <h3 className="text-2xl font-bold text-white">¿Te gustó este artículo?</h3>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Suscríbete para recibir contenido exclusivo directamente en tu bandeja de entrada.
          </p>
          <div className="mt-6 flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 rounded-lg border border-gray-700 bg-gray-900/50 px-4 py-2 text-white placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="rounded-lg bg-primary px-6 py-2 font-medium text-white transition-colors hover:bg-primary/90">
              Suscribirse
            </button>
          </div>
        </div>

        {/* Artículos relacionados */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-gray-800 pt-12">
            <h2 className="mb-8 text-2xl font-bold">Artículos relacionados</h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.slug} className="group">
                  <Link href={`/blog/${relatedPost.slug}`} className="block">
                    <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all hover:border-primary/50">
                      <h3 className="text-lg font-medium text-foreground group-hover:text-primary">
                        {relatedPost.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm text-muted-foreground">
                        <span>{relatedPost.readTime}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(relatedPost.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </article>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
