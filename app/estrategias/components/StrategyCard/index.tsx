import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Estrategia, DifficultyInfo } from '../../types/estrategia';

const difficultyLevels: DifficultyInfo[] = [
  { level: 'Principiante', color: 'bg-green-500', label: 'Principiante' },
  { level: 'Intermedio', color: 'bg-yellow-500', label: 'Intermedio' },
  { level: 'Avanzado', color: 'bg-red-500', label: 'Avanzado' }
] as const;

interface StrategyCardProps {
  estrategia: Estrategia;
}

export function StrategyCard({ estrategia }: StrategyCardProps) {
  const difficultyInfo = (level: string = 'Principiante'): DifficultyInfo => {
    return difficultyLevels.find(d => d.level === level) || difficultyLevels[0];
  };

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/estrategias/${estrategia.slug}`} className="block h-full">
        <div className="relative aspect-video">
          <Image
            src={estrategia.image || '/images/estrategias/default.jpg'}
            alt={estrategia.title}
            fill
            className="object-cover"
          />
          {estrategia.difficulty && (
            <div className="absolute bottom-4 left-4">
              <span 
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${
                  difficultyInfo(estrategia.difficulty).color
                }`}
              >
                {estrategia.difficulty}
              </span>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-semibold line-clamp-2">
            {estrategia.title}
          </CardTitle>
          {estrategia.description && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {estrategia.description}
            </p>
          )}
        </CardHeader>
      </Link>
    </Card>
  );
}
