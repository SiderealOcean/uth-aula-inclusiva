const canvasItems = [
  {
    title: "Problema",
    eyebrow: "Brecha educativa digital",
    content:
      "Estudiantes rurales, personas con discapacidad y usuarios con baja alfabetizacion digital quedan fuera de plataformas educativas tradicionales.",
    accent: "border-red-300 bg-red-50",
  },
  {
    title: "Segmentos",
    eyebrow: "Usuarios prioritarios",
    content:
      "Zonas 2G/3G, personas con discapacidad visual o auditiva, daltonismo, trabajadores con horarios flexibles y organizaciones educativas.",
    accent: "border-amber-300 bg-amber-50",
  },
  {
    title: "Propuesta de valor",
    eyebrow: "Educacion que se adapta",
    content:
      "Un LMS inclusivo que entrega cada leccion en el formato correcto: texto, audio, imagen liviana o video subtitulado via Web + WhatsApp.",
    accent: "border-brand-200 bg-brand-50",
    featured: true,
  },
  {
    title: "Solucion",
    eyebrow: "LMS + WhatsApp + IA",
    content:
      "Cursos administrables, perfiles de accesibilidad, entrega adaptativa, certificados y generacion asistida de contenido accesible.",
    accent: "border-emerald-300 bg-emerald-50",
  },
  {
    title: "Canales",
    eyebrow: "Alcance real",
    content:
      "Web para gestion academica y WhatsApp para microlecciones, recordatorios, evaluaciones cortas y continuidad en baja conectividad.",
    accent: "border-cyan-300 bg-cyan-50",
  },
  {
    title: "Sostenibilidad",
    eyebrow: "Modelo de apoyo",
    content:
      "Pilotos con ONGs, academia, cooperacion, donantes y organizaciones que necesitan capacitar comunidades con bajo costo operativo.",
    accent: "border-indigo-300 bg-indigo-50",
  },
  {
    title: "Costos",
    eyebrow: "MVP viable",
    content:
      "Vercel, Railway, Cloudinary y WhatsApp Cloud API permiten validar un piloto inicial usando tiers gratuitos o de bajo costo.",
    accent: "border-slate-300 bg-slate-50",
  },
  {
    title: "Metricas clave",
    eyebrow: "Impacto medible",
    content:
      "Inscripciones, finalizacion de lecciones, certificados emitidos, formatos usados por perfil y reduccion de abandono por accesibilidad.",
    accent: "border-purple-300 bg-purple-50",
  },
  {
    title: "Ventaja diferencial",
    eyebrow: "Contexto Honduras",
    content:
      "No parte de un LMS generico: disena para conectividad limitada, accesibilidad WCAG, gobernanza hondurena y acompanamiento comunitario.",
    accent: "border-orange-300 bg-orange-50",
  },
];

export default function LeanCanvasSection() {
  return (
    <section
      className="px-6 py-20 bg-gradient-to-b from-white via-brand-50 to-gray-50"
      aria-labelledby="lean-canvas-titulo"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="text-sm uppercase tracking-widest text-brand-600 mb-2 block">
            Vista preliminar del proyecto
          </span>
          <h2 id="lean-canvas-titulo" className="text-pres-title text-gray-900 mb-4">
            Lean Canvas de Aula Inclusiva HN
          </h2>
          <p className="text-pres-body text-gray-700">
            Una lectura rapida del proposito, usuarios, propuesta de valor y
            viabilidad del prototipo antes de entrar al diagnostico completo.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3" role="list">
          {canvasItems.map((item) => (
            <article
              key={item.title}
              role="listitem"
              className={`rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${item.accent} ${
                item.featured ? "md:row-span-2 md:flex md:flex-col md:justify-center" : ""
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                {item.eyebrow}
              </p>
              <h3
                className={`font-extrabold text-gray-950 mb-3 ${
                  item.featured ? "text-3xl" : "text-xl"
                }`}
              >
                {item.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-gray-700">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
