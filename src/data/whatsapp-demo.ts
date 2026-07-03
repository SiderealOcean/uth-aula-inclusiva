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
  const base: MensajeWhatsApp[] = [
    { id: 1, remitente: "bot", contenido: "👋 ¡Hola! Bienvenido/a a Aula Inclusiva HN. Hoy tienes tu lección del curso 'Introducción a la Computación'.", tipo: "texto", delay: 800, timestamp: "9:41 AM" },
  ];

  if (perfil.conectividad === "baja" && perfil.discapacidad === "visual") {
    base.push(
      { id: 2, remitente: "bot", contenido: "Lección 3: Componentes de una computadora", tipo: "audio", delay: 1500, timestamp: "9:41 AM", duracionAudio: "2:35" },
      { id: 3, remitente: "usuario", contenido: "Gracias, lo escuché. ¿Hay evaluación?", tipo: "texto", delay: 600, timestamp: "9:44 AM" },
      { id: 4, remitente: "bot", contenido: "Sí, responde con la letra de la opción correcta:\n\nA. CPU, monitor, teclado\nB. Solo CPU\nC. Solo monitor\n\n¿Componentes básicos de una PC?", tipo: "texto", delay: 1200, timestamp: "9:44 AM" },
      { id: 5, remitente: "usuario", contenido: "A", tipo: "texto", delay: 500, timestamp: "9:45 AM" },
      { id: 6, remitente: "bot", contenido: "✅ ¡Correcto! Progreso actualizado. Próxima lección mañana a las 9:00 AM.", tipo: "texto", delay: 1000, timestamp: "9:45 AM" },
    );
  } else if (perfil.discapacidad === "visual") {
    base.push(
      { id: 2, remitente: "bot", contenido: "Lección 3: Componentes de una computadora", tipo: "audio", delay: 1500, timestamp: "9:41 AM", duracionAudio: "3:12" },
      { id: 3, remitente: "bot", contenido: "También te envío el texto por si quieres repasar con lector de pantalla:\n\n«Una computadora se compone de hardware (partes físicas: CPU, monitor, teclado) y software (programas).»", tipo: "texto", delay: 800, timestamp: "9:41 AM" },
      { id: 4, remitente: "usuario", contenido: "Perfecto, audio + texto 👍", tipo: "texto", delay: 600, timestamp: "9:43 AM" },
    );
  } else if (perfil.discapacidad === "daltonismo") {
    base.push(
      { id: 2, remitente: "bot", contenido: "Lección 3: Componentes de una computadora\n\nUna computadora se compone de hardware (partes físicas) y software (programas). Los componentes principales son:", tipo: "texto", delay: 1000, timestamp: "9:41 AM" },
      { id: 3, remitente: "bot", contenido: "Diagrama de componentes (paleta accesible para daltonismo)", tipo: "imagen", delay: 1500, timestamp: "9:41 AM" },
      { id: 4, remitente: "usuario", contenido: "¡La imagen se ve perfecta, distingo todos los componentes!", tipo: "texto", delay: 600, timestamp: "9:43 AM" },
    );
  } else if (perfil.conectividad === "baja") {
    base.push(
      { id: 2, remitente: "bot", contenido: "Lección 3: Componentes de una computadora\n\nUna computadora se compone de hardware (partes físicas: CPU, monitor, teclado, ratón) y software (programas: sistema operativo, aplicaciones).\n\nEl CPU es el «cerebro» que procesa las instrucciones.", tipo: "texto", delay: 1000, timestamp: "9:41 AM" },
      { id: 3, remitente: "bot", contenido: "Diagrama simple de componentes (comprimido para 2G)", tipo: "imagen", delay: 1500, timestamp: "9:41 AM" },
    );
  } else {
    base.push(
      { id: 2, remitente: "bot", contenido: "📚 Lección 3: Componentes de una computadora\n\nUna computadora se compone de hardware y software. El CPU es el cerebro, la RAM es la memoria de trabajo, y el disco duro almacena datos permanentemente.", tipo: "texto", delay: 1000, timestamp: "9:41 AM" },
      { id: 3, remitente: "bot", contenido: "Diagrama detallado de componentes", tipo: "imagen", delay: 1500, timestamp: "9:41 AM" },
      { id: 4, remitente: "bot", contenido: "Video: «Ensamblaje de una PC paso a paso» (3 min)", tipo: "video", delay: 1000, timestamp: "9:41 AM" },
    );
  }

  return base;
}

export type { MensajeWhatsApp as Mensaje, PerfilUsuario as Perfil };