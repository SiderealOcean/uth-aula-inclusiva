import { riesgos, metricasImpacto, hitosPlan } from "@/data/viabilidad";

export default function ViabilidadSection() {
  return (
    <section
      id="fase-04"
      className="min-h-screen px-6 py-20 bg-gray-50"
      aria-labelledby="viabilidad-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 04 · Viabilidad y Proyección
        </span>
        <h2 id="viabilidad-titulo" className="text-pres-title text-gray-900 mb-8">
          Viabilidad, Riesgos y Próximos Pasos
        </h2>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Métricas de impacto esperado</h3>
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {metricasImpacto.map((m) => (
            <div
              key={m.indicador}
              className="bg-brand-50 border border-brand-200 rounded-lg p-5 text-center"
            >
              <p className="text-3xl font-bold text-brand-900 mb-1">{m.valor}</p>
              <p className="text-sm text-brand-700">{m.indicador}</p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Riesgos y mitigaciones</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {riesgos.map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
              <span className="text-xs font-bold uppercase text-gray-500">
                {r.categoria}
              </span>
              <p className="text-pres-body text-gray-900 mt-1 mb-2 font-medium">
                {r.descripcion}
              </p>
              <p className="text-sm text-green-700">
                <strong>Mitigación:</strong> {r.mitigacion}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Plan de implementación (alto nivel)</h3>
        <ol className="space-y-3">
          {hitosPlan.map((h, i) => (
            <li key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
              <span className="bg-brand-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-pres-body text-gray-800">{h}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
