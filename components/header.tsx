"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

// Carga perezosa del Navbar
const Navbar = dynamic(() => import('./Navbar'), {
  ssr: false,
  loading: () => (
    <div className="w-full">
      <Skeleton className="h-16 w-full" />
    </div>
  )
});

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <Navbar />
      </div>
    </header>
  );
}
