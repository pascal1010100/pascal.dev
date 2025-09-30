"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function StrategyCTA() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para llevar tu negocio al siguiente nivel?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Descubre cómo nuestras estrategias pueden ayudarte a alcanzar tus objetivos de negocio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/contacto" className="group">
                Contáctanos
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">
                Ver más artículos
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
