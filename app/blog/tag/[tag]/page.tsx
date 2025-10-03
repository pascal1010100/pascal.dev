import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { Pagination } from '@/components/blog/Pagination';

type Props = {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  
  return {
    title: `Etiqueta: ${decodedTag} | Blog de Pascal Dev`,
    description: `Artículos etiquetados como ${decodedTag} en el blog de Pascal Dev.`,
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const { tag } = await params;
  const { page = '1' } = await searchParams;
  const currentPage = parseInt(page as string, 10) || 1;
  const decodedTag = decodeURIComponent(tag);
  
  const postsWithTag = blogPosts.filter(
    (post) => post.tags?.some((t) => t.toLowerCase() === decodedTag.toLowerCase())
  );

  if (postsWithTag.length === 0) {
    return notFound();
  }

  // Pagination
  const postsPerPage = 6;
  const totalPages = Math.ceil(postsWithTag.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = postsWithTag.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Etiqueta: {decodedTag}
        </h1>
        <p className="text-xl text-muted-foreground">
          {postsWithTag.length} artículos publicados
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const tags = Array.from(
    new Set(blogPosts.flatMap((post) => post.tags || []))
  );
  
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.toLowerCase()),
  }));
}
