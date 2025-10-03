import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: string;
  className?: string;
  href?: string;
}

const categoryColors: Record<string, string> = {
  'Tecnología': 'bg-blue-900/20 text-blue-400 hover:bg-blue-900/30',
  'IA': 'bg-purple-900/20 text-purple-400 hover:bg-purple-900/30',
  'Desarrollo Web': 'bg-emerald-900/20 text-emerald-400 hover:bg-emerald-900/30',
  'Productividad': 'bg-amber-900/20 text-amber-400 hover:bg-amber-900/30',
  'Diseño': 'bg-pink-900/20 text-pink-400 hover:bg-pink-900/30',
  'default': 'bg-gray-800/50 text-gray-400 hover:bg-gray-800/70',
};

export function CategoryBadge({ category, className, href }: CategoryBadgeProps) {
  const colorClass = categoryColors[category] || categoryColors.default;
  
  const content = (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
        colorClass,
        className
      )}
    >
      {category}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
