export default function HeroSection() {
  return (
    <section
      id="fase-01"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b from-brand-900 to-brand-700 text-white"
      aria-labelledby="hero-titulo"
    >
      <span className="text-sm uppercase tracking-widest mb-4 text-brand-200">
        Proyecto Final Integrador · UTH · Maestría en Ingeniería de la Computación
      </span>
      <h1 id="hero-titulo" className="text-5xl md:text-6xl font-extrabold mb-6">
        Aula Inclusiva HN
      </h1>
      <p className="text-xl md:text-2xl max-w-2xl mb-8 text-brand-100">
        Plataforma de educación digital inclusiva con delivery adaptativo
        vía <strong>WhatsApp + Web</strong>, potenciada por IA para eliminar
        barreras de conectividad y discapacidad en Honduras.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          🇭🇳 Honduras
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          📱 WhatsApp + Web
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          ♿ WCAG 2.2
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          🤖 IA Generativa
        </span>
      </div>
    </section>
  );
}
