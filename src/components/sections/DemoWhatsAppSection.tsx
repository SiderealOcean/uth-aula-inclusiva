import AdaptabilityDemo from "@/components/ui/AdaptabilityDemo";

export default function DemoWhatsAppSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-green-50"
      aria-labelledby="whatsapp-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-green-700 mb-2 block">
          Fase 02 · Demostración
        </span>
        <h2 id="whatsapp-titulo" className="text-pres-title text-gray-900 mb-8">
          Delivery adaptativo por WhatsApp
        </h2>
        <p className="text-pres-body text-gray-700 mb-8 max-w-3xl">
          El sistema detecta el perfil del usuario (conectividad + discapacidad)
          y entrega automáticamente la lección en el formato óptimo. Selecciona
          un perfil para ver cómo cambia la experiencia.
        </p>
        <AdaptabilityDemo />
      </div>
    </section>
  );
}
