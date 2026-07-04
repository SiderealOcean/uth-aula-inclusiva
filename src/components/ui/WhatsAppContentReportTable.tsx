import { EvaluacionContenidoWhatsApp } from "@/data/reporte-accesibilidad";

interface WhatsAppContentReportTableProps {
  evaluaciones: EvaluacionContenidoWhatsApp[];
}

function estadoBadge(estado: EvaluacionContenidoWhatsApp["estado"]) {
  const styles: Record<EvaluacionContenidoWhatsApp["estado"], string> = {
    Optimo: "bg-emerald-100 text-emerald-800",
    Cumple: "bg-blue-100 text-blue-800",
  };

  return <span className={`text-xs font-bold px-2 py-1 rounded ${styles[estado]}`}>{estado}</span>;
}

export default function WhatsAppContentReportTable({ evaluaciones }: WhatsAppContentReportTableProps) {
  return (
    <div className="overflow-x-auto" role="region" aria-label="Evaluacion de contenido accesible para WhatsApp" tabIndex={0}>
      <table className="w-full text-left border-collapse">
        <caption className="sr-only">Evaluacion de accesibilidad del contenido entregado por WhatsApp</caption>
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Formato</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Estado</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Criterio evaluado</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Evidencia</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Observacion metodologica</th>
          </tr>
        </thead>
        <tbody>
          {evaluaciones.map((item) => (
            <tr key={item.formato} className="border-b border-gray-200 hover:bg-gray-50 align-top">
              <td className="py-3 px-4 text-sm font-semibold">{item.formato}</td>
              <td className="py-3 px-4">{estadoBadge(item.estado)}</td>
              <td className="py-3 px-4 text-sm max-w-xs">{item.criterio}</td>
              <td className="py-3 px-4 text-sm max-w-xs">{item.evidencia}</td>
              <td className="py-3 px-4 text-sm max-w-xs text-gray-600">{item.observacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
