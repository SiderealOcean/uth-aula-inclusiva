export interface Actor {
  nombre: string;
  categoria: string;
  rol: string;
  responsabilidades: string[];
  icono: string;
}

export const actores: Actor[] = [
  {
    nombre: "Organización (ONG/Gobierno/Empresa)",
    categoria: "Creador de contenido",
    rol: "Crea cursos, dona recursos, define políticas de accesibilidad",
    responsabilidades: [
      "Subir machote de contenido educativo",
      "Validar calidad del contenido generado por IA",
      "Donar recursos para sostenibilidad",
      "Asegurar cumplimiento de políticas de accesibilidad",
    ],
    icono: "🏛️",
  },
  {
    nombre: "Educador / Instructor",
    categoria: "Diseñador pedagógico",
    rol: "Diseña microcontenido, define adaptaciones y evaluaciones",
    responsabilidades: [
      "Estructurar el machote del curso",
      "Definir objetivos de aprendizaje",
      "Revisar evaluaciones generadas por IA",
      "Recomendar formatos de entrega",
    ],
    icono: "👩‍🏫",
  },
  {
    nombre: "Estudiante",
    categoria: "Usuario final",
    rol: "Consume cursos, elige formato, recibe certificado digital",
    responsabilidades: [
      "Configurar perfil de accesibilidad",
      "Consumir contenido en el formato preferido",
      "Completar evaluaciones",
      "Descargar certificado al finalizar",
    ],
    icono: "🎓",
  },
  {
    nombre: "Administrador de plataforma",
    categoria: "Gestor técnico",
    rol: "Aprueba cursos, modera contenido, garantiza WCAG",
    responsabilidades: [
      "Revisar cursos antes de publicación",
      "Verificar cumplimiento WCAG 2.2",
      "Gestionar donaciones y recursos",
      "Mantener infraestructura técnica",
    ],
    icono: "⚙️",
  },
  {
    nombre: "Donante / Patrocinador",
    categoria: "Financiador",
    rol: "Aporta recursos económicos o infraestructura",
    responsabilidades: [
      "Financiar hosting y API WhatsApp",
      "Patrocinar becas de conectividad",
      "Donar equipos para zonas rurales",
    ],
    icono: "🤝",
  },
];
