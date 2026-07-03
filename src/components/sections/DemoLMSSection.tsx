import LMSDashboard from "@/components/ui/LMSDashboard";

export default function DemoLMSSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-blue-50"
      aria-labelledby="lms-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-700 mb-2 block">
          Fase 02 · Demostración
        </span>
        <h2 id="lms-titulo" className="text-pres-title text-gray-900 mb-4">
          Plataforma Web (LMS)
        </h2>
        <p className="text-pres-body text-gray-700 mb-8 max-w-3xl">
          Dashboard donde los estudiantes exploran cursos, siguen su progreso
          y descargan certificados. Las organizaciones crean y gestionan contenido
          desde el panel de administración.
        </p>
        <LMSDashboard />
      </div>
    </section>
  );
}
