import Link from "next/link";
import Image from "next/image";
import { estrategias } from "@/data/estrategias";

export default function EstrategiasPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Explora Estrategias Inteligentes</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {estrategias.map((estrategia) => (
          <Link
            key={estrategia.slug}
            href={`/estrategias/${estrategia.slug}`}
            className="bg-card shadow-md rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <Image
              src={estrategia.image}
              alt={estrategia.title}
              width={800}
              height={500}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{estrategia.title}</h2>
              <p className="text-muted-foreground text-sm">{estrategia.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
