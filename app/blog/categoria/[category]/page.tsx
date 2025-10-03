import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { Pagination } from '@/components/blog/Pagination';

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  
  return {
    title: `Categoría: ${decodedCategory} | Blog de Pascal Dev`,
    description: `Artículos sobre ${decodedCategory} en el blog de Pascal Dev.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const { page = '1' } = await searchParams;
  const currentPage = parseInt(page as string, 10) || 1;
  const decodedCategory = decodeURIComponent(category);
  
  const postsInCategory = blogPosts.filter(
    (post) => post.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  if (postsInCategory.length === 0) {
    return notFound();
  }

  // Pagination
  const postsPerPage = 6;
  const totalPages = Math.ceil(postsInCategory.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = postsInCategory.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Categoría: {decodedCategory}
        </h1>
        <p className="text-xl text-muted-foreground">
          {postsInCategory.length} artículos publicados
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
            basePath={`/blog/categoria/${encodeURIComponent(decodedCategory)}`}
          />
        </div>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  const categories = Array.from(
    new Set(blogPosts.map((post) => post.category.toLowerCase()))
  );
  
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }));
}
