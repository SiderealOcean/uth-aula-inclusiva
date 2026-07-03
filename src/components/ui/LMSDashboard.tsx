import CourseCard from "./CourseCard";

const cursosDemo = [
  {
    titulo: "Introducción a la Computación",
    organizacion: "Fundación Educativa HN",
    modulos: 8,
    formatos: ["📝 Texto", "🖼️ Imagen", "🎙️ Audio", "🎬 Video"],
    duracion: "4 semanas",
  },
  {
    titulo: "Alfabetización Digital Básica",
    organizacion: "CONATEL",
    modulos: 5,
    formatos: ["📝 Texto", "🎙️ Audio"],
    duracion: "2 semanas",
  },
  {
    titulo: "Emprendimiento Rural",
    organizacion: "ONG Impulso HN",
    modulos: 10,
    formatos: ["📝 Texto", "🖼️ Imagen", "🎙️ Audio"],
    duracion: "6 semanas",
  },
];

export default function LMSDashboard() {
  return (
    <div
      className="border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white"
      role="region"
      aria-label="Dashboard del LMS - Simulación"
    >
      <div className="bg-brand-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-bold text-lg">Aula Inclusiva HN</p>
          <p className="text-sm opacity-80">Panel de Estudiante</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            🎓 María López
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
            <p className="text-sm text-brand-700 font-medium">Cursos activos</p>
            <p className="text-3xl font-bold text-brand-900">2</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700 font-medium">Certificados obtenidos</p>
            <p className="text-3xl font-bold text-green-800">1</p>
          </div>
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Mis cursos</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {cursosDemo.slice(0, 2).map((c) => (
            <CourseCard key={c.titulo} {...c} />
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Cursos disponibles</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {cursosDemo.map((c) => (
            <CourseCard key={c.titulo} {...c} />
          ))}
        </div>
      </div>

      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500 text-center">
        Simulación · Dashboard LMS · Los datos son ilustrativos
      </div>
    </div>
  );
}
