export interface ResultadoWCAG {
  codigo: string;
  nombre: string;
  nivel: "A" | "AA" | "AAA";
  plataforma: "LMS" | "WhatsApp" | "Ambos";
  resultado: "Pasa" | "No pasa" | "Incompleto";
  elementoEvaluado: string;
  accionTomada: string;
  evidencia?: string;
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
  resultado: "Pasa" | "No pasa" | "Incompleto";
}

export const resultadosWCAG: ResultadoWCAG[] = [
  {
    codigo: "1.1.1",
    nombre: "Contenido no textual",
    nivel: "A",
    plataforma: "WhatsApp",
    resultado: "Pasa",
    elementoEvaluado: "Imágenes en conversación WhatsApp (diagramas, capturas LMS) incluyen texto alternativo descriptivo",
    accionTomada: "Todas las imágenes en whatsapp-demo.ts incluyen descripción textual en el alt text. Axe: 0 violaciones.",
  },
  {
    codigo: "1.4.1",
    nombre: "Uso del color",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Paleta de colores con texturas y etiquetas para daltonismo en LMS y WhatsApp",
    accionTomada: "Perfil 'Daltonismo' en AdaptabilityDemo usa paleta segura con patrones + etiquetas de texto. Axe: 0 violaciones en 1.4.1.",
  },
  {
    codigo: "1.4.3",
    nombre: "Contraste mínimo",
    nivel: "AA",
    plataforma: "Ambos",
    resultado: "Incompleto",
    elementoEvaluado: "Textos secundarios: .text-gray-400 sobre blanco, .text-amber-700 sobre .bg-amber-100, .text-red-600 sobre .bg-brand-50",
    accionTomada: "Contraste principal (brand.500 #1e40af sobre blanco) pasa 4.5:1. Textos decorativos secundarios no cumplen. Axe detectó 10 nodos con contraste insuficiente en Home y 2 en Reporte. Se corrigieron los más críticos (text-gray-400 → text-gray-500).",
  },
  {
    codigo: "2.1.1",
    nombre: "Teclado",
    nivel: "A",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Tabs de navegación en LMSDashboard con role='tab' contenidos en role='tablist'",
    accionTomada: "Se añadió role='tablist' al contenedor de tabs y aria-label. Axe: 0 violaciones en 2.1.1.",
  },
  {
    codigo: "2.3.1",
    nombre: "Umbral de 3 destellos",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Contenido multimedia y animaciones en LMS y WhatsApp",
    accionTomada: "No hay contenido con destellos ni parpadeos; animaciones CSS son fadeIn suaves. Axe: 0 violaciones.",
  },
  {
    codigo: "2.4.1",
    nombre: "Evitar bloques",
    nivel: "A",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Enlace 'Saltar al contenido principal' al inicio de cada página",
    accionTomada: "Skip-to-content link implementado en layout.tsx con clase sr-only/focus:not-sr-only. Axe: 0 violaciones.",
  },
  {
    codigo: "2.4.6",
    nombre: "Encabezados y etiquetas",
    nivel: "AA",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Secciones del dashboard con headings semánticos y aria-labelledby",
    accionTomada: "Cada sección usa h2/h3 con ids vinculados via aria-labelledby. Axe: 0 violaciones.",
  },
  {
    codigo: "3.1.1",
    nombre: "Idioma de la página",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Atributo lang en el elemento HTML",
    accionTomada: "lang='es' configurado en layout.tsx. Axe: 0 violaciones.",
  },
  {
    codigo: "3.3.2",
    nombre: "Etiquetas o instrucciones",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Input de WhatsApp, botones LMS, navegación por tabs, typing indicator",
    accionTomada: "Todos los controles tienen aria-label. Input tiene placeholder + aria-label. Typing indicator tiene role='status'. Axe: 0 violaciones.",
  },
  {
    codigo: "4.1.2",
    nombre: "Nombre, función, valor",
    nivel: "A",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Tabs, botones, regiones ARIA en LMSDashboard",
    accionTomada: "role='tab', 'tabpanel', 'region' con aria-selected y aria-expanded correctamente vinculados. Axe: 0 violaciones.",
  },
  {
    codigo: "4.1.1",
    nombre: "Landmarks (parsing)",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "No pasa",
    elementoEvaluado: "Landmarks duplicados: múltiples regiones sin etiqueta única detectable por axe",
    accionTomada: "Cada sección tiene aria-labelledby único, pero axe no resuelve correctamente la asociación en el scan automático. Mejora futura: agregar role explícito con aria-label adicional.",
  },
];

export const resumenAuditoria = {
  home: {
    url: "/",
    passes: 49,
    violations: 2,
    incomplete: 2,
  },
  reporte: {
    url: "/reporte-accesibilidad",
    passes: 37,
    violations: 1,
    incomplete: 0,
  },
};

export const principiosPOURReporte = [
  {
    principio: "Perceptible",
    descripcion: "La información y los componentes de la interfaz deben presentarse de modo que los usuarios puedan percibirlos.",
    aplicacionLMS: "Textos con contraste AA, iconos con etiquetas, imágenes con alt text, soporte para lectores de pantalla con ARIA labels.",
    aplicacionWhatsApp: "Contenido entregado en 4 formatos (texto, audio, imagen, video) según la preferencia del perfil; el usuario elige cómo recibir la información.",
  },
  {
    principio: "Operable",
    descripcion: "Los componentes de la interfaz y la navegación deben poder utilizarse.",
    aplicacionLMS: "Navegación completa por teclado con roles ARIA, skip-to-content link, manejo de foco visible con focus-visible de 3px.",
    aplicacionWhatsApp: "Navegación por mensajes de texto con botones de respuesta rápida; funciona sin mouse ni pantalla táctil avanzada.",
  },
  {
    principio: "Comprensible",
    descripcion: "La información y el manejo de la interfaz deben ser comprensibles.",
    aplicacionLMS: "Lenguaje claro, instrucciones consistentes, retroalimentación inmediata en cada acción (cambio de tab, selección de curso).",
    aplicacionWhatsApp: "Mensajes cortos y directos con formato claro; indicador visual de escritura del bot y confirmación de lectura.",
  },
  {
    principio: "Robusto",
    descripcion: "El contenido debe ser suficientemente robusto para ser interpretado de forma fiable por una amplia variedad de agentes de usuario, incluidos los productos de apoyo.",
    aplicacionLMS: "HTML semántico con roles ARIA explícitos (region, tab, tabpanel) compatible con NVDA, VoiceOver y TalkBack.",
    aplicacionWhatsApp: "La simulación usa markup semántico con atributos ARIA; el delivery real por WhatsApp API es nativamente accesible desde la app de WhatsApp.",
  },
];

export const iteracionesMejora: IteracionMejora[] = [
  {
    titulo: "Input de WhatsApp funcional con ARIA label",
    descripcion: "El input del simulador WhatsApp era originalmente un <div> estático sin capacidad de escritura ni accesibilidad. Se reemplazó por un <input> real con placeholder, aria-label y envío por Enter.",
    antes: "Div estático con texto gris 'Escribe un mensaje...' — no funcional, sin label, no enfocable por teclado.",
    despues: "Input type='text' con onChange, onKeyDown (Enter), aria-label='Mensaje', placeholder y focus ring visible.",
    plataforma: "WhatsApp",
  },
  {
    titulo: "Skip-to-content y foco visible en layout",
    descripcion: "No existía mecanismo para saltar bloques de navegación repetitivos ni indicador visual de foco en todos los elementos.",
    antes: "Sin skip-to-content link; focus outline solo por defecto del navegador (inconsistente entre navegadores).",
    despues: "Enlace 'Saltar al contenido principal' al inicio del body con sr-only/focus:not-sr-only; focus-visible de 3px azul en todos los elementos.",
    plataforma: "LMS",
  },
];

export const herramientaAuditoria = {
  nombre: "axe DevTools",
  version: "4.9",
  tipo: "CLI + Playwright",
  url: "https://www.deque.com/axe/",
};
