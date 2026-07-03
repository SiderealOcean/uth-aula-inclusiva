interface CourseCardProps {
  titulo: string;
  organizacion: string;
  modulos: number;
  formatos: string[];
  duracion: string;
}

export default function CourseCard({
  titulo,
  organizacion,
  modulos,
  formatos,
  duracion,
}: CourseCardProps) {
  return (
    <article
      className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
      aria-label={`Curso: ${titulo}`}
    >
      <h3 className="text-pres-subtitle text-brand-700 mb-1">{titulo}</h3>
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
      <div className="flex justify-between text-sm text-gray-600">
        <span>{modulos} módulos</span>
        <span>{duracion}</span>
      </div>
    </article>
  );
}
