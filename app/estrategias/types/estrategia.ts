export type Difficulty = 'Principiante' | 'Intermedio' | 'Avanzado';

export interface Estrategia {
  slug: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  content?: string;
  date?: string;
  tags?: string[];
  difficulty?: Difficulty;
  readTime?: string;
  features?: string[];
  tools?: {
    name: string;
    description: string;
    url?: string;
  }[];
  steps?: string[];
  benefits?: string[];
  pricingStrategy?: {
    model: 'Recurrente' | 'Unico' | 'Suscripción' | 'Freemium';
    description: string;
  };
  automationTools?: string[];
  revenuePotential?: {
    min: number;
    max: number;
    currency?: string;
    period?: 'mes' | 'año';
  };
  successStory?: {
    example: string;
    result: string;
  };
}

export interface DifficultyInfo {
  level: Difficulty;
  color: string;
  label: string;
}

export interface SortOption {
  value: string;
  label: string;
}
