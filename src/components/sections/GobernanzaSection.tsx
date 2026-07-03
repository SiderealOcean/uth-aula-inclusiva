import { legislacion, analisisRegulatorio, instituciones, propuestaRegulatoria } from "@/data/gobernanza";

export default function GobernanzaSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-gray-50"
      aria-labelledby="gob-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 03 · Dimensiones de Inclusión
        </span>
        <h2 id="gob-titulo" className="text-pres-title text-gray-900 mb-8">
          Gobernanza y Marco Regulatorio
        </h2>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Legislación hondureña aplicable</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {legislacion.map((l) => (
            <div key={l.decreto} className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-bold text-brand-700 mb-1">{l.decreto}</h4>
              <p className="text-sm text-gray-700 mb-2">{l.nombre}</p>
              <p className="text-xs text-gray-500">{l.relevancia}</p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Análisis: facilitadores y obstáculos</h3>
        <div className="space-y-3 mb-10">
          {analisisRegulatorio.map((a, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border ${
                a.tipo === "facilita"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <span className="text-sm font-bold">
                {a.tipo === "facilita" ? "✅ Facilita" : "⚠️ Obstaculiza"}
              </span>
              <p className="text-sm text-gray-700 mt-1">{a.descripcion}</p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Instituciones responsables</h3>
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {instituciones.map((inst) => (
            <div key={inst.siglas} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <h4 className="font-bold text-brand-700 text-lg">{inst.siglas}</h4>
              <p className="text-xs text-gray-600 mt-1">{inst.nombre}</p>
              <p className="text-xs text-gray-500 mt-2">{inst.rol}</p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Propuesta regulatoria propia</h3>
        <blockquote className="border-l-4 border-brand-500 bg-brand-50 p-4 rounded-r-lg max-w-3xl">
          <p className="text-pres-body text-gray-800 italic">
            &quot;{propuestaRegulatoria}&quot;
          </p>
        </blockquote>
      </div>
    </section>
  );
}
