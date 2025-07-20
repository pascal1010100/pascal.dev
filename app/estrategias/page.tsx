import { estrategias } from "@/data/estrategias";

export default function EstrategiasPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Explora Estrategias</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {estrategias.map((estrategia) => (
          <div
            key={estrategia.id}
            className="border border-border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{estrategia.titulo}</h2>
            <p className="text-muted-foreground">{estrategia.descripcion}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
