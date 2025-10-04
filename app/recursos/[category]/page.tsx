import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Skeleton } from '../../../components/ui/skeleton';
import CategoryClient from './CategoryClient';

// Tipos
export type Resource = {
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

  let filteredResources = category.resources.filter(resource => {
    const matchesSearch = !search || 
      resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesTag = !tag || (resource.tags && resource.tags.includes(tag));
    
    return matchesSearch && matchesTag;
  });

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filteredResources.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * perPage;
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
        <CategoryClient 
          params={params}
          searchParams={searchParams}
          category={category}
          allTags={allTags}
          paginatedResources={paginatedResources}
          totalPages={totalPages}
          page={currentPage}
          search={search}
          tag={tag}
        />
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
