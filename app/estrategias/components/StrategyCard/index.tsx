import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, DollarSign, Clock, CheckCircle, BookOpen, ShoppingCart, Star, TrendingUp, Settings, FileText } from 'lucide-react';
import { Estrategia } from '../../types/estrategia';

// Mapeo de categorías a iconos y colores
const categoryIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  'Automatización': { icon: <Settings className="h-4 w-4" />, color: 'bg-blue-100 text-blue-800' },
  'Productos Digitales': { icon: <FileText className="h-4 w-4" />, color: 'bg-purple-100 text-purple-800' },
  'Educación': { icon: <BookOpen className="h-4 w-4" />, color: 'bg-green-100 text-green-800' },
  'E-commerce': { icon: <ShoppingCart className="h-4 w-4" />, color: 'bg-yellow-100 text-yellow-800' },
  'default': { icon: <TrendingUp className="h-4 w-4" />, color: 'bg-gray-100 text-gray-800' }
};

// Mapeo de dificultad a estrellas
const renderDifficultyStars = (level: string) => {
  const levels = {
    'Principiante': 1,
    'Intermedio': 2,
    'Avanzado': 3
  };
  
  const starCount = levels[level as keyof typeof levels] || 1;
  
  return (
    <div className="flex items-center">
      {[...Array(3)].map((_, i) => (
        <Star 
          key={i} 
          className={`h-3 w-3 ${i < starCount ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{level}</span>
    </div>
  );
};

interface StrategyCardProps {
  estrategia: Estrategia;
}

export function StrategyCard({ estrategia }: StrategyCardProps) {
  const categoryInfo = categoryIcons[estrategia.category || 'default'] || categoryIcons.default;
  
  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col group border border-border/50 hover:border-primary/20">
      <Link href={`/estrategias/${estrategia.slug}`} className="block h-full">
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Image
            src={estrategia.image || '/images/estrategias/default.jpg'}
            alt={estrategia.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badge de categoría */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${categoryInfo.color}`}>
              {categoryInfo.icon}
              <span className="ml-1">{estrategia.category}</span>
            </span>
          </div>
          
          {/* Nivel de dificultad */}
          {estrategia.difficulty && (
            <div className="absolute bottom-4 left-4 z-20">
              {renderDifficultyStars(estrategia.difficulty)}
            </div>
          )}
          
          {/* Modelo de precios */}
          {estrategia.pricingStrategy && (
            <div className="absolute top-4 right-4 z-20">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm border border-border/50 shadow-sm">
                <DollarSign className="h-3 w-3 mr-1.5" />
                <span className="text-xs">{estrategia.pricingStrategy.model}</span>
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-3 relative">
          {/* Línea decorativa */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <CardTitle className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {estrategia.title}
          </CardTitle>
          {estrategia.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {estrategia.description}
            </p>
          )}
        </CardHeader>

        <CardContent className="flex-1 pb-2">
          {/* Características clave */}
          {estrategia.features && estrategia.features.length > 0 && (
            <div className="space-y-2.5 mb-4">
              <h4 className="text-sm font-medium flex items-center text-foreground/80">
                <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                Características clave
              </h4>
              <ul className="space-y-2 text-sm">
                {estrategia.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-start group/feature">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0 opacity-0 group-hover/feature:opacity-100 transition-opacity" />
                    <span className="text-muted-foreground group-hover/feature:text-foreground transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Herramientas de automatización */}
          {estrategia.automationTools && estrategia.automationTools.length > 0 && (
            <div className="space-y-2.5 mb-4">
              <h4 className="text-sm font-medium flex items-center text-foreground/80">
                <Settings className="h-4 w-4 mr-2 text-blue-500" />
                Herramientas recomendadas
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {estrategia.automationTools.slice(0, 4).map((tool, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="text-xs px-2 py-0.5 bg-background/50 backdrop-blur-sm border-border/30 group-hover:border-primary/30 transition-colors"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Potencial de ingresos */}
          {estrategia.revenuePotential && (
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-3 rounded-lg border border-border/30 group-hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium">Potencial de ingresos</span>
                </div>
                <span className="text-sm font-semibold text-primary bg-gradient-to-r from-primary/10 to-transparent px-2 py-0.5 rounded-full">
                  ${estrategia.revenuePotential.min}K - ${estrategia.revenuePotential.max}K/
                  {estrategia.revenuePotential.period === 'mes' ? 'mes' : 'año'}
                </span>
              </div>
              {estrategia.successStory && (
                <div className="mt-2 text-xs text-muted-foreground italic">
                  Ejemplo: {estrategia.successStory.example} - {estrategia.successStory.result}
                </div>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-0 pb-4 px-6">
          <div className="flex items-center text-xs text-muted-foreground group-hover:text-foreground transition-colors">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {estrategia.readTime || '5 min'} de lectura
            
            {estrategia.difficulty && (
              <>
                <span className="mx-2 text-border">•</span>
                <div className="flex items-center">
                  {renderDifficultyStars(estrategia.difficulty)}
                </div>
              </>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-primary group/button px-2.5 py-1.5 h-auto text-sm font-medium bg-background/50 backdrop-blur-sm border border-border/30 group-hover:border-primary/50 rounded-lg transition-all duration-300 hover:bg-primary/10 hover:shadow-sm hover:shadow-primary/10"
          >
            Ver estrategia
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/button:translate-x-0.5 transition-transform" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
