import { ResultadoAxeLMS } from "@/data/reporte-accesibilidad";

interface WcagReportTableProps {
  resultados: ResultadoAxeLMS[];
}

function estadoBadge(estado: ResultadoAxeLMS["estado"]) {
  const styles: Record<ResultadoAxeLMS["estado"], string> = {
    Pasa: "bg-emerald-100 text-emerald-800",
    "No pasa": "bg-red-100 text-red-800",
    Incompleto: "bg-amber-100 text-amber-800",
  };

  return (
    <span className={`text-xs font-bold px-2 py-1 rounded whitespace-nowrap ${styles[estado]}`}>
      {estado}
    </span>
  );
}

function impactoBadge(impacto: string) {
  const styles: Record<string, string> = {
    critical: "bg-red-100 text-red-800",
    serious: "bg-orange-100 text-orange-800",
    moderate: "bg-amber-100 text-amber-800",
    minor: "bg-blue-100 text-blue-800",
    "No aplica": "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${styles[impacto] ?? styles["No aplica"]}`}>
      {impacto}
    </span>
  );
}

function tagsResumen(tags: string[]) {
  const wcagTags = tags.filter((tag) => tag.startsWith("wcag") || tag === "best-practice");
  return wcagTags.length > 0 ? wcagTags.join(", ") : "Sin tag WCAG directo";
}

export default function WcagReportTable({ resultados }: WcagReportTableProps) {
  return (
    <div className="overflow-x-auto" role="region" aria-label="Resultados tecnicos axe del LMS" tabIndex={0}>
      <table className="w-full text-left border-collapse">
        <caption className="sr-only">Reglas axe evaluadas en la Plataforma Web LMS</caption>
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Plataforma</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Estado</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Regla axe</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Descripcion</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Impacto</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Nodos</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Tags</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Accion o recomendacion</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((r) => (
            <tr key={`${r.estado}-${r.regla}`} className="border-b border-gray-200 hover:bg-gray-50 align-top">
              <td className="py-3 px-4 text-sm font-semibold">{r.plataforma}</td>
              <td className="py-3 px-4">{estadoBadge(r.estado)}</td>
              <td className="py-3 px-4 text-sm font-mono">{r.regla}</td>
              <td className="py-3 px-4 text-sm max-w-xs">{r.descripcion}</td>
              <td className="py-3 px-4">{impactoBadge(r.impacto)}</td>
              <td className="py-3 px-4 text-sm text-center">{r.nodosEvaluados}</td>
              <td className="py-3 px-4 text-xs max-w-xs text-gray-600">{tagsResumen(r.tags)}</td>
              <td className="py-3 px-4 text-sm max-w-xs">
                {r.accionRecomendada}
                {r.ayudaUrl ? (
                  <a href={r.ayudaUrl} className="block mt-2 text-brand-700 underline" target="_blank" rel="noreferrer">
                    Ver regla axe
                  </a>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
