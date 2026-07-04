import {
  resultadosAxeLMS,
  evaluacionContenidoWhatsApp,
  principiosPOURReporte,
  iteracionesMejora,
  herramientaAuditoria,
  resumenAuditoria,
} from "@/data/reporte-accesibilidad";
import Image from "next/image";
import WcagReportTable from "@/components/ui/WcagReportTable";
import WhatsAppContentReportTable from "@/components/ui/WhatsAppContentReportTable";
import ExportWordButton from "@/components/ui/ExportWordButton";

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
  const totalLMS = resultadosAxeLMS.length;
  const pasanLMS = resultadosAxeLMS.filter((r) => r.estado === "Pasa").length;
  const noPasanLMS = resultadosAxeLMS.filter((r) => r.estado === "No pasa").length;
  const incompletosLMS = resultadosAxeLMS.filter((r) => r.estado === "Incompleto").length;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <section className="mb-12">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Entregable E3
        </span>
        <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Reporte de Evaluación de Accesibilidad
          </h1>
          <ExportWordButton />
        </div>
        <p className="text-gray-600 max-w-3xl">
          Reporte integral con dos metodologias: auditoria tecnica automatizada con{" "}
          <strong>{herramientaAuditoria.nombre} v{herramientaAuditoria.version}</strong>{" "}
          para la Plataforma Web (LMS), y revision de accesibilidad del contenido
          entregado por el Delivery Adaptativo por WhatsApp.
        </p>
      </section>

      {/* Resumen ejecutivo */}
      <section className="mb-12 bg-gray-50 border border-gray-200 rounded-lg p-6" aria-labelledby="resumen-heading">
        <h2 id="resumen-heading" className="text-xl font-bold text-gray-900 mb-4">Resumen ejecutivo</h2>

        <p className="text-sm text-gray-600 mb-6">
          El LMS se evalua con axe porque es desarrollo web propio. WhatsApp se evalua
          por la accesibilidad del contenido entregado, no por el simulador web usado
          para demostrar el flujo.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-gray-900">{totalLMS}</div>
            <div className="text-sm text-gray-500">Reglas axe LMS</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-emerald-600">{pasanLMS}</div>
            <div className="text-sm text-gray-500">Pasan</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{incompletosLMS}</div>
            <div className="text-sm text-gray-500">Incompletas</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{noPasanLMS}</div>
            <div className="text-sm text-gray-500">No pasan</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Plataforma Web (LMS)</h3>
            <p className="text-sm text-gray-600 mb-3">{resumenAuditoria.lms.metodologia}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-emerald-700 font-medium">{resumenAuditoria.lms.passes} passes</span>
              <span className="text-red-700 font-medium">{resumenAuditoria.lms.violations} violaciones</span>
              <span className="text-amber-700 font-medium">{resumenAuditoria.lms.incomplete} incompletas</span>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Delivery Adaptativo por WhatsApp</h3>
            <p className="text-sm text-gray-600 mb-3">{resumenAuditoria.whatsapp.metodologia}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="text-emerald-700 font-medium">{resumenAuditoria.whatsapp.optimos} optimos</span>
              <span className="text-blue-700 font-medium">{resumenAuditoria.whatsapp.cumplen} cumplen</span>
              <span className="text-gray-700 font-medium">{resumenAuditoria.whatsapp.formatosEvaluados} formatos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12" aria-labelledby="tabla-lms-heading">
        <h2 id="tabla-lms-heading" className="text-xl font-bold text-gray-900 mb-3">
          Plataforma Web (LMS) - Reglas axe evaluadas
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Tabla completa de reglas clasificadas por axe como pasan, no pasan o requieren
          revision manual. Esta auditoria aplica al LMS por ser desarrollo web propio.
        </p>
        <WcagReportTable resultados={resultadosAxeLMS} />
      </section>

      <section className="mb-12" aria-labelledby="tabla-whatsapp-heading">
        <h2 id="tabla-whatsapp-heading" className="text-xl font-bold text-gray-900 mb-3">
          Delivery Adaptativo por WhatsApp - Evaluacion del contenido
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Esta seccion no usa axe porque el canal real es WhatsApp. Se evalua que el
          contenido entregado sea accesible segun formato y perfil del usuario.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-900">
            Nota metodologica: {resumenAuditoria.whatsapp.nota}
          </p>
        </div>
        <WhatsAppContentReportTable evaluaciones={evaluacionContenidoWhatsApp} />
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
          Evidencia visual y metodologica
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Las capturas del LMS respaldan la auditoria tecnica con axe. Las capturas de
          WhatsApp se conservan solo como evidencia ilustrativa del flujo de delivery
          adaptativo, no como resultado tecnico de axe sobre el canal real.
        </p>

        <h3 className="font-semibold text-gray-900 mb-4">Capturas de página completa</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-900">Plataforma Web (LMS)</span>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">{resumenAuditoria.lms.passes} passes, {resumenAuditoria.lms.violations} violaciones</span>
            </div>
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/audits/lms-screenshot.png"
                alt="Captura del componente LMS auditado con axe DevTools"
                fill
                className="object-contain border border-gray-200 rounded"
              />
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-900">Delivery Adaptativo por WhatsApp</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Evidencia ilustrativa del flujo</span>
            </div>
            <div className="relative w-full aspect-[4/3]">
              <Image
                src="/audits/whatsapp-screenshot.png"
                alt="Captura ilustrativa del flujo de contenido adaptativo por WhatsApp"
                fill
                className="object-contain border border-gray-200 rounded"
              />
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-gray-900 mb-4">Violaciones detectadas por axe-core</h3>
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-bold text-sm text-red-800 mb-2">1.4.3 Contraste mínimo (AA) — 1 nodo en LMS</h4>
            <p className="text-sm text-gray-700 mb-2">
              Texto .text-gray-500 en el contenedor de estadísticas del dashboard LMS
              con contraste insuficiente sobre fondo blanco. 10 nodos adicionales
              marcados como incompletos, pendientes de revisión manual.
            </p>
            <div className="relative w-64 h-40">
              <Image
                src="/audits/lms-violation-color-contrast-0.png"
                alt="Violación de contraste en LMS"
                fill
                className="object-contain border border-red-200 rounded"
              />
            </div>
          </div>


          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-bold text-sm text-red-800 mb-2">page-has-heading-one — 1 nodo en LMS</h4>
            <p className="text-sm text-gray-700">
              La pagina de auditoria del LMS contiene el componente sin un encabezado
              de nivel 1 (&lt;h1&gt;) en el wrapper de auditoria. Se recomienda agregar
              un h1 en esa pagina wrapper para cumplir con la estructura jerarquica
              de encabezados.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
