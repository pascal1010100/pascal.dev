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
import { Estrategia, SortOption } from './types/estrategia';

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
    return () => setIsMounted(false);
  }, []);

  // Simulate loading state
  useEffect(() => {
    if (searchTerm || selectedCategory) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 mb-4"></div>
          <p className="text-muted-foreground">Cargando estrategias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <StrategyHero 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={() => setSearchTerm('')}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StrategyFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          activeSort={activeSort}
          onSortChange={setActiveSort}
          categories={categories}
          sortOptions={sortOptions}
        />
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredEstrategias.length > 0 ? (
              filteredEstrategias.map((estrategia) => (
                <motion.div key={estrategia.slug} variants={item}>
                  <StrategyCard estrategia={estrategia} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No se encontraron estrategias que coincidan con tu búsqueda.</p>
              </div>
            )}
          </motion.div>
        )}
      </main>

      <StrategyCTA />
    </div>
  )
}
