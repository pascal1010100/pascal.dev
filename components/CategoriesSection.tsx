"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Globe, Lightbulb, DollarSign } from "lucide-react";

const categories = [
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Estrategias de Monetización",
    description: "Tácticas comprobadas para ganar dinero con IA y herramientas digitales.",
    href: "/categorias/monetizacion",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Vida Nómada Digital",
    description: "Recursos y hacks para trabajar desde cualquier parte del mundo.",
    href: "/categorias/nomadas-digitales",
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Innovación Tecnológica",
    description: "Tendencias tecnológicas, startups y herramientas emergentes.",
    href: "/categorias/innovacion",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Marketing de Afiliados",
    description: "Multiplica tus ingresos con las mejores estrategias de afiliación.",
    href: "/categorias/afiliados",
  },
];

function CategoryCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card className="p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow rounded-2xl border border-border bg-background">
      <div className="p-3 rounded-full bg-primary/10 text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 text-sm">{description}</p>
      <Button variant="link" asChild className="mt-auto text-primary font-medium">
        <Link href={href}>
          Explorar <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </Card>
  );
}

export default function CategoriesSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Explora Nuestras Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}
