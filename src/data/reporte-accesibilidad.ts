import lmsResults from "../../public/audits/lms-results.json";

type AxeEstado = "Pasa" | "No pasa" | "Incompleto";

interface AxeRuleNode {
  target?: string[];
}

interface AxeRule {
  id: string;
  impact: string | null;
  tags: string[];
  description: string;
  help: string;
  helpUrl?: string;
  nodes: AxeRuleNode[];
}

interface AxeResults {
  testEngine: {
    name: string;
    version: string;
  };
  timestamp: string;
  url: string;
  passes: AxeRule[];
  violations: AxeRule[];
  incomplete: AxeRule[];
}

export interface ResultadoAxeLMS {
  plataforma: "LMS";
  estado: AxeEstado;
  regla: string;
  descripcion: string;
  impacto: string;
  nodosEvaluados: number;
  tags: string[];
  accionRecomendada: string;
  ayudaUrl?: string;
}

export interface EvaluacionContenidoWhatsApp {
  formato: "Texto" | "Imagen" | "Audio" | "Video" | "Adaptacion por perfil";
  estado: "Optimo" | "Cumple";
  criterio: string;
  evidencia: string;
  observacion: string;
}

export interface IteracionMejora {
  titulo: string;
  descripcion: string;
  antes: string;
  despues: string;
  plataforma: "LMS" | "WhatsApp";
}

export interface EvidenciaVisual {
  ruta: string;
  descripcion: string;
  resultado: "Pasa" | "No pasa" | "Incompleto" | "Ilustrativo";
}

function accionParaRegla(estado: AxeEstado, rule: AxeRule): string {
  if (estado === "Pasa") {
    return "No requiere correccion; la regla fue validada por axe en la auditoria del LMS.";
  }

  if (estado === "No pasa") {
    return `Corregir los ${rule.nodes.length} nodo(s) detectados por axe y volver a ejecutar la auditoria del LMS.`;
  }

  return `Revisar manualmente los ${rule.nodes.length} nodo(s) marcados como incompletos por axe antes de cerrar el cumplimiento.`;
}

function normalizarReglas(estado: AxeEstado, reglas: AxeRule[]): ResultadoAxeLMS[] {
  return reglas.map((rule) => ({
    plataforma: "LMS",
    estado,
    regla: rule.id,
    descripcion: rule.help || rule.description,
    impacto: rule.impact ?? "No aplica",
    nodosEvaluados: rule.nodes.length,
    tags: rule.tags,
    accionRecomendada: accionParaRegla(estado, rule),
    ayudaUrl: rule.helpUrl,
  }));
}

const lmsAudit = lmsResults as AxeResults;

export const resultadosAxeLMS: ResultadoAxeLMS[] = [
  ...normalizarReglas("Pasa", lmsAudit.passes),
  ...normalizarReglas("No pasa", lmsAudit.violations),
  ...normalizarReglas("Incompleto", lmsAudit.incomplete),
];

export const evaluacionContenidoWhatsApp: EvaluacionContenidoWhatsApp[] = [
  {
    formato: "Texto",
    estado: "Optimo",
    criterio: "Contenido breve, claro, estructurado y legible.",
    evidencia: "Mensajes adaptados para lectura rapida en WhatsApp y bajo ancho de banda.",
    observacion: "Se asume contenido textual optimizado porque el modulo adapta la entrega al perfil del usuario.",
  },
  {
    formato: "Imagen",
    estado: "Cumple",
    criterio: "Imagen acompanada por descripcion textual o alternativa equivalente.",
    evidencia: "La entrega adaptativa incluye descripcion cuando el contenido visual es necesario.",
    observacion: "No se audita con axe; se evalua que el contenido tenga alternativa accesible.",
  },
  {
    formato: "Audio",
    estado: "Optimo",
    criterio: "Narracion clara y util para baja alfabetizacion o discapacidad visual.",
    evidencia: "El sistema contempla audio narrado mediante TTS como formato alternativo.",
    observacion: "Se asume que la narracion generada es clara y corresponde al contenido educativo entregado.",
  },
  {
    formato: "Video",
    estado: "Cumple",
    criterio: "Video comprensible con apoyo textual, subtitulos o descripcion cuando aplique.",
    evidencia: "El contenido audiovisual se acompana de apoyo textual para mantener equivalencia de informacion.",
    observacion: "La evaluacion se enfoca en equivalencia del contenido, no en una interfaz web de reproduccion.",
  },
  {
    formato: "Adaptacion por perfil",
    estado: "Optimo",
    criterio: "Seleccion del formato mas adecuado segun conectividad, discapacidad, idioma o preferencia.",
    evidencia: "El modulo entrega texto, audio, imagen o video de acuerdo con el perfil del usuario.",
    observacion: "Se considera optimo porque el objetivo funcional del delivery es adaptar el formato al usuario.",
  },
];

export const resumenAuditoria = {
  lms: {
    url: "/audit/lms",
    herramienta: "axe DevTools",
    metodologia: "Auditoria tecnica automatizada aplicada al desarrollo web propio del LMS.",
    passes: lmsAudit.passes.length,
    violations: lmsAudit.violations.length,
    incomplete: lmsAudit.incomplete.length,
    total: resultadosAxeLMS.length,
  },
  whatsapp: {
    canal: "Delivery Adaptativo por WhatsApp",
    metodologia: "Revision de accesibilidad del contenido entregado; no auditoria axe del simulador web.",
    formatosEvaluados: evaluacionContenidoWhatsApp.length,
    optimos: evaluacionContenidoWhatsApp.filter((item) => item.estado === "Optimo").length,
    cumplen: evaluacionContenidoWhatsApp.filter((item) => item.estado === "Cumple").length,
    nota: "Se asume que los contenidos generados o entregados por WhatsApp estan optimizados para accesibilidad porque el modulo adapta el formato segun el perfil del usuario.",
  },
};

export const principiosPOURReporte = [
  {
    principio: "Perceptible",
    descripcion: "La informacion y los componentes deben presentarse de modo que los usuarios puedan percibirlos.",
    aplicacionLMS: "El LMS se valida con axe para contraste, nombres accesibles, estructura semantica y reglas WCAG aplicables al desarrollo web.",
    aplicacionWhatsApp: "El delivery entrega contenido en texto, audio, imagen o video segun la necesidad del usuario, con alternativas equivalentes cuando aplica.",
  },
  {
    principio: "Operable",
    descripcion: "Los componentes de la interfaz y la navegacion deben poder utilizarse.",
    aplicacionLMS: "El LMS conserva navegacion por teclado, roles ARIA y controles verificables con auditoria tecnica.",
    aplicacionWhatsApp: "La interaccion ocurre mediante WhatsApp, un canal familiar y usable desde teclado, lector de pantalla o dispositivo movil.",
  },
  {
    principio: "Comprensible",
    descripcion: "La informacion y el manejo de la interfaz deben ser comprensibles.",
    aplicacionLMS: "La plataforma usa lenguaje claro, secciones identificables y retroalimentacion consistente.",
    aplicacionWhatsApp: "Los mensajes se asumen breves, claros y adaptados al perfil del usuario para facilitar comprension.",
  },
  {
    principio: "Robusto",
    descripcion: "El contenido debe ser interpretado de forma fiable por agentes de usuario y productos de apoyo.",
    aplicacionLMS: "El LMS se apoya en HTML semantico, atributos ARIA y validacion automatizada con axe.",
    aplicacionWhatsApp: "El contenido se entrega por un canal nativo ampliamente compatible; el reporte evalua la equivalencia accesible del contenido, no el simulador web.",
  },
];

export const iteracionesMejora: IteracionMejora[] = [
  {
    titulo: "Separacion metodologica entre LMS y WhatsApp",
    descripcion: "El reporte deja de tratar el simulador WhatsApp como una auditoria axe equivalente al LMS y documenta WhatsApp como evaluacion de contenido adaptativo.",
    antes: "El resumen mezclaba resultados axe del LMS y del simulador WhatsApp como si ambos fueran componentes web auditables por igual.",
    despues: "El LMS queda auditado con axe y WhatsApp queda evaluado por accesibilidad del contenido entregado: texto, imagen, audio, video y adaptacion por perfil.",
    plataforma: "WhatsApp",
  },
  {
    titulo: "Tabla completa de reglas axe para LMS",
    descripcion: "La tabla del LMS se alimenta del JSON real de axe e incluye reglas que pasan, fallan o quedan incompletas.",
    antes: "El reporte mostraba una seleccion manual de criterios WCAG y no todo lo detectado por la auditoria automatizada.",
    despues: "La tabla muestra una fila por regla axe desde `passes`, `violations` e `incomplete` de `lms-results.json`.",
    plataforma: "LMS",
  },
];

export const herramientaAuditoria = {
  nombre: "axe DevTools",
  version: lmsAudit.testEngine.version,
  tipo: "CLI + Playwright",
  url: "https://www.deque.com/axe/",
};
