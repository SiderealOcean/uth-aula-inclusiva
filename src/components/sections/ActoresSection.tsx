import { actores } from "@/data/actores";
import ActorCard from "@/components/ui/ActorCard";

export default function ActoresSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-white"
      aria-labelledby="actores-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 03 · Dimensiones de Inclusión
        </span>
        <h2 id="actores-titulo" className="text-pres-title text-gray-900 mb-8">
          Participación Social y Actores Comunitarios
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {actores.map((a) => (
            <ActorCard key={a.nombre} {...a} />
          ))}
        </div>

        <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 max-w-3xl">
          <h3 className="text-pres-subtitle text-brand-900 mb-3">
            Modelo de sostenibilidad
          </h3>
          <ul className="space-y-2 text-pres-body text-brand-800">
            <li>🏛️ Cuota voluntaria al registrar organización</li>
            <li>💰 ONGs con presupuesto educativo donan para cubrir estudiantes sin recursos</li>
            <li>🌐 Plataforma de código abierto mantenida por la comunidad</li>
            <li>👥 Voluntarios educadores contribuyen con creación y validación de contenido</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
