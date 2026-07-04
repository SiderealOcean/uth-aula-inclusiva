import {
  etapasLeanStartup,
  hipotesisImpacto,
  proximosPasosPiloto,
  riesgos,
} from "@/data/viabilidad";

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
        <h2 id="viabilidad-titulo" className="text-pres-title text-gray-900 mb-4">
          Viabilidad validada con Lean Startup
        </h2>
        <p className="text-pres-body text-gray-700 max-w-4xl mb-10">
          La proyección del proyecto no se plantea como expansión inmediata, sino
          como un ciclo de aprendizaje validado: descubrir el problema, construir
          un MVP mínimo, medir adopción real y escalar únicamente si la evidencia
          confirma impacto, accesibilidad y sostenibilidad operativa.
        </p>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">
          Impacto esperado como hipótesis medibles
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {hipotesisImpacto.map((m) => (
            <div
              key={m.indicador}
              className="bg-white border border-brand-200 rounded-2xl p-5 shadow-sm"
            >
              <p className="text-3xl font-bold text-brand-900 mb-1">{m.valor}</p>
              <p className="font-bold text-brand-700 mb-2">{m.indicador}</p>
              <p className="text-sm text-gray-600">{m.aprendizaje}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-900 text-white rounded-3xl p-6 md:p-8 mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <span className="text-sm uppercase tracking-widest text-brand-200 mb-2 block">
                Plan de implementación de alto nivel
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold">
                Ciclo Build-Measure-Learn
              </h3>
            </div>
            <p className="text-brand-100 max-w-xl">
              Cada hito incluye actores clave, dependencias tecnológicas o
              regulatorias y una métrica de decisión para avanzar, iterar o pivotar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {etapasLeanStartup.map((etapa) => (
              <article
                key={etapa.fase}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 backdrop-blur"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-white text-brand-900 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0">
                    {etapa.fase}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-brand-200">
                      {etapa.ciclo}
                    </p>
                    <h4 className="text-xl font-bold">{etapa.objetivo}</h4>
                  </div>
                </div>
                <dl className="space-y-3 text-sm text-brand-50">
                  <div>
                    <dt className="font-bold text-white">Experimento</dt>
                    <dd>{etapa.experimento}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-white">Actores clave</dt>
                    <dd>{etapa.actores}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-white">Dependencias</dt>
                    <dd>{etapa.dependencias}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-white">Decisión</dt>
                    <dd>{etapa.metricaDecision}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">
          Riesgos, mitigaciones y pivotes posibles
        </h3>
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {riesgos.map((r) => (
            <div key={r.descripcion} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Riesgo {r.categoria}
              </span>
              <p className="text-pres-body text-gray-900 mt-1 mb-3 font-medium">
                {r.descripcion}
              </p>
              <p className="text-sm text-green-700">
                <strong>Mitigación:</strong> {r.mitigacion}
              </p>
              <p className="text-sm text-brand-700 mt-2">
                <strong>Decisión Lean:</strong> {r.decisionLean}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">
          Próximos pasos hacia un piloto real
        </h3>
        <ol className="grid md:grid-cols-5 gap-3">
          {proximosPasosPiloto.map((paso, i) => (
            <li key={paso.paso} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
              <span className="bg-brand-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3">
                {i + 1}
              </span>
              <h4 className="font-bold text-gray-900 mb-2">{paso.paso}</h4>
              <p className="text-sm text-gray-600">{paso.resultado}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
