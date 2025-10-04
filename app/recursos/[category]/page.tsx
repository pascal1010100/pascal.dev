import { Metadata } from 'next';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { Skeleton } from '../../../components/ui/skeleton';
import { ResourceCard } from '../../../components/recursos/ResourceCard';
import { ResourceFilters } from '../../../components/recursos/ResourceFilters';
import { ResourcePagination } from '../../../components/recursos/ResourcePagination';
import { ResourceEmptyState } from '../../../components/recursos/ResourceEmptyState';

// Tipos
type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  featured?: boolean;
  icon?: string;
  category?: string;
};

type Category = {
  name: string;
  description: string;
  icon: string;
  color: string;
  resources: Resource[];
  tags?: string[];
};

// Datos de ejemplo - reemplazar con tu fuente de datos real
const categories: Record<string, Category> = {
  herramientas: {
    name: 'Herramientas',
    description: 'Las mejores herramientas para desarrollo web y productividad',
    icon: 'wrench',
    color: 'blue',
    resources: [
      {
        id: '1',
        title: 'Herramienta 1',
        description: 'Descripción de la herramienta 1',
        url: '#',
        tags: ['frontend', 'productividad'],
        featured: true
      },
      // Agrega más recursos aquí
    ]
  },
  // Agrega más categorías aquí
};

// Tipos para los parámetros y props
type CategoryKey = keyof typeof categories;

interface PageProps {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Función para generar metadatos dinámicos
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = categories[params.category as CategoryKey];
  
  if (!category) {
    return {
      title: 'Categoría no encontrada',
      description: 'La categoría solicitada no existe.',
    };
  }

  return {
    title: `${category.name} | Recursos para Desarrolladores`,
    description: category.description,
    openGraph: {
      title: `${category.name} | Recursos para Desarrolladores`,
      description: category.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} | Recursos para Desarrolladores`,
      description: category.description,
    },
  };
}

// Componente de carga esquelética para la categoría
function CategorySkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-64 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-6 w-48 mt-2" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-1" />
            </div>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Página de categoría de recursos
export default function ResourceCategoryPage({ params, searchParams }: PageProps) {
  const category = categories[params.category as CategoryKey];
  
  // Si la categoría no existe, mostramos un 404
  if (!category) {
    notFound();
  }

  // Procesar parámetros de búsqueda y filtros
  const search = searchParams.search as string || '';
  const tag = searchParams.tag as string || '';
  const page = parseInt(searchParams.page as string) || 1;
  const perPage = 12;

  // Filtrar recursos
  let filteredResources = category.resources.filter(resource => {
    const matchesSearch = !search || 
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesTag = !tag || resource.tags.includes(tag);
    
    return matchesSearch && matchesTag;
  });

  // Paginación
  const totalPages = Math.ceil(filteredResources.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedResources = filteredResources.slice(startIndex, startIndex + perPage);

  // Obtener todas las etiquetas únicas de la categoría
  const allTags = Array.from(
    new Set(category.resources.flatMap(resource => resource.tags || []))
  ).sort();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {category.name}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {category.description}
        </p>
      </header>

      <Suspense fallback={<CategorySkeleton />}>
        <div className="space-y-8">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar recursos..."
                className="w-full px-4 py-2 border rounded-md"
                defaultValue={search}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams as any);
                  newParams.set('search', e.target.value);
                  window.location.href = `/recursos/${params.category}?${newParams.toString()}`;
                }}
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
                    onClick={() => {
                      const newParams = new URLSearchParams(searchParams as any);
                      newParams.set('tag', tagItem);
                      window.location.href = `/recursos/${params.category}?${newParams.toString()}`;
                    }}
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
                        {resource.tags.map((tag) => (
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
      </Suspense>
    </div>
  );
}

// Generar rutas estáticas para las categorías
export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}
