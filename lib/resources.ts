export type Resource = {
  id: string;
  title: string;
  slug: string;
  url: string;
  description: string;
  category: "herramientas" | "librerias" | "tutoriales" | "guias" | "plantillas";
  tags: string[];
  image?: string;
  featured?: boolean;
  createdAt: string; // ISO format
};

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Next.js Documentation',
    slug: 'nextjs-docs',
    url: 'https://nextjs.org/docs',
    description: 'Documentación oficial de Next.js con guías y referencias de API',
    category: 'librerias',
    tags: ['react', 'frontend', 'ssr'],
    featured: true,
    createdAt: '2024-01-15T00:00:00.000Z'
  },
  {
    id: '2',
    title: 'Tailwind CSS',
    slug: 'tailwind-css',
    url: 'https://tailwindcss.com/',
    description: 'Un framework CSS utilitario para construir diseños personalizados',
    category: 'herramientas',
    tags: ['css', 'frontend', 'styling'],
    featured: true,
    createdAt: '2024-01-10T00:00:00.000Z'
  },
  {
    id: '3',
    title: 'TypeScript Handbook',
    slug: 'typescript-handbook',
    url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
    description: 'Guía completa de TypeScript',
    category: 'tutoriales',
    tags: ['typescript', 'programming'],
    createdAt: '2024-01-05T00:00:00.000Z'
  },
  {
    id: '4',
    title: 'Shadcn/UI',
    slug: 'shadcn-ui',
    url: 'https://ui.shadcn.com/',
    description: 'Componentes de UI hermosamente diseñados',
    category: 'librerias',
    tags: ['react', 'ui', 'components'],
    featured: true,
    createdAt: '2024-02-01T00:00:00.000Z'
  },
  {
    id: '5',
    title: 'Guía de Accesibilidad Web',
    slug: 'guia-accesibilidad-web',
    url: 'https://developer.mozilla.org/es/docs/Web/Accessibility',
    description: 'Recursos para hacer la web accesible para todos',
    category: 'guias',
    tags: ['accesibilidad', 'web'],
    createdAt: '2024-01-20T00:00:00.000Z'
  },
  {
    id: '6',
    title: 'Plantilla Dashboard Next.js',
    slug: 'plantilla-dashboard-nextjs',
    url: 'https://github.com/shadcn-ui/taxonomy',
    description: 'Plantilla de dashboard con Next.js y Shadcn/UI',
    category: 'plantillas',
    tags: ['nextjs', 'dashboard', 'template'],
    featured: true,
    createdAt: '2024-02-05T00:00:00.000Z'
  },
  {
    id: '7',
    title: 'React Query',
    slug: 'react-query',
    url: 'https://tanstack.com/query/latest',
    description: 'Manejo de estado asíncrono para React',
    category: 'librerias',
    tags: ['react', 'data-fetching', 'state-management'],
    createdAt: '2024-01-25T00:00:00.000Z'
  },
  {
    id: '8',
    title: 'Guía de Rendimiento Web',
    slug: 'guia-rendimiento-web',
    url: 'https://web.dev/learn/',
    description: 'Mejora el rendimiento de tus aplicaciones web',
    category: 'guias',
    tags: ['rendimiento', 'web', 'optimizacion'],
    createdAt: '2024-01-30T00:00:00.000Z'
  }
];

// Helper functions
export function getUniqueTags(resources: Resource[]): string[] {
  const tags = new Set<string>();
  resources.forEach(resource => {
    resource.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getUniqueCategories(resources: Resource[]): string[] {
  const categories = new Set<string>();
  resources.forEach(resource => {
    categories.add(resource.category);
  });
  return Array.from(categories).sort();
}

export function filterResources({
  resources,
  searchQuery = '',
  selectedCategory = null,
  selectedTags = [],
  sortBy = 'newest'
}: {
  resources: Resource[];
  searchQuery?: string;
  selectedCategory?: string | null;
  selectedTags?: string[];
  sortBy?: 'newest' | 'title' | 'featured';
}): Resource[] {
  const query = searchQuery.toLowerCase();
  
  return resources
    .filter(resource => {
      // Filter by search query
      const matchesSearch = 
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query));
      
      // Filter by category
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      
      // Filter by tags
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => resource.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        case 'newest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
}
