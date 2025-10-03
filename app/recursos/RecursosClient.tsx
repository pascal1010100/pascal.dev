// app/recursos/RecursosClient.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Wrench, 
  Library, 
  Book, 
  BookOpen, 
  LayoutTemplate,
  Search,
  X,
  Star,
  ExternalLink,
  type LucideIcon
} from 'lucide-react';
import { resources, filterResources, getUniqueTags, getUniqueCategories } from '@/lib/resources';
import { cn } from '@/lib/utils';

type Category = 'herramientas' | 'librerias' | 'tutoriales' | 'guias' | 'plantillas';

const CATEGORY_ICON: Record<Category, LucideIcon> = {
  herramientas: Wrench,
  librerias: Library,
  tutoriales: Book,
  guias: BookOpen,
  plantillas: LayoutTemplate
} as const;

const CATEGORY_COLORS = {
  herramientas: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  librerias: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  tutoriales: 'bg-green-500/10 text-green-500 border-green-500/20',
  guias: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  plantillas: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
} as const;

export default function RecursosClient() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'title' | 'featured'>('newest');
  
  // Get category from URL or default to all
  const selectedCategory = searchParams?.get('categoria') || null;

  // Get all unique tags and categories for filters
  const allTags = useMemo(() => getUniqueTags(resources), []);
  const allCategories = useMemo(() => getUniqueCategories(resources), []);

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    return filterResources({
      resources,
      searchQuery,
      selectedCategory,
      selectedTags,
      sortBy
    });
  }, [searchQuery, selectedCategory, selectedTags, sortBy]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSortBy('newest');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Recursos para Desarrolladores
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Una colección cuidadosamente seleccionada de herramientas, librerías y recursos.
        </p>
      </header>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <Input
            type="search"
            placeholder="Buscar recursos..."
            className="w-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Tabs 
            value={selectedCategory || 'todos'} 
            onValueChange={(value: string) => {
              const params = new URLSearchParams(searchParams?.toString() || '');
              if (value === 'todos') {
                params.delete('categoria');
              } else {
                params.set('categoria', value);
              }
              window.history.pushState({}, '', `?${params.toString()}`);
            }}
            className="w-full"
          >
            <TabsList className="flex-wrap h-auto p-1 bg-background/50 backdrop-blur-sm border">
              <TabsTrigger value="todos" className="text-sm">
                Todos
              </TabsTrigger>
              {allCategories.map((category) => {
                const Icon = CATEGORY_ICON[category as Category] || LayoutTemplate;
                return (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="text-sm flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          <div className="flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'title' | 'featured')}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="newest">Más recientes</option>
              <option value="title">A-Z</option>
              <option value="featured">Destacados primero</option>
            </select>
          </div>
        </div>

        {selectedTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtros:</span>
            {selectedTags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 h-8 px-2 text-xs text-muted-foreground"
              onClick={clearFilters}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>

      {/* Resources Grid */}
      {filteredResources.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => {
            const Icon = CATEGORY_ICON[resource.category as Category] || LayoutTemplate;
            
            return (
              <Link 
                key={resource.id} 
                href={resource.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                onClick={() => console.log('Resource clicked:', resource.title)}
              >
                <Card className="h-full transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 group-hover:-translate-y-1 overflow-hidden">
                  <div className={cn(
                    'h-2 w-full',
                    CATEGORY_COLORS[resource.category].split(' ')[0]
                  )} />
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${CATEGORY_COLORS[resource.category]} w-10 h-10 flex items-center justify-center`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      {resource.featured && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Destacado
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="group-hover:text-primary transition-colors text-lg line-clamp-2">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-3">
                      {resource.description}
                    </CardDescription>
                    {resource.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-primary/10"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleTag(tag);
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{resource.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 text-xs text-muted-foreground flex justify-between items-center">
                    <span className="capitalize">{resource.category}</span>
                    <span className="flex items-center">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Abrir recurso
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Search className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No se encontraron recursos</h3>
          <p className="text-muted-foreground max-w-md">
            No hay recursos que coincidan con tu búsqueda. Intenta con otros filtros o términos de búsqueda.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={clearFilters}
          >
            <X className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}