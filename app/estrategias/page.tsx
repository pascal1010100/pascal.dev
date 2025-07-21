import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { estrategias as strategies } from "@/data/estrategias";

export default function EstrategiasPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-background">
      <section className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Estrategias para Monetizar con Tecnología e IA</h1>
        <p className="text-muted-foreground mb-12 text-lg">
          Descubre formas inteligentes y reales de generar ingresos aprovechando el poder de la inteligencia artificial.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {strategies.map((strategy) => (
            <Link href={`/estrategias/${strategy.slug}`} key={strategy.slug}>
              <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <Image
                  src={strategy.image}
                  alt={strategy.title}
                  width={500}
                  height={300}
                  className="rounded-t-xl object-cover w-full h-52"
                />
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{strategy.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {strategy.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
