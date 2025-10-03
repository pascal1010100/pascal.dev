'use client';

import * as React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Icons } from '../../components/icons';
import { cn } from '../../lib/utils';

interface ResourceFiltersProps {
  categories: Array<{
    id: string;
    name: string;
    count: number;
    icon?: keyof typeof Icons;
  }>;
  selectedCategory?: string;
  searchQuery?: string;
  className?: string;
}

export function ResourceFilters({
  categories = [],
  selectedCategory,
  searchQuery: initialSearchQuery = '',
  className,
}: ResourceFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);
  const [isSearching, setIsSearching] = React.useState(false);
  
  // Actualizar la URL cuando cambian los filtros
  const updateFilters = (updates: { category?: string; q?: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (updates.category) {
      params.set('category', updates.category);
    } else {
      params.delete('category');
    }
    
    if (updates.q) {
      params.set('q', updates.q);
    } else {
      params.delete('q');
    }
    
    // Resetear la página a 1 cuando cambian los filtros
    params.delete('page');
    
    router.push(`${pathname}?${params.toString()}`);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ q: searchQuery });
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    updateFilters({ category: '', q: '' });
  };
  
  const hasActiveFilters = selectedCategory || searchQuery;
  
  return (
    <div className={cn('space-y-6', className)}>
      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar recursos..."
            className="w-full pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => updateFilters({ q: searchQuery })}
          />
          {(searchQuery || isSearching) && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
              onClick={() => {
                setSearchQuery('');
                updateFilters({ q: '' });
              }}
            >
              <Icons.x className="h-4 w-4" />
              <span className="sr-only">Limpiar búsqueda</span>
            </Button>
          )}
        </div>
      </form>
      
      {/* Categorías */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Categorías</h3>
        <div className="space-y-1">
          <button
            onClick={() => updateFilters({ category: '' })}
            className={cn(
              'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
              !selectedCategory
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <span>Todas las categorías</span>
            <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {categories.reduce((acc, cat) => acc + cat.count, 0)}
            </span>
          </button>
          
          {categories.map((category) => {
            const Icon = category.icon ? Icons[category.icon] : Icons.folder;
            return (
              <button
                key={category.id}
                onClick={() => 
                  updateFilters({ 
                    category: category.id === selectedCategory ? '' : category.id 
                  })
                }
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                  selectedCategory === category.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 flex-shrink-0 opacity-70" />
                  <span>{category.name}</span>
                </div>
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Filtros activos */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">
            {selectedCategory && (
              <span className="font-medium text-foreground">
                Categoría: {categories.find(c => c.id === selectedCategory)?.name}
                {searchQuery && ' • '}
              </span>
            )}
            {searchQuery && (
              <span className="font-medium text-foreground">
                Búsqueda: "{searchQuery}"
              </span>
            )}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            onClick={clearFilters}
          >
            <Icons.x className="mr-1 h-3 w-3" />
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
