import { CriterioWCAG } from "@/data/wcag";

interface WcagTableProps {
  criterios: CriterioWCAG[];
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

export default function WcagTable({ criterios }: WcagTableProps) {
  return (
    <div className="overflow-x-auto" role="region" aria-label="Criterios WCAG 2.2 evaluados" tabIndex={0}>
      <table className="w-full text-left border-collapse">
        <caption className="text-pres-subtitle mb-4 text-left">
          Criterios WCAG 2.2 Auditados
        </caption>
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Código</th>
            <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Nombre</th>
            <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Nivel</th>
            <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Aplicación</th>
          </tr>
        </thead>
        <tbody>
          {criterios.map((c) => (
            <tr key={c.codigo} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-pres-body font-mono">{c.codigo}</td>
              <td className="py-3 px-4 text-pres-body">{c.nombre}</td>
              <td className="py-3 px-4">{nivelBadge(c.nivel)}</td>
              <td className="py-3 px-4 text-pres-body">{c.aplicacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
