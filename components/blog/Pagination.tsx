'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}

export function Pagination({ currentPage, totalPages, className }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className={cn('flex items-center justify-center space-x-2', className)}
      aria-label="Paginación"
    >
      <Link
        href={createPageURL(currentPage - 1)}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-gray-400 transition-colors hover:bg-gray-800/70',
          {
            'pointer-events-none opacity-50': currentPage === 1,
          }
        )}
        aria-label="Página anterior"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {!pageNumbers.includes(1) && (
        <>
          <Link
            href={createPageURL(1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800/70"
          >
            1
          </Link>
          {!pageNumbers.includes(2) && (
            <span className="flex h-10 w-10 items-center justify-center text-gray-600">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          )}
        </>
      )}

      {pageNumbers.map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
            {
              'border-primary bg-primary/10 text-primary': page === currentPage,
              'border-gray-800 bg-gray-900/50 text-gray-300 hover:bg-gray-800/70':
                page !== currentPage,
            }
          )}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {!pageNumbers.includes(totalPages) && (
        <>
          {!pageNumbers.includes(totalPages - 1) && (
            <span className="flex h-10 w-10 items-center justify-center text-gray-600">
              <MoreHorizontal className="h-4 w-4" />
            </span>
          )}
          <Link
            href={createPageURL(totalPages)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800/70"
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={createPageURL(currentPage + 1)}
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-2 text-gray-400 transition-colors hover:bg-gray-800/70',
          {
            'pointer-events-none opacity-50': currentPage >= totalPages,
          }
        )}
        aria-label="Página siguiente"
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
