import { ResultadoWCAG } from "@/data/reporte-accesibilidad";

interface WcagReportTableProps {
  resultados: ResultadoWCAG[];
}

function nivelBadge(nivel: "A" | "AA" | "AAA") {
  const colors: Record<string, string> = {
    A: "bg-blue-100 text-blue-800",
    AA: "bg-green-100 text-green-800",
    AAA: "bg-purple-100 text-purple-800",
  };
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${colors[nivel]}`}>
      {nivel}
    </span>
  );
}

function resultadoBadge(resultado: "Pasa" | "No pasa" | "Incompleto") {
  const styles: Record<string, string> = {
    Pasa: "bg-emerald-100 text-emerald-800",
    "No pasa": "bg-red-100 text-red-800",
    Incompleto: "bg-amber-100 text-amber-800",
  };
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${styles[resultado]}`}>
      {resultado}
    </span>
  );
}

export default function WcagReportTable({ resultados }: WcagReportTableProps) {
  return (
    <div className="overflow-x-auto" role="region" aria-label="Resultados de auditoría WCAG 2.2" tabIndex={0}>
      <table className="w-full text-left border-collapse">
        <caption className="sr-only">Resultados de evaluación WCAG 2.2 por criterio y plataforma</caption>
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Criterio</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Nombre</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Nivel</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Plataforma</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Resultado</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Elemento evaluado</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Acción tomada</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((r) => (
            <tr key={`${r.codigo}-${r.plataforma}`} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm font-mono">{r.codigo}</td>
              <td className="py-3 px-4 text-sm">{r.nombre}</td>
              <td className="py-3 px-4">{nivelBadge(r.nivel)}</td>
              <td className="py-3 px-4 text-sm">{r.plataforma}</td>
              <td className="py-3 px-4">{resultadoBadge(r.resultado)}</td>
              <td className="py-3 px-4 text-sm max-w-xs">{r.elementoEvaluado}</td>
              <td className="py-3 px-4 text-sm max-w-xs">{r.accionTomada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
