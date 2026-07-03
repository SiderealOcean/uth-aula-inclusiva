"use client";

const fases = [
  { numero: "01", nombre: "Contexto", id: "fase-01" },
  { numero: "02", nombre: "Solución", id: "fase-02" },
  { numero: "03", nombre: "Inclusión", id: "fase-03" },
  { numero: "04", nombre: "Viabilidad", id: "fase-04" },
  { numero: "05", nombre: "Cierre", id: "fase-05" },
];

export default function PhaseIndicator() {
  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      aria-label="Navegación entre fases de la presentación"
    >
      <ul className="space-y-3">
        {fases.map((f) => (
          <li key={f.id}>
            <a
              href={`#${f.id}`}
              className="flex items-center gap-3 group"
              aria-label={`Ir a Fase ${f.numero}: ${f.nombre}`}
            >
              <span className="text-xs text-gray-400 group-hover:text-brand-500 transition-colors text-right w-24">
                Fase {f.numero}
              </span>
              <span className="w-3 h-3 rounded-full border-2 border-gray-300 group-hover:border-brand-500 group-hover:bg-brand-500 transition-colors" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
