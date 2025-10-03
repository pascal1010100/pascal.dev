import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TagBadgeProps {
  tag: string;
  className?: string;
  href?: string;
}

export function TagBadge({ tag, className, href }: TagBadgeProps) {
  const content = (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-gray-800/50 px-3 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700/50',
        className
      )}
    >
      #{tag}
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
