import { criteriosWCAG, principiosPOUR } from "@/data/wcag";
import WcagTable from "@/components/ui/WcagTable";

export default function AccesibilidadSection() {
  return (
    <section
      id="fase-03"
      className="min-h-screen px-6 py-20 bg-white"
      aria-labelledby="a11y-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 03 · Dimensiones de Inclusión
        </span>
        <h2 id="a11y-titulo" className="text-pres-title text-gray-900 mb-8">
          Accesibilidad y Diseño Universal
        </h2>

        <WcagTable criterios={criteriosWCAG} />

        <div className="mt-12">
          <h3 className="text-pres-subtitle text-gray-900 mb-6">Principios POUR</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {principiosPOUR.map((p) => (
              <div
                key={p.principio}
                className="bg-gray-50 border border-gray-200 rounded-lg p-5"
              >
                <h4 className="font-bold text-brand-700 mb-2">{p.principio}</h4>
                <p className="text-sm text-gray-700">{p.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
