import { barrerasHonduras, poblacionesObjetivo } from "@/data/contexto";
import StatCard from "@/components/ui/StatCard";

export default function ContextoSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-gray-50"
      aria-labelledby="contexto-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 01 · Contexto y Problema
        </span>
        <h2 id="contexto-titulo" className="text-pres-title text-gray-900 mb-8">
          La brecha digital en Honduras
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {barrerasHonduras.map((b) => (
            <StatCard key={b.titulo} {...b} />
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-6 mt-12">
          Población objetivo
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {poblacionesObjetivo.map((p) => (
            <div
              key={p.grupo}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <h4 className="font-bold text-brand-700 mb-1">{p.grupo}</h4>
              <p className="text-sm text-gray-600 mb-1">{p.descripcion}</p>
              <p className="text-xs text-gray-400">{p.estimacion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
