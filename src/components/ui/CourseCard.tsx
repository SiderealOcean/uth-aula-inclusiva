interface CourseCardProps {
  titulo: string;
  organizacion: string;
  modulos: number;
  formatos: string[];
  duracion: string;
  progreso?: number; // 0-100, undefined si no está inscrito
  completado?: number; // módulos completados
}

export default function CourseCard({
  titulo,
  organizacion,
  modulos,
  formatos,
  duracion,
  progreso,
  completado,
}: CourseCardProps) {
  const tieneProgreso = progreso !== undefined;
  const progresoClamp = Math.min(100, Math.max(0, progreso ?? 0));
  const modsCompletos = completado ?? 0;

  return (
    <article
      className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
      aria-label={`Curso: ${titulo}`}
    >
      <h3 className="text-lg font-bold text-brand-700 mb-1">{titulo}</h3>
      <p className="text-sm text-gray-500 mb-3">Por {organizacion}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {formatos.map((f) => (
          <span
            key={f}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
          >
            {f}
          </span>
        ))}
      </div>

      {tieneProgreso ? (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>{modsCompletos}/{modulos} módulos</span>
            <span className="font-bold">{progresoClamp}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar" aria-label="Progreso del curso" aria-valuenow={progresoClamp} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progresoClamp}%`,
                backgroundColor: progresoClamp === 100 ? "#16a34a" : "#2563eb",
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>{modulos} módulos</span>
          <span>{duracion}</span>
        </div>
      )}
    </article>
  );
}