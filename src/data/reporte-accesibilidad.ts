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
    accionTomada: "Todas las imágenes en whatsapp-demo.ts incluyen descripción textual en el alt text",
  },
  {
    codigo: "1.4.1",
    nombre: "Uso del color",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Paleta de colores con texturas y etiquetas para daltonismo en LMS y WhatsApp",
    accionTomada: "Perfil 'Daltonismo' en AdaptabilityDemo usa paleta segura con patrones + etiquetas de texto en lugar de solo color",
  },
  {
    codigo: "1.4.3",
    nombre: "Contraste mínimo",
    nivel: "AA",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Texto vs fondo en toda la interfaz (Header, tarjetas, tablas, simuladores)",
    accionTomada: "Paleta brand.500 (#1e40af) sobre blanco pasa ratio 4.5:1; configurado en tailwind.config.ts",
  },
  {
    codigo: "2.1.1",
    nombre: "Teclado",
    nivel: "A",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Tabs de navegación en LMSDashboard (Estudiante / Organización / Creador)",
    accionTomada: "Se usan role='tab' nativos con manejo de foco por teclado; aria-selected y aria-controls vinculados",
  },
  {
    codigo: "2.3.1",
    nombre: "Umbral de 3 destellos",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Contenido multimedia (videos, animaciones) en LMS y WhatsApp",
    accionTomada: "No hay contenido con destellos ni parpadeos; animaciones CSS son fadeIn suaves (< 3 destellos/segundo)",
  },
  {
    codigo: "2.4.1",
    nombre: "Evitar bloques",
    nivel: "A",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Enlace 'Saltar al contenido principal' al inicio de cada página",
    accionTomada: "Skip-to-content link implementado en layout.tsx con clase sr-only/focus:not-sr-only",
  },
  {
    codigo: "2.4.6",
    nombre: "Encabezados y etiquetas",
    nivel: "AA",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Secciones del LMS con headings semánticos y aria-labelledby",
    accionTomada: "Cada sección del dashboard usa h2/h3 con ids vinculados via aria-labelledby",
  },
  {
    codigo: "3.1.1",
    nombre: "Idioma de la página",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Atributo lang en el elemento HTML",
    accionTomada: "lang='es' configurado en layout.tsx: <html lang='es'>",
  },
  {
    codigo: "3.3.2",
    nombre: "Etiquetas o instrucciones",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Input de WhatsApp, botones, controles del LMS, navegación por tabs",
    accionTomada: "Todos los controles interactivos tienen aria-label; input de WhatsApp tiene placeholder y aria-label",
  },
  {
    codigo: "4.1.2",
    nombre: "Nombre, función, valor",
    nivel: "A",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Tabs, botones, regiones ARIA en LMSDashboard",
    accionTomada: "role='tab', 'tabpanel', 'region' con aria-selected y aria-expanded correctamente vinculados",
  },
];

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
