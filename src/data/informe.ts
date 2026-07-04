export interface InformePortada {
  titulo: string;
  subtitulo: string;
  entregable: string;
  curso: string;
  programa: string;
  universidad: string;
}

export interface InformeTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface InformeSection {
  id: string;
  codigo: "D1" | "D2" | "D3" | "D4" | "D5" | "D6";
  titulo: string;
  puntaje: string;
  resumen: string;
  parrafos: string[];
  evidencias: string[];
  tabla?: InformeTable;
}

export interface ReferenciaInforme {
  id: string;
  textoApa: string;
  tipo: "honduras" | "regional" | "internacional" | "tecnica";
}

export const informePortada: InformePortada = {
  titulo: "Aula Inclusiva HN",
  subtitulo: "Plataforma de educación digital adaptativa para inclusión en Honduras",
  entregable: "E1 - Informe Escrito de Proyecto",
  curso: "Inclusión y Accesibilidad Digital",
  programa: "Maestría en Ingeniería de la Computación",
  universidad: "Universidad Tecnológica de Honduras",
};

export const resumenEjecutivo = [
  "Aula Inclusiva HN es una propuesta tecno-social orientada a reducir la brecha de acceso a educación digital en Honduras mediante una plataforma LMS web complementada por entrega adaptativa de contenido a través de WhatsApp. La propuesta responde a barreras concretas del contexto hondureño: conectividad limitada, infraestructura eléctrica intermitente, analfabetismo digital y falta de lineamientos técnicos actualizados para accesibilidad digital.",
  "La solución combina un entorno web para gestión de cursos, registro, seguimiento y certificación con un canal de bajo consumo de datos para distribuir contenido en formatos texto, imagen, audio o video según el perfil del estudiante. Este diseño permite atender a personas en zonas rurales, estudiantes con discapacidad visual o auditiva, personas con daltonismo y usuarios con horarios laborales flexibles.",
  "El proyecto cubre las seis dimensiones del Proyecto Final Integrador: diagnóstico situado, solución tecnológica viable, accesibilidad WCAG 2.2, gobernanza hondureña, participación comunitaria y defensa oral. El enfoque se alinea con el Decreto 282-2013, la Ley de Firma Electrónica de Honduras, los principios POUR de accesibilidad y la necesidad regional de ampliar oportunidades educativas digitales.",
];

export const indiceInforme = [
  { href: "#d1", label: "D1 - Definición del Problema y Contexto Hondureño" },
  { href: "#d2", label: "D2 - Solución Tecnológica y Viabilidad" },
  { href: "#d3", label: "D3 - Accesibilidad y Diseño Universal" },
  { href: "#d4", label: "D4 - Gobernanza y Marco Regulatorio Honduras" },
  { href: "#d5", label: "D5 - Participación Social y Actores Comunitarios" },
  { href: "#d6", label: "D6 - Presentación y Defensa Oral" },
  { href: "#conclusiones", label: "Conclusiones" },
  { href: "#referencias", label: "Referencias" },
];

export const seccionesInforme: InformeSection[] = [
  {
    id: "d1",
    codigo: "D1",
    titulo: "Definición del Problema y Contexto Hondureño",
    puntaje: "10 pts",
    resumen: "Diagnóstico situado de la brecha digital hondureña y población objetivo.",
    parrafos: [
      "La inclusión digital en Honduras enfrenta condiciones estructurales que impiden que muchas personas accedan a educación en línea en igualdad de condiciones. Según la guía del proyecto y datos citados de CONATEL, la penetración de internet ronda el 39% de la población, con una brecha urbano-rural marcada. Esta limitación afecta directamente a estudiantes que viven fuera de los principales centros urbanos, donde la conectividad 2G/3G sigue siendo predominante y la cobertura 4G se concentra en Tegucigalpa, San Pedro Sula y La Ceiba (CONATEL, 2023).",
      "El problema no se limita al acceso técnico. La infraestructura eléctrica intermitente, la baja disponibilidad de dispositivos adecuados y el analfabetismo digital estimado en más del 60% en zonas rurales reducen la posibilidad de participar en plataformas educativas convencionales. Por ello, un LMS tradicional centrado únicamente en navegación web completa resultaría insuficiente para la realidad hondureña.",
      "La población objetivo incluye estudiantes rurales con conectividad limitada, personas con discapacidad visual que requieren audio, personas sordas que necesitan texto o video subtitulado, personas con daltonismo que requieren paletas seguras y trabajadores con horarios flexibles. Este perfil exige una solución flexible que adapte el canal y el formato del contenido al contexto de cada estudiante.",
    ],
    evidencias: [
      "Penetración de internet estimada en 39% de la población.",
      "Conectividad rural mayoritariamente 2G/3G.",
      "Marco legal de accesibilidad vigente pero sin reglamento técnico digital actualizado.",
    ],
    tabla: {
      caption: "Barreras hondureñas atendidas por Aula Inclusiva HN",
      headers: ["Barrera", "Efecto educativo", "Respuesta del proyecto"],
      rows: [
        ["Baja conectividad", "Dificulta video y LMS completo", "Entrega por WhatsApp y contenido comprimido"],
        ["Discapacidad visual", "Limita lectura de interfaces visuales", "Audio y estructura compatible con tecnologías asistivas"],
        ["Discapacidad auditiva", "Limita contenido solo sonoro", "Texto y video subtitulado"],
        ["Analfabetismo digital", "Reduce adopción de plataformas complejas", "Flujos simples por WhatsApp y acompañamiento comunitario"],
      ],
    },
  },
  {
    id: "d2",
    codigo: "D2",
    titulo: "Solución Tecnológica y Viabilidad",
    puntaje: "25 pts",
    resumen: "Arquitectura LMS + WhatsApp, stack, viabilidad y costos de MVP.",
    parrafos: [
      "Aula Inclusiva HN propone una arquitectura híbrida: una plataforma web LMS para administración de cursos, catálogo, seguimiento y certificación, y un canal de entrega adaptativa por WhatsApp para estudiantes con baja conectividad o necesidades de accesibilidad específicas. Este enfoque conserva las ventajas de un sistema educativo formal sin excluir a quienes no pueden permanecer conectados a una plataforma web pesada.",
      "El prototipo usa Next.js 14 y Tailwind CSS para el frontend, WhatsApp Cloud API como canal de mensajería, Cloudinary para optimización de medios y servicios de inteligencia artificial para transformar contenido base en formatos alternativos como resumen de bajo ancho de banda, audio TTS, transcripción y evaluaciones cortas. La alternativa seleccionada fue LMS Web + Bot WhatsApp porque equilibra alcance, trazabilidad educativa y accesibilidad multimodal.",
      "La viabilidad del MVP se apoya en tiers gratuitos o de bajo costo: Vercel para hosting frontend, Railway para backend, Cloudinary para almacenamiento multimedia y WhatsApp Cloud API con conversaciones gratuitas iniciales. Esta estructura permite validar un piloto con ONGs o instituciones educativas antes de invertir en infraestructura mayor.",
    ],
    evidencias: [
      "Prototipo funcional en Next.js con simulaciones LMS y WhatsApp.",
      "Reglas de adaptación por perfil de conectividad y discapacidad.",
      "Costos MVP estimados en tiers gratuitos para validación inicial.",
    ],
    tabla: {
      caption: "Componentes tecnológicos principales",
      headers: ["Capa", "Tecnología", "Justificación"],
      rows: [
        ["Frontend", "Next.js 14", "Renderizado web rápido y despliegue accesible"],
        ["Estilos", "Tailwind CSS", "Consistencia visual y control de contraste"],
        ["Mensajería", "WhatsApp Cloud API", "Canal familiar y viable en baja conectividad"],
        ["Multimedia", "Cloudinary", "Compresión y entrega optimizada de recursos"],
        ["IA", "OpenAI API / Claude API", "Adaptación de contenido a formatos alternativos"],
      ],
    },
  },
  {
    id: "d3",
    codigo: "D3",
    titulo: "Accesibilidad y Diseño Universal",
    puntaje: "20 pts",
    resumen: "WCAG 2.2, principios POUR, auditoría axe del LMS y evaluación de contenido WhatsApp.",
    parrafos: [
      "La accesibilidad se aborda desde dos metodologías complementarias. La plataforma LMS, al ser desarrollo web propio, se evalúa con axe DevTools y criterios WCAG 2.2. En cambio, WhatsApp no se presenta como una superficie web propia auditable con axe; se evalúa la accesibilidad del contenido entregado por ese canal: texto claro, imágenes con descripción, audio, video subtitulado y adaptación por perfil.",
      "El reporte de accesibilidad del proyecto documenta 42 reglas axe para el LMS, con 39 reglas en estado pasa, 2 violaciones y 1 regla incompleta. También incluye evaluación de cinco formatos de contenido para WhatsApp: texto, imagen, audio, video y adaptación por perfil. Esta separación evita atribuir al producto final problemas técnicos del simulador usado para representar WhatsApp.",
      "Los principios POUR se aplican de forma explícita. El contenido es perceptible mediante múltiples formatos; operable por navegación clara y flujos simples; comprensible por lenguaje directo y microlecciones; y robusto mediante HTML semántico, criterios WCAG y compatibilidad con tecnologías asistivas. La iteración de mejora se documenta mediante capturas antes/después en el reporte E3.",
    ],
    evidencias: [
      "Reporte E3 disponible en /reporte-accesibilidad.",
      "Tabla completa de reglas axe LMS basada en lms-results.json.",
      "Evaluación separada del contenido adaptativo entregado por WhatsApp.",
    ],
    tabla: {
      caption: "Metodologías de evaluación de accesibilidad",
      headers: ["Componente", "Método", "Resultado esperado"],
      rows: [
        ["LMS Web", "axe DevTools + WCAG 2.2", "Identificar reglas que pasan, fallan o requieren revisión"],
        ["WhatsApp", "Evaluación de contenido", "Confirmar formatos accesibles según perfil"],
        ["Documento E1", "Estructura semántica web", "Lectura e impresión accesibles"],
      ],
    },
  },
  {
    id: "d4",
    codigo: "D4",
    titulo: "Gobernanza y Marco Regulatorio Honduras",
    puntaje: "15 pts",
    resumen: "Análisis legal hondureño, instituciones responsables y propuesta regulatoria.",
    parrafos: [
      "El proyecto se sustenta en el Decreto 282-2013, Ley de Equidad y Desarrollo Integral para Personas con Discapacidad, que obliga al Estado hondureño a promover condiciones de inclusión y accesibilidad. Aunque la norma establece principios importantes, el país aún carece de un reglamento técnico actualizado que traduzca estos deberes a criterios específicos de accesibilidad digital.",
      "La Ley de Firma Electrónica de Honduras, Decreto 149-2013, es relevante porque permite pensar en certificados digitales de finalización con validez dentro de ecosistemas educativos y laborales. Además, la Convención sobre los Derechos de las Personas con Discapacidad, ratificada por Honduras, exige acceso a tecnologías de información y comunicación en condiciones de igualdad.",
      "La propuesta regulatoria del proyecto plantea una Política de Contenido Educativo Digital Inclusivo: toda organización que reciba fondos públicos o cooperación internacional para educación debería ofrecer cursos en al menos dos formatos complementarios, como texto más audio o texto más video subtitulado. Esta medida conecta accesibilidad con financiamiento, operación y fiscalización institucional.",
    ],
    evidencias: [
      "Decreto 282-2013 como base legal de accesibilidad e inclusión.",
      "Decreto 149-2013 para certificados digitales.",
      "Instituciones responsables identificadas: CONATEL, Secretaría de Educación, academia, ONGs y gobiernos locales.",
    ],
    tabla: {
      caption: "Instituciones y roles de gobernanza",
      headers: ["Institución", "Rol", "Relación con el proyecto"],
      rows: [
        ["CONATEL", "Regulación de telecomunicaciones", "Conectividad y priorización de acceso educativo"],
        ["Secretaría de Educación", "Política educativa", "Validación de pilotos y contenidos"],
        ["UTH / academia", "Validación técnica", "Acompañamiento, investigación y evaluación"],
        ["ONGs", "Implementación territorial", "Capacitación y operación comunitaria"],
      ],
    },
  },
  {
    id: "d5",
    codigo: "D5",
    titulo: "Participación Social y Actores Comunitarios",
    puntaje: "15 pts",
    resumen: "Modelo de actores, roles funcionales y sostenibilidad comunitaria.",
    parrafos: [
      "Aula Inclusiva HN no depende únicamente de la tecnología. Su sostenibilidad requiere una red de actores comunitarios e institucionales que creen contenido, acompañen a estudiantes, validen accesibilidad y mantengan la plataforma. Esta dimensión es clave porque la adopción de tecnología en comunidades rurales requiere confianza, capacitación y presencia territorial.",
      "Los actores principales son organizaciones creadoras de contenido, educadores, estudiantes, administradores de plataforma, donantes y patrocinadores. Las ONGs y prestadores de servicio social pueden actuar como puente de confianza, facilitar capacitaciones presenciales iniciales y apoyar a personas con baja alfabetización digital.",
      "El modelo de sostenibilidad combina donaciones, participación de organizaciones con presupuesto educativo, colaboración de voluntarios y código abierto mantenido por comunidad técnica. La estrategia reconoce barreras culturales, idiomáticas y de adopción tecnológica, por lo que propone acompañamiento local y adaptación futura a idiomas indígenas como garífuna y miskito.",
    ],
    evidencias: [
      "Mínimo 5 categorías de actores ya definidas en el proyecto.",
      "Roles concretos para creación, validación, operación y financiamiento.",
      "Plan de expansión territorial y soporte de idiomas indígenas.",
    ],
    tabla: {
      caption: "Actores sociales y responsabilidades",
      headers: ["Actor", "Rol", "Responsabilidad principal"],
      rows: [
        ["ONG/Gobierno/Empresa", "Creador de contenido", "Subir machotes, validar calidad y financiar operación"],
        ["Educador", "Diseñador pedagógico", "Estructurar cursos y revisar evaluaciones"],
        ["Estudiante", "Usuario final", "Configurar perfil y consumir contenido adaptado"],
        ["Administrador", "Gestor técnico", "Aprobar cursos y verificar accesibilidad"],
        ["Donante", "Financiador", "Apoyar hosting, conectividad y equipamiento"],
      ],
    },
  },
  {
    id: "d6",
    codigo: "D6",
    titulo: "Presentación y Defensa Oral",
    puntaje: "15 pts",
    resumen: "Estructura de defensa, fases de presentación y argumentos técnicos.",
    parrafos: [
      "La defensa oral debe organizarse en 35 a 40 minutos siguiendo las cinco fases indicadas por la guía: contexto y problema, solución tecnológica, dimensiones de inclusión, viabilidad y proyección, y cierre con preguntas. La presentación debe mantener máximo 20 diapositivas, fuente mínima de 24 puntos y contraste suficiente según WCAG 1.4.3 AA.",
      "Los argumentos técnicos centrales deben justificar por qué se seleccionó una arquitectura LMS + WhatsApp, cómo se adapta el contenido por perfil, cómo se diferencia una auditoría web de una evaluación de contenido entregado por WhatsApp, y cómo la solución puede sostenerse con actores comunitarios en Honduras.",
      "La defensa debe evitar afirmaciones genéricas. Cada decisión debe conectarse con evidencia: contexto hondureño de conectividad, criterios WCAG 2.2, costos de MVP, normativa aplicable y roles comunitarios. Esta estructura permite responder preguntas del jurado desde razonamiento técnico y social.",
    ],
    evidencias: [
      "Guion alineado con las 5 fases oficiales.",
      "Tiempo objetivo de 35-40 minutos.",
      "Argumentos técnicos preparados para decisiones de arquitectura, accesibilidad y gobernanza.",
    ],
    tabla: {
      caption: "Distribución sugerida para defensa oral",
      headers: ["Fase", "Duración", "Contenido"],
      rows: [
        ["Fase 01", "5-7 min", "Contexto hondureño y problema"],
        ["Fase 02", "10-12 min", "Solución tecnológica y walkthrough"],
        ["Fase 03", "8-10 min", "Accesibilidad, gobernanza y actores"],
        ["Fase 04", "5-7 min", "Viabilidad, riesgos y próximos pasos"],
        ["Fase 05", "5-8 min", "Síntesis y defensa"],
      ],
    },
  },
];

export const conclusionesInforme = [
  "Aula Inclusiva HN demuestra que una solución de inclusión digital para Honduras debe unir accesibilidad técnica, conectividad realista, gobernanza y participación comunitaria. Un LMS web aislado no resuelve la brecha; un canal informal sin trazabilidad educativa tampoco. La combinación de ambos permite ampliar alcance sin sacrificar estructura pedagógica.",
  "El proyecto atiende barreras concretas del país mediante contenido multimodal, entrega por WhatsApp, reglas de adaptación y evaluación técnica WCAG 2.2. Su viabilidad inicial se apoya en infraestructura de bajo costo y en alianzas con ONGs, academia y actores públicos.",
  "Los próximos pasos son validar el MVP con organizaciones reales, ampliar soporte de idiomas y fortalecer la propuesta regulatoria para que la accesibilidad digital educativa se convierta en requisito operativo y no solo en recomendación técnica.",
];

export const referenciasInforme: ReferenciaInforme[] = [
  {
    id: "conatel-2023",
    tipo: "honduras",
    textoApa: "Comisión Nacional de Telecomunicaciones. (2023). Informe del sector telecomunicaciones en Honduras. CONATEL.",
  },
  {
    id: "ine-2022",
    tipo: "honduras",
    textoApa: "Instituto Nacional de Estadística Honduras. (2022). Estadísticas nacionales de población, discapacidad y condiciones de vida. INE Honduras.",
  },
  {
    id: "congreso-2013-discapacidad",
    tipo: "honduras",
    textoApa: "Congreso Nacional de Honduras. (2013). Decreto Legislativo No. 282-2013: Ley de Equidad y Desarrollo Integral para las Personas con Discapacidad.",
  },
  {
    id: "congreso-2013-firma",
    tipo: "honduras",
    textoApa: "Congreso Nacional de Honduras. (2013). Decreto Legislativo No. 149-2013: Ley sobre Firmas Electrónicas.",
  },
  {
    id: "cepal-2022",
    tipo: "regional",
    textoApa: "Comisión Económica para América Latina y el Caribe. (2022). Tecnologías digitales para un nuevo futuro. CEPAL.",
  },
  {
    id: "bid-2021",
    tipo: "regional",
    textoApa: "Banco Interamericano de Desarrollo. (2021). Brecha digital en América Latina y el Caribe: diagnóstico y recomendaciones. BID.",
  },
  {
    id: "pnud-2023",
    tipo: "regional",
    textoApa: "Programa de las Naciones Unidas para el Desarrollo. (2023). Desarrollo humano y transformación digital inclusiva en América Latina. PNUD.",
  },
  {
    id: "w3c-2023",
    tipo: "tecnica",
    textoApa: "World Wide Web Consortium. (2023). Web Content Accessibility Guidelines (WCAG) 2.2. W3C. https://www.w3.org/TR/WCAG22/",
  },
  {
    id: "deque-2024",
    tipo: "tecnica",
    textoApa: "Deque Systems. (2024). axe DevTools: Web accessibility testing documentation. Deque Systems. https://www.deque.com/axe/devtools/",
  },
];

export const conteoReferenciasRegionales = referenciasInforme.filter((referencia) =>
  ["honduras", "regional"].includes(referencia.tipo),
).length;
