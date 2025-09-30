"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { estrategias } from "@/data/estrategias";
import { 
  StrategyCard, 
  StrategyHero, 
  StrategyCTA 
} from './components';
import { StrategyFilters } from './components/StrategyFilters';
import { SortOption } from './types/estrategia';

const sortOptions: SortOption[] = [
  { value: 'recent', label: 'Más recientes' },
  { value: 'popular', label: 'Más populares' },
  { value: 'az', label: 'A-Z' }
];

export default function EstrategiasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState('recent');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const categories = Array.from(new Set(estrategias.map(e => e.category).filter(Boolean))) as string[];

  // Handle component mount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Simulate loading state
  useEffect(() => {
    const loading = searchTerm || selectedCategory;
    if (loading) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory]);

  // Filter and sort strategies
  const filteredEstrategias = useMemo(() => {
    let result = [...estrategias];

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(estrategia => 
        estrategia.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(estrategia => {
        const searchInTitle = estrategia.title.toLowerCase().includes(term);
        const searchInDesc = estrategia.description.toLowerCase().includes(term);
        const searchInTags = estrategia.tags?.some(tag => 
          tag.toLowerCase().includes(term)
        ) || false;
        
        return searchInTitle || searchInDesc || searchInTags;
      });
    }

    // Apply sorting
    switch (activeSort) {
      case 'recent':
        result.sort((a, b) => 
          (new Date(b.date || '').getTime() - new Date(a.date || '').getTime())
        );
        break;
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [searchTerm, selectedCategory, activeSort]);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-r from-primary to-primary/70 animate-pulse"></div>
          <p className="text-muted-foreground font-medium">Cargando estrategias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <StrategyHero 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={() => setSearchTerm('')}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
              Nuestras Estrategias
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Descubre estrategias probadas para hacer crecer tu negocio en el mundo digital.
            </p>
          </div>
          
          <div className="mb-10">
            <StrategyFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              activeSort={activeSort}
              onSortChange={setActiveSort}
              categories={categories}
              sortOptions={sortOptions}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {filteredEstrategias.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredEstrategias.map((estrategia) => (
                    <motion.div 
                      key={estrategia.slug} 
                      variants={item}
                      className="h-full"
                    >
                      <StrategyCard estrategia={estrategia} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20">
                  <div className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">No se encontraron resultados</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    No hay estrategias que coincidan con tu búsqueda. Intenta con otros filtros o términos.
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                      setActiveSort('recent');
                    }}
                    className="mt-4 text-sm font-medium text-primary hover:underline"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <div className="bg-background border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StrategyCTA />
        </div>
      </div>
    </div>
  )
}
