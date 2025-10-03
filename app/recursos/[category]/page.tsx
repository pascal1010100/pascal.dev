import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Icons } from '../../../components/icons';
import { Suspense } from 'react';
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
  icon?: keyof typeof Icons;
  category?: string;
};

type Category = {
  name: string;
  description: string;
  icon: keyof typeof Icons;
  color: string;
  resources: Resource[];
  tags?: string[];
};

// Datos de ejemplo - reemplazar con tu fuente de datos real
const categories: Record<string, Category> = {
  herramientas: {
    name: 'Herramientas',
    description: 'Las mejores herramientas para desarrollo web y productividad',
    icon: 'tool',
    color: 'bg-blue-500/10 text-blue-500',
    tags: ['editor', 'ide', 'productividad', 'desarrollo', 'herramientas'],
    resources: [
      {
        id: 'vscode',
        title: 'Visual Studio Code',
        description: 'Editor de código fuente desarrollado por Microsoft con soporte para depuración, control de versiones Git integrado, resaltado de sintaxis, finalización de código inteligente, fragmentos y más.',
        url: 'https://code.visualstudio.com/',
        tags: ['editor', 'desarrollo', 'gratis', 'productividad', 'microsoft'],
        featured: true,
        icon: 'code',
        category: 'herramientas'
      },
      {
        id: 'github',
        title: 'GitHub',
        description: 'Plataforma de desarrollo colaborativo para alojar proyectos utilizando el sistema de control de versiones Git.',
        url: 'https://github.com/',
        tags: ['control de versiones', 'colaboración', 'git', 'open source'],
        featured: true,
        icon: 'github',
        category: 'herramientas'
      },
      {
        id: 'figma',
        title: 'Figma',
        description: 'Herramienta de diseño de interfaces de usuario y prototipado colaborativo basada en la web.',
        url: 'https://www.figma.com/',
        tags: ['diseño', 'ui/ux', 'prototipado', 'colaboración'],
        featured: true,
        icon: 'figma',
        category: 'herramientas'
      },
      {
        id: 'postman',
        title: 'Postman',
        description: 'Plataforma de colaboración para el desarrollo de APIs que simplifica cada paso del ciclo de vida de las APIs.',
        url: 'https://www.postman.com/',
        tags: ['api', 'desarrollo', 'testing', 'documentación'],
        featured: false,
        icon: 'code',
        category: 'herramientas'
      },
      {
        id: 'docker',
        title: 'Docker',
        description: 'Plataforma abierta para desarrollar, enviar y ejecutar aplicaciones en contenedores.',
        url: 'https://www.docker.com/',
        tags: ['contenedores', 'devops', 'despliegue', 'infraestructura'],
        featured: true,
        icon: 'box',
        category: 'herramientas'
      },
    ]
  },
  librerias: {
    name: 'Librerías',
    description: 'Librerías y paquetes para potenciar tus proyectos',
    icon: 'library',
    color: 'bg-purple-500/10 text-purple-500',
    tags: ['frontend', 'backend', 'frameworks', 'utilidades'],
    resources: [
      {
        id: 'react',
        title: 'React',
        description: 'Biblioteca de JavaScript para construir interfaces de usuario.',
        url: 'https://reactjs.org/',
        tags: ['frontend', 'javascript', 'ui', 'facebook'],
        featured: true,
        icon: 'react',
        category: 'librerias'
      },
      {
        id: 'tailwind',
        title: 'Tailwind CSS',
        description: 'Framework CSS de utilidad primero que permite diseñar interfaces de usuario directamente en el marcado.',
        url: 'https://tailwindcss.com/',
        tags: ['css', 'framework', 'diseño', 'frontend'],
        featured: true,
        icon: 'layout',
        category: 'librerias'
      },
      {
        id: 'nextjs',
        title: 'Next.js',
        description: 'El marco de React para la producción - estático y generado por servidor, enrutamiento del sistema de archivos, etc.',
        url: 'https://nextjs.org/',
        tags: ['react', 'ssr', 'ssg', 'framework'],
        featured: true,
        icon: 'nextjs',
        category: 'librerias'
      }
    ]
  },
  // Agrega más categorías según sea necesario
};

// Tipos para los parámetros y props
type CategoryKey = keyof typeof categories;

type PageProps = {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Función para generar metadatos dinámicos
export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const categoryData = categories[params.category as CategoryKey];
  
  if (!categoryData) {
    return {
      title: 'Categoría no encontrada | Recursos para Desarrolladores',
      description: 'La categoría solicitada no existe en nuestra colección de recursos.',
    };
  }
  
  return {
    title: `${categoryData.name} | Recursos para Desarrolladores | Pascal Dev`,
    description: categoryData.description,
    openGraph: {
      title: `${categoryData.name} | Recursos para Desarrolladores`,
      description: categoryData.description,
      type: 'website',
      locale: 'es_ES',
      siteName: 'Pascal Dev',
    },
    twitter: {
      card: 'summary_large_image',
      description: categoryData.description,
    },
  };
}

// Componente de carga esquelética para la categoría
function CategorySkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-10 w-full sm:w-64" />
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
              
              <Skeleton className="h-9 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Página de categoría de recursos
export default async function ResourceCategoryPage({ params, searchParams }: PageProps) {
  const category = params.category as CategoryKey;
  const searchQuery = typeof searchParams.q === 'string' ? searchParams.q : '';
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page, 10) || 1 : 1;
  
  const categoryData = categories[category];
  
  if (!categoryData) {
    notFound();
  }
  
  const Icon = Icons[categoryData.icon as keyof typeof Icons] || Icons.package;
  
  // Filtrar recursos según la búsqueda
  const filteredResources = categoryData.resources.filter(resource => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });
  
  // Paginación
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${categoryData.color} w-12 h-12 flex items-center justify-center`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {categoryData.name}
              </h1>
              <p className="text-muted-foreground">
                {categoryData.description}
              </p>
            </div>
          </div>
          
          <div className="w-full sm:w-64">
            <ResourceFilters 
              categories={[
                {
                  id: category,
                  name: categoryData.name,
                  count: categoryData.resources.length,
                  icon: categoryData.icon as keyof typeof Icons
                }
              ]} 
              selectedCategory={category}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </header>
      
      <Suspense fallback={<CategorySkeleton />}>
        {paginatedResources.length === 0 ? (
          <ResourceEmptyState 
            title="No se encontraron recursos"
            description={searchQuery 
              ? `No hay recursos en ${categoryData.name.toLowerCase()} que coincidan con "${searchQuery}". Intenta con otros términos de búsqueda.`
              : `Actualmente no hay recursos disponibles en la categoría ${categoryData.name.toLowerCase()}.`}
            actionText="Ver todos los recursos"
            actionHref="/recursos"
            icon="search"
          />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedResources.map((resource) => (
                <ResourceCard key={resource.id} {...resource} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="mt-8">
                <ResourcePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredResources.length}
                  pageSize={itemsPerPage}
                />
              </div>
            )}
          </>
        )}
        
        <div className="mt-12 pt-8 border-t border-border">
          <Button asChild variant="ghost">
            <Link href="/recursos" className="group">
              <Icons.arrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Volver a todos los recursos
            </Link>
          </Button>
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
