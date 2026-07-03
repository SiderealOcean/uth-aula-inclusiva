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
    nombre: "Contraste mínimo (LMS)",
    nivel: "AA",
    plataforma: "LMS",
    resultado: "Incompleto",
    elementoEvaluado: "Texto .text-gray-500 en contenedor de estadísticas del dashboard LMS",
    accionTomada: "Contraste principal (brand.500 #1e40af sobre blanco) pasa 4.5:1. El texto .px-4.text-center.text-gray-500 tiene contraste insuficiente (1 violación) y 10 nodos adicionales con contraste incompleto. Pendiente de revisión manual.",
  },
  {
    codigo: "1.4.3",
    nombre: "Contraste mínimo (WhatsApp)",
    nivel: "AA",
    plataforma: "WhatsApp",
    resultado: "No pasa",
    elementoEvaluado: "Textos .bg-amber-100, .font-semibold, .opacity-80 en la simulación WhatsApp",
    accionTomada: "3 nodos con contraste insuficiente detectados en la interfaz del simulador WhatsApp: fondo ámbar con texto, texto semibold sobre fondo claro, y texto con opacidad reducida. 2 nodos adicionales incompletos.",
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
    codigo: "2.4.6",
    nombre: "Encabezados y etiquetas",
    nivel: "AA",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Secciones del dashboard con headings semánticos (h2/h3) y aria-labelledby",
    accionTomada: "Cada sección usa h2/h3 con ids vinculados via aria-labelledby. Axe: 0 violaciones en heading-order y empty-heading.",
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
];

export const resumenAuditoria = {
  lms: {
    url: "/audit/lms",
    passes: 39,
    violations: 2,
    incomplete: 1,
  },
  whatsapp: {
    url: "/audit/whatsapp",
    passes: 35,
    violations: 2,
    incomplete: 1,
  },
};

export const principiosPOURReporte = [
  {
    principio: "Perceptible",
    descripcion: "La información y los componentes de la interfaz deben presentarse de modo que los usuarios puedan percibirlos.",
    aplicacionLMS: "Textos con contraste AA (pendiente revisión en textos secundarios), iconos con aria-hidden, soporte para lectores de pantalla con ARIA labels en todos los controles.",
    aplicacionWhatsApp: "Contenido entregado en 4 formatos (texto, audio, imagen, video) según la preferencia del perfil; el usuario elige cómo recibir la información.",
  },
  {
    principio: "Operable",
    descripcion: "Los componentes de la interfaz y la navegación deben poder utilizarse.",
    aplicacionLMS: "Navegación completa por teclado con roles ARIA (tablist, tab, tabpanel), sidebar navegable con teclado y foco visible con focus-visible de 3px.",
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
    aplicacionLMS: "HTML semántico con roles ARIA explícitos (tablist, tab, tabpanel, region) y estados (aria-selected, aria-current) compatible con NVDA, VoiceOver y TalkBack.",
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
    titulo: "Tabs con role='tablist' y aria-label en LMSDashboard",
    descripcion: "Los botones de selección de vista (Estudiante/Organización) no tenían contenedor semántico que agrupara los tabs ni etiqueta descriptiva para lectores de pantalla.",
    antes: "Dos botones sueltos sin contenedor role='tablist'; cada botón tenía role='tab' pero sin grupo padre que los relacione como conjunto de tabs.",
    despues: "Contenedor <div> con role='tablist' y aria-label='Selección de vista'; cada botón mantiene role='tab' con aria-selected dinámico.",
    plataforma: "LMS",
  },
];

export const herramientaAuditoria = {
  nombre: "axe DevTools",
  version: "4.12",
  tipo: "CLI + Playwright",
  url: "https://www.deque.com/axe/",
};
