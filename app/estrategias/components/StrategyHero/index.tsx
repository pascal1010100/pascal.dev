import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface StrategyHeroProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClearSearch: () => void;
}

export function StrategyHero({ searchTerm, onSearchChange, onClearSearch }: StrategyHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background/80 to-background/0"></div>
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center justify-center mb-6 group"
          >
            <span className="relative inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Estrategias Comprobadas
              <span className="absolute -z-10 inset-0 rounded-full bg-primary/5 blur-md group-hover:bg-primary/10 transition-colors"></span>
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Potencia tu negocio con <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text">estrategias</span> que funcionan
          </motion.h1>

          <motion.p 
            className="text-foreground/70 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Descubre tácticas efectivas y herramientas probadas para llevar tu negocio al siguiente nivel en la era digital.
          </motion.p>

          <motion.div 
            className="w-full max-w-2xl mx-auto relative group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-foreground/60 group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                type="text"
                placeholder="Buscar estrategias..."
                className="w-full pl-12 pr-10 py-5 text-base bg-background/80 backdrop-blur-lg border border-border/50 rounded-xl shadow-lg
                  focus:border-primary/80 focus:ring-1 focus:ring-primary/30 focus:ring-offset-1 focus:ring-offset-background/50
                  hover:border-primary/50 transition-all duration-300 text-foreground placeholder:text-foreground/40
                  focus:shadow-[0_0_0_3px_RGBA(59,130,246,0.15)] font-medium"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
              {searchTerm && (
                <motion.button 
                  onClick={onClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-foreground/5 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Limpiar búsqueda"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-foreground/50 hover:text-foreground/80 transition-colors"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </motion.button>
              )}
            </div>
            <div className="mt-3 text-center">
              <span className="text-sm text-foreground/50">Ejemplo: SEO, Redes Sociales, Email Marketing</span>
            </div>
          </motion.div>

          <motion.div 
            className="mt-8 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {['Marketing Digital', 'SEO', 'Redes Sociales', 'Email'].map((tag) => (
              <Button 
                key={tag}
                variant="outline" 
                size="sm" 
                className="rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary border-border/50"
                onClick={() => onSearchChange(tag.split(' ')[0].toLowerCase())}
              >
                {tag}
              </Button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
    </section>
  );
}
