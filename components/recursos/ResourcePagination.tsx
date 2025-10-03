'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Icons } from '../../components/icons';
import { cn } from '../../lib/utils';

interface ResourcePaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
  pageSize?: number;
  totalItems?: number;
}

export function ResourcePagination({
  currentPage,
  totalPages,
  className,
  pageSize = 10,
  totalItems,
}: ResourcePaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Función para generar la URL de una página específica
  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    
    return `${pathname}?${params.toString()}`;
  };
  
  // Calcular los números de página a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  const showFirstPage = !pageNumbers.includes(1);
  const showLastPage = !pageNumbers.includes(totalPages) && totalPages > 1;
  const showStartEllipsis = !pageNumbers.includes(2) && totalPages > 5;
  const showEndEllipsis = !pageNumbers.includes(totalPages - 1) && totalPages > 5;
  
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4', className)}>
      <div className="text-sm text-muted-foreground">
        {totalItems !== undefined && (
          <span>
            Mostrando <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> a{' '}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, totalItems)}
            </span>{' '}
            de <span className="font-medium">{totalItems}</span> recursos
          </span>
        )}
      </div>
      
      <nav className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 p-0"
          disabled={currentPage === 1}
          asChild={currentPage > 1}
        >
          {currentPage > 1 ? (
            <Link href={createPageURL(currentPage - 1)} aria-label="Página anterior">
              <Icons.chevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <button>
              <Icons.chevronLeft className="h-4 w-4" />
            </button>
          )}
        </Button>
        
        {/* Primera página */}
        {showFirstPage && (
          <>
            <Button
              variant={currentPage === 1 ? 'default' : 'outline'}
              size="icon"
              className="h-9 w-9 p-0"
              asChild={currentPage !== 1}
            >
              {currentPage !== 1 ? (
                <Link href={createPageURL(1)}>
                  <span className="sr-only">Página 1</span>
                  <span>1</span>
                </Link>
              ) : (
                <button>
                  <span className="sr-only">Página 1</span>
                  <span>1</span>
                </button>
              )}
            </Button>
            
            {showStartEllipsis && (
              <Button variant="ghost" size="icon" className="h-9 w-9 p-0 cursor-default" disabled>
                ...
              </Button>
            )}
          </>
        )}
        
        {/* Números de página */}
        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? 'default' : 'outline'}
            size="icon"
            className="h-9 w-9 p-0"
            asChild={currentPage !== page}
          >
            {currentPage !== page ? (
              <Link href={createPageURL(page)}>
                <span className="sr-only">Página {page}</span>
                <span>{page}</span>
              </Link>
            ) : (
              <button>
                <span className="sr-only">Página {page}</span>
                <span>{page}</span>
              </button>
            )}
          </Button>
        ))}
        
        {/* Última página */}
        {showLastPage && (
          <>
            {showEndEllipsis && (
              <Button variant="ghost" size="icon" className="h-9 w-9 p-0 cursor-default" disabled>
                ...
              </Button>
            )}
            
            <Button
              variant={currentPage === totalPages ? 'default' : 'outline'}
              size="icon"
              className="h-9 w-9 p-0"
              asChild={currentPage !== totalPages}
            >
              {currentPage !== totalPages ? (
                <Link href={createPageURL(totalPages)}>
                  <span className="sr-only">Página {totalPages}</span>
                  <span>{totalPages}</span>
                </Link>
              ) : (
                <button>
                  <span className="sr-only">Página {totalPages}</span>
                  <span>{totalPages}</span>
                </button>
              )}
            </Button>
          </>
        )}
        
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 p-0"
          disabled={currentPage === totalPages}
          asChild={currentPage < totalPages}
        >
          {currentPage < totalPages ? (
            <Link href={createPageURL(currentPage + 1)} aria-label="Página siguiente">
              <Icons.chevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <button>
              <Icons.chevronRight className="h-4 w-4" />
            </button>
          )}
        </Button>
      </nav>
    </div>
  );
}
