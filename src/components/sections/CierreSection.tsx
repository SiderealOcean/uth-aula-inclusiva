export default function CierreSection() {
  return (
    <section
      id="fase-05"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b from-brand-700 to-brand-900 text-white"
      aria-labelledby="cierre-titulo"
    >
      <span className="text-sm uppercase tracking-widest text-brand-200 mb-4">
        Fase 05 · Cierre y Síntesis
      </span>
      <h2 id="cierre-titulo" className="text-pres-title mb-6">
        Aula Inclusiva HN
      </h2>
      <p className="text-xl max-w-2xl mb-8 text-brand-100">
        Una plataforma que elimina barreras de conectividad y discapacidad
        en la educación digital hondureña, usando WhatsApp + Web con
        adaptación automática de contenido potenciada por IA.
      </p>
      <div className="grid md:grid-cols-4 gap-6 max-w-4xl w-full text-left">
        {[
          { q: "¿Qué problema resuelve?", a: "Brecha de acceso a educación digital por conectividad y discapacidad" },
          { q: "¿Cómo lo resuelve?", a: "Delivery adaptativo multi-formato por WhatsApp + Web con IA" },
          { q: "¿Para quién?", a: "Cualquier persona en Honduras que quiera capacitarse, sin importar su condición" },
          { q: "¿Bajo qué marco?", a: "Decreto 282-2013 + Ley 149-2013 + Propuesta regulatoria propia" },
        ].map((item) => (
          <div key={item.q} className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-sm font-bold text-brand-200 mb-1">{item.q}</p>
            <p className="text-sm text-white">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
