'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Resource } from '@/types/resource';

interface CategoryClientProps {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
  category: {
    name: string;
    description: string;
    resources: Resource[];
  };
  allTags: string[];
  paginatedResources: Resource[];
  totalPages: number;
  page: number;
  search: string;
  tag: string;
}

export default function CategoryClient({
  params,
  searchParams,
  category,
  allTags,
  paginatedResources,
  totalPages,
  page,
  search,
  tag,
}: CategoryClientProps) {
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = new URLSearchParams(searchParamsHook.toString());
    newParams.set('search', e.target.value);
    router.push(`/recursos/${params.category}?${newParams.toString()}`);
  };

  const handleTagClick = (tagItem: string) => {
    const newParams = new URLSearchParams(searchParamsHook.toString());
    newParams.set('tag', tagItem);
    router.push(`/recursos/${params.category}?${newParams.toString()}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar recursos..."
            className="w-full px-4 py-2 border rounded-md"
            defaultValue={search}
            onChange={handleSearchChange}
          />
        </div>
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map((tagItem) => (
              <button
                key={tagItem}
                className={`px-3 py-1 text-sm rounded-full ${
                  tag === tagItem
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => handleTagClick(tagItem)}
              >
                {tagItem}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {paginatedResources.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedResources.map((resource) => (
              <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1"
                  >
                    {resource.title}
                    <span className="text-muted-foreground text-sm">↗</span>
                  </a>
                </h3>
                <p className="text-muted-foreground text-sm mb-3">{resource.description}</p>
                {resource.tags && resource.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {resource.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className="text-xs bg-muted px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const newParams = new URLSearchParams();
                // Copiar los parámetros existentes
                Object.entries(searchParams).forEach(([key, value]) => {
                  if (Array.isArray(value)) {
                    value.forEach(v => newParams.append(key, v));
                  } else if (value !== undefined) {
                    newParams.set(key, value);
                  }
                });
                // Actualizar el parámetro de página
                newParams.set('page', pageNum.toString());
                
                return (
                  <Link
                    key={pageNum}
                    href={`/recursos/${params.category}?${newParams.toString()}`}
                    className={`px-3 py-1 rounded ${
                      page === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No se encontraron recursos</h3>
          <p className="mb-4">
            {search || tag ? (
              `No hay resultados para "${search || tag}". Intenta con otros términos de búsqueda.`
            ) : (
              'No hay recursos disponibles en esta categoría en este momento.'
            )}
          </p>
          <a 
            href={`/recursos/${params.category}`}
            className="text-primary hover:underline"
          >
            Limpiar filtros
          </a>
        </div>
      )}
    </div>
  );
}
