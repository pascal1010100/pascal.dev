'use client';

import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Icons } from '../../components/icons';
import Link from 'next/link';

interface ResourceCardProps {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  featured?: boolean;
  icon?: keyof typeof Icons;
  category?: string;
}

export function ResourceCard({
  id,
  title,
  description,
  url,
  tags = [],
  featured = false,
  icon = 'externalLink',
  category,
}: ResourceCardProps) {
  const Icon = Icons[icon] || Icons.externalLink;
  
  return (
    <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 border-border/50 hover:border-primary/50">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-lg group-hover:text-primary transition-colors line-clamp-1">
                {title}
              </h3>
              {category && (
                <span className="text-xs text-muted-foreground">{category}</span>
              )}
            </div>
          </div>
          {featured && (
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
              Destacado
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <Badge 
                key={`${id}-${tag}`} 
                variant="outline" 
                className="text-xs font-normal bg-background/50 backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-primary/5 group-hover:border-primary/30 group-hover:text-foreground transition-colors"
          >
            <Icons.externalLink className="mr-2 h-4 w-4 opacity-70" />
            Visitar recurso
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
