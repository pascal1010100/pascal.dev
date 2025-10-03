import type { Metadata } from "next";
import { Suspense } from "react";
import RecursosClient from "./RecursosClient";

export const metadata: Metadata = {
  title: "Recursos para Desarrolladores | Pascal Dev",
  description: "Colección de recursos útiles para desarrolladores: herramientas, librerías, tutoriales y más.",
  openGraph: {
    title: "Recursos para Desarrolladores | Pascal Dev",
    description: "Colección de recursos útiles para desarrolladores: herramientas, librerías, tutoriales y más.",
    url: "https://pascal-dev.vercel.app/recursos",
    siteName: "Pascal Dev",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recursos para Desarrolladores | Pascal Dev",
    description: "Colección de recursos útiles para desarrolladores: herramientas, librerías, tutoriales y más.",
  },
  alternates: {
    canonical: "https://pascal-dev.vercel.app/recursos",
  },
};

function RecursosSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-12 text-center">
        <div className="h-12 bg-muted rounded-lg w-3/4 mx-auto mb-4 animate-pulse"></div>
        <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
      </div>
      
      {/* Search and Filters Skeleton */}
      <div className="mb-8 space-y-4">
        <div className="h-12 bg-muted rounded-lg w-full animate-pulse"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-muted rounded-md w-24 animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4 p-6 border rounded-lg bg-card">
            <div className="h-6 w-3/4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-full bg-muted rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-muted rounded animate-pulse"></div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 bg-muted rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RecursosPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<RecursosSkeleton />}>
        <RecursosClient />
      </Suspense>
    </main>
  );
}
