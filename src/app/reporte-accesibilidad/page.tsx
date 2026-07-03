import {
  resultadosWCAG,
  principiosPOURReporte,
  iteracionesMejora,
  herramientaAuditoria,
} from "@/data/reporte-accesibilidad";
import WcagReportTable from "@/components/ui/WcagReportTable";

function POURCard({
  principio,
  descripcion,
  aplicacionLMS,
  aplicacionWhatsApp,
}: {
  principio: string;
  descripcion: string;
  aplicacionLMS: string;
  aplicacionWhatsApp: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="font-bold text-brand-700 text-lg mb-2">{principio}</h3>
      <p className="text-sm text-gray-600 mb-4">{descripcion}</p>
      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">LMS</span>
          <p className="text-sm text-gray-700 mt-1">{aplicacionLMS}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">WhatsApp</span>
          <p className="text-sm text-gray-700 mt-1">{aplicacionWhatsApp}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReporteAccesibilidadPage() {
  const total = resultadosWCAG.length;
  const pasan = resultadosWCAG.filter((r) => r.resultado === "Pasa").length;
  const noPasan = resultadosWCAG.filter((r) => r.resultado === "No pasa").length;
  const incompletos = resultadosWCAG.filter((r) => r.resultado === "Incompleto").length;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <section className="mb-12">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Entregable E3
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Reporte de Evaluación de Accesibilidad
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Evaluación técnica basada en WCAG 2.2 aplicada a los dos componentes principales
          del proyecto: la Plataforma Web (LMS) y el Delivery Adaptativo por WhatsApp.
          Herramienta utilizada: <strong>{herramientaAuditoria.nombre} v{herramientaAuditoria.version}</strong> ({herramientaAuditoria.tipo}).
        </p>
      </section>

      {/* Resumen ejecutivo */}
      <section className="mb-12 bg-gray-50 border border-gray-200 rounded-lg p-6" aria-labelledby="resumen-heading">
        <h2 id="resumen-heading" className="text-xl font-bold text-gray-900 mb-4">Resumen ejecutivo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-gray-900">{total}</div>
            <div className="text-sm text-gray-500">Criterios evaluados</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-emerald-600">{pasan}</div>
            <div className="text-sm text-gray-500">Pasan</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{incompletos}</div>
            <div className="text-sm text-gray-500">Incompletos</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{noPasan}</div>
            <div className="text-sm text-gray-500">No pasan</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-200 inline-block"></span> Nivel A: {resultadosWCAG.filter(r => r.nivel === "A").length}</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-200 inline-block"></span> Nivel AA: {resultadosWCAG.filter(r => r.nivel === "AA").length}</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-200 inline-block"></span> Nivel AAA: {resultadosWCAG.filter(r => r.nivel === "AAA").length}</span>
          <span className="flex items-center gap-1">|</span>
          <span className="flex items-center gap-1">LMS: {resultadosWCAG.filter(r => r.plataforma === "LMS" || r.plataforma === "Ambos").length}</span>
          <span className="flex items-center gap-1">WhatsApp: {resultadosWCAG.filter(r => r.plataforma === "WhatsApp" || r.plataforma === "Ambos").length}</span>
        </div>
      </section>

      {/* Tabla WCAG */}
      <section className="mb-12" aria-labelledby="tabla-heading">
        <h2 id="tabla-heading" className="text-xl font-bold text-gray-900 mb-6">
          Criterios WCAG 2.2 evaluados
        </h2>
        <WcagReportTable resultados={resultadosWCAG} />
      </section>

      {/* Principios POUR */}
      <section className="mb-12" aria-labelledby="pour-heading">
        <h2 id="pour-heading" className="text-xl font-bold text-gray-900 mb-6">
          Principios POUR — Aplicación por plataforma
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {principiosPOURReporte.map((p) => (
            <POURCard key={p.principio} {...p} />
          ))}
        </div>
      </section>

      {/* Iteración de mejora */}
      <section className="mb-12" aria-labelledby="iteracion-heading">
        <h2 id="iteracion-heading" className="text-xl font-bold text-gray-900 mb-6">
          Iteraciones de mejora documentadas
        </h2>
        <div className="space-y-6">
          {iteracionesMejora.map((it) => (
            <div key={it.titulo} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-bold text-gray-900">{it.titulo}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{it.plataforma}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{it.descripcion}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Antes</span>
                  <p className="text-sm text-gray-700 mt-2">{it.antes}</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Después</span>
                  <p className="text-sm text-gray-700 mt-2">{it.despues}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evidencia visual */}
      <section className="mb-12" aria-labelledby="evidencia-heading">
        <h2 id="evidencia-heading" className="text-xl font-bold text-gray-900 mb-4">
          Evidencia visual — Auditoría con axe DevTools
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Las siguientes capturas fueron generadas ejecutando axe-core via Playwright sobre
          el sitio en entorno de desarrollo. Cada captura muestra el resultado de la auditoría
          automatizada sobre los componentes evaluados.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <p className="text-sm text-amber-800 font-medium">
            ⚡ Las capturas de axe DevTools se generarán al ejecutar el script de auditoría.
            Actualmente se muestra la estructura del reporte con datos teóricos.
          </p>
          <p className="text-xs text-amber-600 mt-2">
            Para generar: <code className="bg-amber-100 px-1 rounded">npm run audit:a11y</code>
          </p>
        </div>
      </section>
    </div>
  );
}
