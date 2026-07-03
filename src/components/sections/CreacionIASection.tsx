const pasosIA = [
  {
    paso: "1",
    titulo: "ONG sube el machote",
    descripcion:
      "La organización carga un documento (PDF, DOCX o texto plano) con el contenido base + recursos multimedia (imágenes, videos).",
    icono: "📤",
  },
  {
    paso: "2",
    titulo: "IA procesa y genera",
    descripcion:
      "El sistema extrae conceptos clave y genera automáticamente: audio narrado (TTS), resumen para bajo ancho de banda, paleta daltónico-safe, preguntas de evaluación y metadatos de accesibilidad.",
    icono: "🤖",
  },
  {
    paso: "3",
    titulo: "ONG revisa y valida",
    descripcion:
      "La organización recibe una preview completa del curso generado. Revisa calidad del contenido, corrige si es necesario y aprueba la publicación.",
    icono: "✅",
  },
  {
    paso: "4",
    titulo: "Curso disponible",
    descripcion:
      "El curso se publica en el catálogo. Los estudiantes pueden suscribirse y recibirlo automáticamente en el formato que necesitan.",
    icono: "🚀",
  },
];

export default function CreacionIASection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-amber-50"
      aria-labelledby="creacion-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-amber-700 mb-2 block">
          Fase 02 · Demostración
        </span>
        <h2 id="creacion-titulo" className="text-pres-title text-gray-900 mb-4">
          Creación de cursos asistida por IA
        </h2>
        <p className="text-pres-body text-gray-700 mb-8 max-w-3xl">
          Las organizaciones no necesitan producir 4 formatos manualmente.
          Suben un &quot;machote&quot; con el contenido base y la IA genera todo
          automáticamente: audio, imágenes accesibles, evaluaciones. Luego
          solo validan calidad y publican.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {pasosIA.map((p) => (
            <div
              key={p.paso}
              className="bg-white border border-gray-200 rounded-lg p-5 text-center"
            >
              <div className="text-4xl mb-3" aria-hidden="true">
                {p.icono}
              </div>
              <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                {p.paso}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{p.titulo}</h3>
              <p className="text-sm text-gray-600">{p.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-3xl">
          <h3 className="text-pres-subtitle text-gray-900 mb-4">
            Lo que la IA genera desde un machote
          </h3>
          <ul className="space-y-2 text-pres-body text-gray-700">
            <li>🎙️ <strong>Audio:</strong> Transcripción a voz (TTS) de todo el contenido textual</li>
            <li>📝 <strong>Resumen ligero:</strong> Versión comprimida para bajo ancho de banda</li>
            <li>🎨 <strong>Paleta segura:</strong> Imágenes con colores distinguibles para daltonismo</li>
            <li>❓ <strong>Evaluaciones:</strong> Preguntas de opción múltiple generadas del contenido</li>
            <li>🏷️ <strong>Metadatos A11y:</strong> Alt text, descripciones, transcripciones</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
