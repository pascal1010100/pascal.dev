"use client";

import { memo, Suspense, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

// Carga perezosa del Navbar con prefetching
const Navbar = dynamic(
  () => import('./Navbar').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full" aria-busy="true" aria-live="polite">
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }
);

// Componente de borde inferior para la navegación activa
const ActiveIndicator = memo(({ isActive }: { isActive: boolean }) => (
  <span 
    className={cn(
      "absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300",
      isActive ? 'opacity-100' : 'opacity-0'
    )}
    aria-hidden="true"
  />
));

ActiveIndicator.displayName = 'ActiveIndicator';

function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // Memoizar el header para evitar re-renderizados innecesarios
  const MemoizedHeader = useCallback(
    () => (
      <header 
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-lg",
          "supports-[backdrop-filter]:bg-background/80 transition-shadow duration-300",
          isHomePage ? 'shadow-none' : 'shadow-sm'
        )}
        role="banner"
        data-testid="main-header"
      >
        <div className="container mx-auto px-4">
          <Suspense fallback={
            <div className="h-16 flex items-center" aria-busy="true">
              <Skeleton className="h-8 w-32" />
            </div>
          }>
            <Navbar />
          </Suspense>
        </div>
        <ActiveIndicator isActive={!isHomePage} />
      </header>
    ),
    [isHomePage]
  );

  return <MemoizedHeader />;
}

export default memo(Header);
