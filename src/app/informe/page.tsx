import Link from "next/link";
import {
  conclusionesInforme,
  conteoReferenciasRegionales,
  indiceInforme,
  informePortada,
  referenciasInforme,
  resumenEjecutivo,
  seccionesInforme,
  type InformeSection,
  type InformeTable,
} from "@/data/informe";

function ReportTable({ table }: { table: InformeTable }) {
  return (
    <div className="my-6 overflow-x-auto" role="region" aria-label={table.caption} tabIndex={0}>
      <table className="w-full border-collapse text-sm">
        <caption className="mb-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
          {table.caption}
        </caption>
        <thead>
          <tr className="border-b border-gray-300 bg-gray-50">
            {table.headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-3 text-left font-semibold text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={`${table.caption}-${rowIndex}`} className="border-b border-gray-200">
              {row.map((cell, cellIndex) => (
                <td key={`${table.caption}-${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top text-gray-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DimensionSection({ section }: { section: InformeSection }) {
  return (
    <section id={section.id} className="scroll-mt-32 border-t border-gray-200 py-10 print:break-inside-avoid" aria-labelledby={`${section.id}-titulo`}>
      <div className="mb-5 flex flex-wrap items-baseline gap-3">
        <span className="rounded-full bg-brand-100 px-3 py-1 text-sm font-bold text-brand-800">
          {section.codigo}
        </span>
        <span className="text-sm font-medium text-gray-500">{section.puntaje}</span>
      </div>
      <h2 id={`${section.id}-titulo`} className="mb-3 text-3xl font-bold text-gray-950 print:text-2xl">
        {section.titulo}
      </h2>
      <p className="mb-6 border-l-4 border-brand-500 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-900 print:bg-white">
        {section.resumen}
      </p>
      <div className="space-y-4 text-base leading-8 text-gray-800">
        {section.parrafos.map((parrafo) => (
          <p key={parrafo}>{parrafo}</p>
        ))}
      </div>
      <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-5 print:bg-white">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-600">Evidencia clave</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
          {section.evidencias.map((evidencia) => (
            <li key={evidencia}>{evidencia}</li>
          ))}
        </ul>
      </div>
      {section.id === "d3" ? (
        <p className="mt-4 text-sm text-gray-600 print:hidden">
          Evidencia complementaria: <Link href="/reporte-accesibilidad" className="font-semibold text-brand-700 underline">ver Reporte de Evaluación de Accesibilidad</Link>.
        </p>
      ) : null}
      {section.tabla ? <ReportTable table={section.tabla} /> : null}
    </section>
  );
}

export default function InformePage() {
  return (
    <div className="bg-gray-100 px-4 pb-16 pt-32 print:bg-white print:px-0 print:pt-0">
      <article className="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-10 shadow-sm ring-1 ring-gray-200 print:max-w-none print:rounded-none print:px-0 print:py-0 print:shadow-none print:ring-0 md:px-12">
        <header className="mb-12 border-b border-gray-200 pb-10 text-center print:min-h-[9in] print:break-after-page print:border-b-0 print:pb-0">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
            {informePortada.entregable}
          </p>
          <h1 className="mb-5 text-5xl font-bold text-gray-950 print:text-4xl">
            {informePortada.titulo}
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-8 text-gray-600">
            {informePortada.subtitulo}
          </p>
          <div className="mx-auto max-w-2xl space-y-2 text-sm text-gray-700">
            <p>{informePortada.curso}</p>
            <p>{informePortada.programa}</p>
            <p className="font-semibold">{informePortada.universidad}</p>
          </div>
        </header>

        <section className="mb-10 print:break-after-page" aria-labelledby="resumen-ejecutivo">
          <h2 id="resumen-ejecutivo" className="mb-4 text-3xl font-bold text-gray-950">Resumen Ejecutivo</h2>
          <div className="space-y-4 text-base leading-8 text-gray-800">
            {resumenEjecutivo.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>
        </section>

        <nav className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-6 print:break-after-page print:bg-white" aria-labelledby="indice-informe">
          <h2 id="indice-informe" className="mb-4 text-2xl font-bold text-gray-950">Índice del Informe</h2>
          <ol className="grid gap-3 text-sm md:grid-cols-2 print:grid-cols-1">
            {indiceInforme.map((item, index) => (
              <li key={item.href}>
                <a href={item.href} className="text-brand-700 underline underline-offset-4 print:text-gray-900 print:no-underline">
                  {index + 1}. {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {seccionesInforme.map((section) => (
          <DimensionSection key={section.id} section={section} />
        ))}

        <section id="conclusiones" className="border-t border-gray-200 py-10 print:break-before-page" aria-labelledby="conclusiones-titulo">
          <h2 id="conclusiones-titulo" className="mb-5 text-3xl font-bold text-gray-950">Conclusiones</h2>
          <div className="space-y-4 text-base leading-8 text-gray-800">
            {conclusionesInforme.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>
        </section>

        <section id="referencias" className="border-t border-gray-200 py-10 print:break-before-page" aria-labelledby="referencias-titulo">
          <h2 id="referencias-titulo" className="mb-2 text-3xl font-bold text-gray-950">Referencias</h2>
          <p className="mb-6 text-sm text-gray-600">
            {referenciasInforme.length} referencias en APA 7; {conteoReferenciasRegionales} hondureñas, centroamericanas o regionales.
          </p>
          <ol className="space-y-4 text-sm leading-7 text-gray-800">
            {referenciasInforme.map((referencia) => (
              <li key={referencia.id} className="pl-8 -indent-8">
                {referencia.textoApa}
              </li>
            ))}
          </ol>
        </section>
      </article>
    </div>
  );
}
