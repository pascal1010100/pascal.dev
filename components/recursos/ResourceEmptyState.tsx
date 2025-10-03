'use client';

import { Button } from '../../components/ui/button';
import { Icons } from '../../components/icons';

type ResourceEmptyStateProps = {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  icon?: keyof typeof Icons;
  className?: string;
};

export function ResourceEmptyState({
  title = 'No se encontraron recursos',
  description = 'No hay recursos que coincidan con los filtros seleccionados. Intenta con otros criterios de búsqueda.',
  actionText = 'Ver todos los recursos',
  actionHref = '/recursos',
  icon = 'search',
  className = '',
}: ResourceEmptyStateProps) {
  const Icon = Icons[icon] || Icons.search;
  
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 text-center',
      'rounded-lg border-2 border-dashed border-border bg-card/50',
      className
    )}>
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted/50 mb-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-medium text-foreground mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-md mb-6">
        {description}
      </p>
      
      {actionHref && actionText && (
        <Button asChild variant="outline">
          <a href={actionHref}>
            <Icons.arrowLeft className="mr-2 h-4 w-4" />
            {actionText}
          </a>
        </Button>
      )}
    </div>
  );
}

// Helper function to handle class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
