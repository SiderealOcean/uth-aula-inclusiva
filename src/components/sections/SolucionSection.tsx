import { stackTecnologico, enfoques, archivoReglasAdaptacion, costosEstimados } from "@/data/tecnologia";

export default function SolucionSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-white"
      aria-labelledby="solucion-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 02 · Solución Tecnológica
        </span>
        <h2 id="solucion-titulo" className="text-pres-title text-gray-900 mb-8">
          Arquitectura y Stack Tecnológico
        </h2>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Stack tecnológico</h3>
        <div className="overflow-x-auto mb-10" role="region" aria-label="Stack tecnológico" tabIndex={0}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Capa</th>
                <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Tecnología</th>
                <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Justificación</th>
              </tr>
            </thead>
            <tbody>
              {stackTecnologico.map((s) => (
                <tr key={s.capa} className="border-b border-gray-200">
                  <td className="py-3 px-4 font-medium text-pres-body">{s.capa}</td>
                  <td className="py-3 px-4 text-pres-body font-mono text-brand-700">{s.tecnologia}</td>
                  <td className="py-3 px-4 text-pres-body text-gray-600">{s.justificacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Enfoques evaluados</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {enfoques.map((e) => (
            <div
              key={e.nombre}
              className={`border-2 rounded-lg p-5 ${
                e.seleccionado
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-200"
              }`}
            >
              <h4 className="font-bold text-gray-900 mb-2">
                {e.seleccionado && "✅ "}{e.nombre}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{e.descripcion}</p>
              <ul className="text-sm space-y-1 mb-3">
                {e.pros.map((p, i) => (
                  <li key={i} className="text-green-700">+ {p}</li>
                ))}
                {e.contras.map((c, i) => (
                  <li key={i} className="text-red-600">- {c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Reglas de adaptación automática</h3>
        <pre className="bg-gray-900 text-green-400 p-6 rounded-lg text-sm overflow-x-auto mb-10" aria-label="Reglas de adaptación">
          {archivoReglasAdaptacion.trim()}
        </pre>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Costos estimados (MVP)</h3>
        <div className="space-y-2 mb-10">
          {costosEstimados.map((c) => (
            <div key={c.item} className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span className="text-pres-body">{c.item}</span>
              <span className="font-bold text-brand-700">{c.costo}</span>
              <span className="text-sm text-gray-500">{c.nota}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
