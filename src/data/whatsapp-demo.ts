export interface MensajeWhatsApp {
  id: number;
  remitente: "bot" | "usuario";
  contenido: string;
  tipo: "texto" | "imagen" | "audio" | "video";
  delay: number;
  timestamp: string;
  duracionAudio?: string;
}

export interface PerfilUsuario {
  nombre: string;
  conectividad: "baja" | "media" | "alta";
  discapacidad: "ninguna" | "visual" | "auditiva" | "daltonismo";
  icono: string;
  formatoEntregado: string;
  descripcionFormato: string;
}

export const perfiles: PerfilUsuario[] = [
  {
    nombre: "María - zona rural, baja cobertura",
    conectividad: "baja",
    discapacidad: "ninguna",
    icono: "📱",
    formatoEntregado: "📝🖼️ Texto + imagen comprimida",
    descripcionFormato: "Baja cobertura sin discapacidad → texto + imagen comprimida",
  },
  {
    nombre: "Carlos - persona ciega",
    conectividad: "media",
    discapacidad: "visual",
    icono: "🦯",
    formatoEntregado: "🎙️📝 Audio + texto",
    descripcionFormato: "Cobertura media + ciego → audio + texto para lector de pantalla",
  },
  {
    nombre: "Ana - daltonismo",
    conectividad: "alta",
    discapacidad: "daltonismo",
    icono: "👁️",
    formatoEntregado: "📝🖼️ Texto + imagen (paleta segura)",
    descripcionFormato: "Cobertura alta + daltonismo → paleta de colores accesible",
  },
  {
    nombre: "José - baja cobertura, ciego",
    conectividad: "baja",
    discapacidad: "visual",
    icono: "📵",
    formatoEntregado: "🎙️ Solo audio",
    descripcionFormato: "Baja cobertura + ciego → solo audio (mínimo ancho de banda)",
  },
];

export function generarConversacion(perfil: PerfilUsuario): MensajeWhatsApp[] {
  const ahora = "9:41 AM";

  if (perfil.conectividad === "baja" && perfil.discapacidad === "visual") {
    return [
      { id: 1, remitente: "bot", contenido: "👋 ¡Hola José! Bienvenido a Aula Inclusiva HN. Hoy tienes tu lección del curso 'Introducción a la Computación'.", tipo: "texto", delay: 800, timestamp: ahora },
      { id: 2, remitente: "usuario", contenido: "Hola, listo para la lección", tipo: "texto", delay: 700, timestamp: "9:42 AM" },
      { id: 3, remitente: "bot", contenido: "Lección 3: Componentes de una computadora", tipo: "audio", delay: 1500, timestamp: "9:42 AM", duracionAudio: "2:35" },
      { id: 4, remitente: "usuario", contenido: "Gracias, lo escuché bien. ¿Hay evaluación?", tipo: "texto", delay: 600, timestamp: "9:44 AM" },
      { id: 5, remitente: "bot", contenido: "Sí, responde con la letra de la opción correcta:\n\nA. CPU, monitor, teclado\nB. Solo CPU\nC. Solo monitor\n\n¿Cuáles son los componentes básicos de una PC?", tipo: "texto", delay: 1200, timestamp: "9:44 AM" },
      { id: 6, remitente: "usuario", contenido: "A", tipo: "texto", delay: 500, timestamp: "9:45 AM" },
      { id: 7, remitente: "bot", contenido: "✅ ¡Correcto! Progreso: 60%. Próxima lección mañana a las 9:00 AM.", tipo: "texto", delay: 1000, timestamp: "9:45 AM" },
    ];
  }

  if (perfil.discapacidad === "visual") {
    return [
      { id: 1, remitente: "bot", contenido: "👋 ¡Hola Carlos! Hoy tienes la Lección 3 del curso 'Introducción a la Computación'. Te envío el contenido en formato accesible.", tipo: "texto", delay: 800, timestamp: ahora },
      { id: 2, remitente: "usuario", contenido: "Perfecto, prefiero audio para empezar", tipo: "texto", delay: 600, timestamp: "9:42 AM" },
      { id: 3, remitente: "bot", contenido: "Lección 3: Componentes de una computadora", tipo: "audio", delay: 1500, timestamp: "9:42 AM", duracionAudio: "3:12" },
      { id: 4, remitente: "bot", contenido: "También te envío el texto completo para repasar con tu lector de pantalla:\n\n«Una computadora se compone de hardware (partes físicas: CPU, monitor, teclado) y software (programas). El CPU es el cerebro que procesa las instrucciones.»", tipo: "texto", delay: 800, timestamp: "9:42 AM" },
      { id: 5, remitente: "usuario", contenido: "Excelente, el lector lo lee sin problemas. ¿Tiene imagen el diagrama?", tipo: "texto", delay: 700, timestamp: "9:44 AM" },
      { id: 6, remitente: "bot", contenido: "Sí, el diagrama incluye descripción textual alternativa: «Diagrama que muestra CPU conectado a monitor, teclado y ratón mediante flechas». ¿Quieres que te lo lea?", tipo: "texto", delay: 1000, timestamp: "9:44 AM" },
      { id: 7, remitente: "usuario", contenido: "Sí, por favor", tipo: "texto", delay: 400, timestamp: "9:44 AM" },
      { id: 8, remitente: "bot", contenido: "🔊 Descripción del diagrama: La CPU está en el centro. Hacia arriba una flecha al monitor (salida de video). Hacia abajo al teclado (entrada de texto). A la derecha al ratón (entrada de navegación).", tipo: "audio", delay: 1200, timestamp: "9:44 AM", duracionAudio: "0:45" },
      { id: 9, remitente: "usuario", contenido: "Perfecto, todo claro 👍", tipo: "texto", delay: 500, timestamp: "9:45 AM" },
    ];
  }

  if (perfil.discapacidad === "daltonismo") {
    return [
      { id: 1, remitente: "bot", contenido: "👋 ¡Hola Ana! Hoy te toca la Lección 3: Componentes de una computadora. He adaptado los colores del material para ti.", tipo: "texto", delay: 800, timestamp: ahora },
      { id: 2, remitente: "usuario", contenido: "Gracias, ¿qué cambiaron en los colores?", tipo: "texto", delay: 600, timestamp: "9:42 AM" },
      { id: 3, remitente: "bot", contenido: "Usamos una paleta segura para daltonismo: patrones de textura combinados con etiquetas texto en lugar de depender solo del color. Por ejemplo, CPU aparece etiquetado y con textura punteada.", tipo: "texto", delay: 1000, timestamp: "9:42 AM" },
      { id: 4, remitente: "bot", contenido: "Diagrama de componentes con paleta accesible", tipo: "imagen", delay: 1500, timestamp: "9:42 AM" },
      { id: 5, remitente: "usuario", contenido: "¡Se ve genial! Distingo bien CPU, monitor y teclado por las texturas.", tipo: "texto", delay: 600, timestamp: "9:44 AM" },
      { id: 6, remitente: "bot", contenido: "Me alegra. El software también usa esta paleta. ¿Quieres ver un ejemplo en la interfaz del LMS?", tipo: "texto", delay: 800, timestamp: "9:44 AM" },
      { id: 7, remitente: "usuario", contenido: "Sí, muéstrame", tipo: "texto", delay: 400, timestamp: "9:44 AM" },
      { id: 8, remitente: "bot", contenido: "🔍 Captura del LMS con paleta daltónico: las barras de progreso usan patrones (rayas, puntos, sólido) en vez de solo colores. Todos los botones tienen icono + texto.", tipo: "imagen", delay: 1200, timestamp: "9:44 AM" },
      { id: 9, remitente: "usuario", contenido: "Perfecto, así sí puedo diferenciar todo sin confundirme", tipo: "texto", delay: 600, timestamp: "9:45 AM" },
    ];
  }

  if (perfil.conectividad === "baja") {
    return [
      { id: 1, remitente: "bot", contenido: "👋 ¡Hola María! Hoy tienes lección nueva. Como tu conexión es baja, te envío contenido optimizado para 2G.", tipo: "texto", delay: 800, timestamp: ahora },
      { id: 2, remitente: "usuario", contenido: "Buenos días, espero alcance para bajar la lección", tipo: "texto", delay: 700, timestamp: "9:42 AM" },
      { id: 3, remitente: "bot", contenido: "Lección 3: Componentes de una computadora\n\nUna computadora se compone de hardware (partes físicas: CPU, monitor, teclado, ratón) y software (programas: sistema operativo, aplicaciones).\n\nEl CPU es el «cerebro» que procesa las instrucciones.", tipo: "texto", delay: 1000, timestamp: "9:42 AM" },
      { id: 4, remitente: "usuario", contenido: "¿Me puedes enviar un dibujo de cómo se conectan?", tipo: "texto", delay: 600, timestamp: "9:43 AM" },
      { id: 5, remitente: "bot", contenido: "Diagrama simple de componentes (optimizado: 15 KB)", tipo: "imagen", delay: 1500, timestamp: "9:43 AM" },
      { id: 6, remitente: "usuario", contenido: "Llegó rápido, se ve bien aunque estoy en 2G", tipo: "texto", delay: 500, timestamp: "9:44 AM" },
      { id: 7, remitente: "bot", contenido: "🙌 Me alegra. La imagen se comprimió sin perder lo esencial. ¿Quieres hacer la evaluación rápida?", tipo: "texto", delay: 800, timestamp: "9:44 AM" },
      { id: 8, remitente: "usuario", contenido: "Sí, mándala", tipo: "texto", delay: 400, timestamp: "9:44 AM" },
      { id: 9, remitente: "bot", contenido: "¿Cuál es la función del CPU?\nA. Procesar instrucciones\nB. Almacenar archivos\nC. Mostrar imágenes\n\nResponde A, B o C", tipo: "texto", delay: 1000, timestamp: "9:44 AM" },
      { id: 10, remitente: "usuario", contenido: "A", tipo: "texto", delay: 500, timestamp: "9:45 AM" },
      { id: 11, remitente: "bot", contenido: "✅ ¡Correcto! Progreso: 50%. Próxima lección en 2 días (modo offline disponible).", tipo: "texto", delay: 1000, timestamp: "9:45 AM" },
    ];
  }

  /* Perfil por defecto: cobertura alta, sin discapacidad */
  return [
    { id: 1, remitente: "bot", contenido: "👋 ¡Hola! Bienvenido/a a Aula Inclusiva HN. Hoy tienes tu lección del curso 'Introducción a la Computación'.", tipo: "texto", delay: 800, timestamp: ahora },
    { id: 2, remitente: "usuario", contenido: "Genial, ¿qué tema toca hoy?", tipo: "texto", delay: 600, timestamp: "9:42 AM" },
    { id: 3, remitente: "bot", contenido: "📚 Lección 3: Componentes de una computadora\n\nUna computadora se compone de hardware y software. El CPU es el cerebro, la RAM es la memoria de trabajo, y el disco duro almacena datos permanentemente.", tipo: "texto", delay: 1000, timestamp: "9:42 AM" },
    { id: 4, remitente: "usuario", contenido: "¿Me puedes mostrar el diagrama?", tipo: "texto", delay: 500, timestamp: "9:43 AM" },
    { id: 5, remitente: "bot", contenido: "Diagrama detallado de componentes", tipo: "imagen", delay: 1500, timestamp: "9:43 AM" },
    { id: 6, remitente: "bot", contenido: "También tengo un video corto si quieres ver el ensamblaje.", tipo: "texto", delay: 600, timestamp: "9:43 AM" },
    { id: 7, remitente: "usuario", contenido: "¡Sí, mándalo!", tipo: "texto", delay: 400, timestamp: "9:43 AM" },
    { id: 8, remitente: "bot", contenido: "Video: «Ensamblaje de una PC paso a paso» (3 min)", tipo: "video", delay: 1000, timestamp: "9:43 AM" },
    { id: 9, remitente: "usuario", contenido: "Muy completo, gracias. ¿Hay ejercicio de práctica?", tipo: "texto", delay: 600, timestamp: "9:45 AM" },
    { id: 10, remitente: "bot", contenido: "Sí, en el LMS encontrarás un laboratorio virtual. Te notifico cuando esté listo tu progreso. 🎯", tipo: "texto", delay: 1000, timestamp: "9:45 AM" },
  ];
}

export type { MensajeWhatsApp as Mensaje, PerfilUsuario as Perfil };