import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from "@/data/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/blog/Pagination";

export const metadata: Metadata = {
  title: 'Blog | Pascal Dev',
  description: 'Artículos, tutoriales y recursos sobre desarrollo, diseño y tecnología.',
  openGraph: {
    title: 'Blog | Pascal Dev',
    description: 'Artículos, tutoriales y recursos sobre desarrollo, diseño y tecnología.',
    type: 'website',
  },
};

const POSTS_PER_PAGE = 6;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) || 1 : 1;
  
  if (isNaN(page) || page < 1) {
    return notFound();
  }

  const totalPosts = blogPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  if (page > totalPages && totalPages > 0) {
    return notFound();
  }

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(start, end);

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Blog
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Artículos, tutoriales y recursos sobre desarrollo, diseño y tecnología.
        </p>
      </div>

      {currentPosts.length > 0 ? (
        <div className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {currentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination currentPage={page} totalPages={totalPages} />
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-800 bg-gray-900/50 p-12 text-center">
          <h3 className="text-lg font-medium text-gray-300">No hay publicaciones disponibles</h3>
          <p className="mt-2 text-sm text-gray-500">
            Pronto publicaremos nuevo contenido. ¡Vuelve pronto!
          </p>
        </div>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}
