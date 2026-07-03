interface ActorCardProps {
  nombre: string;
  rol: string;
  responsabilidades: string[];
  icono: string;
}

export default function ActorCard({
  nombre,
  rol,
  responsabilidades,
  icono,
}: ActorCardProps) {
  return (
    <article
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      aria-label={`Actor: ${nombre}`}
    >
      <div className="text-4xl mb-3" aria-hidden="true">
        {icono}
      </div>
      <h3 className="text-pres-subtitle text-brand-700 mb-1">{nombre}</h3>
      <p className="text-sm text-gray-600 mb-3 font-medium">{rol}</p>
      <ul className="space-y-1">
        {responsabilidades.map((r, i) => (
          <li key={i} className="text-pres-body text-gray-700 flex gap-2">
            <span className="text-brand-500" aria-hidden="true">•</span>
            {r}
          </li>
        ))}
      </ul>
    </article>
  );
}
