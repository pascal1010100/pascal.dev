import { motion } from 'framer-motion';
import { SortOption } from '../../types/estrategia';

interface StrategyFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  activeSort: string;
  onSortChange: (sort: string) => void;
  categories: string[];
  sortOptions: SortOption[];
}

export function StrategyFilters({
  selectedCategory,
  onCategoryChange,
  activeSort,
  onSortChange,
  categories,
  sortOptions,
}: StrategyFiltersProps) {
  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">Explorar Estrategias</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Ordenar por:</span>
          <select
            value={activeSort}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent border rounded-lg px-3 py-2 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            !selectedCategory
              ? 'bg-primary text-white'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          Todas
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category === selectedCategory ? null : category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              category === selectedCategory
                ? 'bg-primary text-white'
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

    </motion.div>
  );
}
