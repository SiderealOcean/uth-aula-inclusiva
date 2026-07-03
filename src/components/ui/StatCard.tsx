interface StatCardProps {
  titulo: string;
  dato: string;
  fuente: string;
}

export default function StatCard({ titulo, dato, fuente }: StatCardProps) {
  return (
    <article
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      aria-label={`${titulo}: ${dato}`}
    >
      <h3 className="text-pres-subtitle text-brand-700 mb-2">{titulo}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-1">{dato}</p>
      <p className="text-sm text-gray-500">Fuente: {fuente}</p>
    </article>
  );
}
