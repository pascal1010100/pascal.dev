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
