// app/recursos/RecursosClient.tsx
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, 
  Library, 
  Book, 
  BookOpen, 
  LayoutTemplate,
  Search,
  X,
  Star,
  ExternalLink
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = 'herramientas' | 'librerias' | 'tutoriales' | 'guias' | 'plantillas';

const CATEGORY_ICON: Record<Category, LucideIcon> = {
  herramientas: Wrench,
  librerias: Library,
  tutoriales: Book,
  guias: BookOpen,
  plantillas: LayoutTemplate
} as const;

const CATEGORY_COLORS: Record<Category, string> = {
  herramientas: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  librerias: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  tutoriales: 'bg-green-500/10 text-green-500 border-green-500/20',
  guias: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  plantillas: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
} as const;

interface Resource {
  id: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  url: string;
  featured?: boolean;
  createdAt?: string;
}

interface RecursosClientProps {
  resources: Resource[];
}

export default function RecursosClient({ resources }: RecursosClientProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'title' | 'featured'>('newest');
  
  // Get category from URL or default to all
  const selectedCategory = searchParams?.get('categoria') as Category | null;

  // Get all unique tags from all resources
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    resources.forEach((resource) => {
      resource.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [resources]);

  // Get all unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<Category>();
    resources.forEach((resource) => categories.add(resource.category));
    return Array.from(categories);
  }, [resources]);

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let result = [...resources];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((resource) => resource.category === selectedCategory);
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      result = result.filter((resource) =>
        selectedTags.every((tag) => resource.tags.includes(tag))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'featured') {
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      } else {
        // newest
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
    });

    return result;
  }, [resources, searchQuery, selectedCategory, selectedTags, sortBy]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Recursos para Desarrolladores
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Una colección cuidadosamente seleccionada de herramientas, librerías y recursos.
        </p>
      </header>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar recursos..."
            className="w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Limpiar búsqueda</span>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setSortBy('newest')}>
                  Todos
                </TabsTrigger>
                <TabsTrigger value="featured" onClick={() => setSortBy('featured')}>
                  Destacados
                </TabsTrigger>
                <TabsTrigger value="title" onClick={() => setSortBy('title')}>
                  Por nombre
                </TabsTrigger>
              </TabsList>
              
              {(searchQuery || selectedTags.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={clearFilters}
                >
                  <X className="mr-1 h-4 w-4" />
                  Limpiar filtros
                </Button>
              )}
            </div>
          </Tabs>
        </div>

        {/* Selected Tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Resources Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => {
          const Icon = CATEGORY_ICON[resource.category];
          const categoryColor = CATEGORY_COLORS[resource.category];
          
          return (
            <Card key={resource.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={cn("inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium border", categoryColor)}>
                    <Icon className="mr-1 h-3 w-3" />
                    {resource.category}
                  </div>
                  {resource.featured && (
                    <Badge variant="secondary" className="flex items-center">
                      <Star className="mr-1 h-3 w-3" />
                      Destacado
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-2">
                  <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {resource.title}
                  </Link>
                </CardTitle>
                <CardDescription className="mt-1 line-clamp-2">
                  {resource.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={cn(
                        'cursor-pointer text-xs hover:bg-secondary',
                        selectedTags.includes(tag) ? 'bg-secondary' : ''
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleTag(tag);
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{resource.tags.length - 3} más
                    </Badge>
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={resource.url} target="_blank" rel="noopener noreferrer">
                    Ver recurso
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron recursos que coincidan con tu búsqueda.</p>
          <Button variant="ghost" className="mt-4" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
