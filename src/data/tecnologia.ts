export interface ComponenteStack {
  capa: string;
  tecnologia: string;
  justificacion: string;
}

export const stackTecnologico: ComponenteStack[] = [
  {
    capa: "Framework",
    tecnologia: "Next.js 14",
    justificacion: "React + SSR, rápido, desplegable gratis en Vercel",
  },
  {
    capa: "Estilos",
    tecnologia: "Tailwind CSS",
    justificacion: "Utilidades atómicas, fácil mantener consistencia visual",
  },
  {
    capa: "Bot WhatsApp",
    tecnologia: "WhatsApp Cloud API (Meta)",
    justificacion: "Estándar real, funciona en 2G, penetración casi universal en HN",
  },
  {
    capa: "IA Generación",
    tecnologia: "OpenAI API / Claude API",
    justificacion: "Genera TTS, transcripciones, resúmenes automáticos desde machote",
  },
  {
    capa: "Almacenamiento",
    tecnologia: "Cloudinary",
    justificacion: "Compresión automática de imágenes y video, tier gratuito generoso",
  },
  {
    capa: "Hosting",
    tecnologia: "Vercel + Railway",
    justificacion: "Vercel para frontend (gratis), Railway para backend (gratis hasta $5/mes)",
  },
];

export interface EnfoqueEvaluado {
  nombre: string;
  descripcion: string;
  pros: string[];
  contras: string[];
  seleccionado: boolean;
}

export const enfoques: EnfoqueEvaluado[] = [
  {
    nombre: "WhatsApp-first (web complementario)",
    descripcion: "WhatsApp como canal principal, web solo para registro.",
    pros: ["Máximo alcance (funciona en 2G)", "Mínima fricción de adopción"],
    contras: [
      "Sin dashboard visual ni control de progreso",
      "Multimedia limitado en WhatsApp",
    ],
    seleccionado: false,
  },
  {
    nombre: "LMS Web + Bot WhatsApp (SELECCIONADO)",
    descripcion: "Plataforma web completa para gestión + WhatsApp como canal de delivery.",
    pros: [
      "Experiencia completa en ambos canales",
      "Cubre todos los casos de uso (discapacidad + conectividad)",
      "Certificados digitales con validez",
    ],
    contras: ["Mayor complejidad técnica"],
    seleccionado: true,
  },
  {
    nombre: "PWA + WhatsApp notificación",
    descripcion: "PWA instalable offline + WhatsApp solo para notificaciones.",
    pros: ["Offline-first real", "Experiencias multimedia ricas"],
    contras: ["Requiere instalación de PWA", "Menor alcance inicial"],
    seleccionado: false,
  },
];

export interface FlujoUsuario {
  titulo: string;
  pasos: string[];
}

export const flujosUsuario: FlujoUsuario[] = [
  {
    titulo: "Registro y Suscripción",
    pasos: [
      "Usuario descubre la plataforma (web, WhatsApp o referencia de ONG)",
      "Completa perfil en web con accesibilidad guiada: conectividad, discapacidad, idioma",
      "También puede iniciar en WhatsApp: bot pide nombre e idioma y envía enlace al perfil web",
      "Explora catálogo de cursos filtrable por categoría y formato",
      "Se suscribe a uno o más cursos",
    ],
  },
  {
    titulo: "Recepción de Lección Adaptada por WhatsApp",
    pasos: [
      "Sistema envía lección automáticamente según horario preferido",
      "Formato adaptado al perfil del usuario (texto, imagen, audio o video)",
      "Usuario consume contenido y responde evaluación corta",
      "Progreso registrado automáticamente en el LMS",
    ],
  },
  {
    titulo: "Creación de Curso con IA (ONGs)",
    pasos: [
      "Organización se registra y completa perfil",
      "Sube 'machote' del curso (PDF/DOCX/texto + recursos multimedia)",
      "IA genera: audio TTS, resumen para bajo ancho de banda, paleta daltónico-safe, evaluaciones",
      "Organización revisa preview, valida calidad y publica",
      "Curso disponible en catálogo",
    ],
  },
];

export const archivoReglasAdaptacion = `
Cobertura baja + sin discapacidad  → texto + imagen comprimida
Cobertura baja + ciego             → solo audio
Cobertura buena + ciego            → audio + texto
Cobertura buena + daltonismo       → texto + imagen (paleta segura)
Cobertura buena + sordo            → texto + video subtitulado
Cobertura buena + sin discapacidad → texto + imagen + audio + video
`;

export const costosEstimados = [
  { item: "Vercel (hosting frontend)", costo: "$0/mes", nota: "Tier gratuito" },
  { item: "Railway (backend)", costo: "$0/mes", nota: "Tier gratuito hasta $5" },
  { item: "Cloudinary (media)", costo: "$0/mes", nota: "25 GB almacenamiento gratis" },
  { item: "WhatsApp Cloud API", costo: "$0/mes", nota: "1000 conversaciones gratis/mes" },
  { item: "Total estimado (MVP)", costo: "$0/mes", nota: "En tiers gratuitos" },
];
