export interface MensajeWhatsApp {
  id: number;
  remitente: "bot" | "usuario";
  contenido: string;
  tipo: "texto" | "imagen" | "audio" | "video";
  delay: number;
}

export interface PerfilUsuario {
  nombre: string;
  conectividad: "baja" | "media" | "alta";
  discapacidad: "ninguna" | "visual" | "auditiva" | "daltonismo";
  icono: string;
}

export const perfiles: PerfilUsuario[] = [
  {
    nombre: "María - zona rural, baja cobertura",
    conectividad: "baja",
    discapacidad: "ninguna",
    icono: "📱",
  },
  {
    nombre: "Carlos - persona ciega",
    conectividad: "media",
    discapacidad: "visual",
    icono: "🦯",
  },
  {
    nombre: "Ana - daltonismo",
    conectividad: "alta",
    discapacidad: "daltonismo",
    icono: "👁️",
  },
  {
    nombre: "José - baja cobertura, ciego",
    conectividad: "baja",
    discapacidad: "visual",
    icono: "📵",
  },
];

export function generarConversacion(perfil: PerfilUsuario): MensajeWhatsApp[] {
  const base: MensajeWhatsApp[] = [
    { id: 1, remitente: "bot", contenido: "👋 ¡Hola! Bienvenido/a a Aula Inclusiva HN. Hoy tienes tu lección del curso 'Introducción a la Computación'.", tipo: "texto", delay: 1000 },
  ];

  if (perfil.conectividad === "baja" && perfil.discapacidad === "visual") {
    base.push(
      { id: 2, remitente: "bot", contenido: "🎙️ Lección 3: Componentes de una computadora - Audio", tipo: "audio", delay: 1500 },
      { id: 3, remitente: "usuario", contenido: "Gracias, lo escuché. ¿Hay evaluación?", tipo: "texto", delay: 500 },
      { id: 4, remitente: "bot", contenido: "Sí, responde con la letra de la opción correcta:\nA. CPU, monitor, teclado\nB. Solo CPU\nC. Solo monitor\n¿Componentes básicos de una PC?", tipo: "texto", delay: 1000 },
      { id: 5, remitente: "usuario", contenido: "A", tipo: "texto", delay: 500 },
      { id: 6, remitente: "bot", contenido: "✅ ¡Correcto! Progreso actualizado. Próxima lección mañana.", tipo: "texto", delay: 1000 },
    );
  } else if (perfil.discapacidad === "visual") {
    base.push(
      { id: 2, remitente: "bot", contenido: "🎙️ Lección 3: Componentes de una computadora", tipo: "audio", delay: 1500 },
      { id: 3, remitente: "bot", contenido: "También te envío el texto por si querés repasar con lector de pantalla:\n\n'Una computadora se compone de hardware (partes físicas: CPU, monitor, teclado) y software (programas).'", tipo: "texto", delay: 1000 },
      { id: 4, remitente: "usuario", contenido: "Perfecto, audio + texto 👍", tipo: "texto", delay: 500 },
    );
  } else if (perfil.discapacidad === "daltonismo") {
    base.push(
      { id: 2, remitente: "bot", contenido: "Lección 3: Componentes de una computadora\n\nUna computadora se compone de hardware (partes físicas) y software (programas). Los componentes principales son:", tipo: "texto", delay: 1000 },
      { id: 3, remitente: "bot", contenido: "🖼️ Diagrama de componentes (paleta accesible para daltonismo)", tipo: "imagen", delay: 1500 },
      { id: 4, remitente: "usuario", contenido: "¡La imagen se ve perfecta, distingo todos los componentes!", tipo: "texto", delay: 500 },
    );
  } else if (perfil.conectividad === "baja") {
    base.push(
      { id: 2, remitente: "bot", contenido: "Lección 3: Componentes de una computadora\n\nUna computadora se compone de hardware (partes físicas: CPU, monitor, teclado, ratón) y software (programas: sistema operativo, aplicaciones).\n\nEl CPU es el 'cerebro' que procesa las instrucciones.", tipo: "texto", delay: 1000 },
      { id: 3, remitente: "bot", contenido: "🖼️ Diagrama simple de componentes (comprimido)", tipo: "imagen", delay: 1500 },
    );
  } else {
    base.push(
      { id: 2, remitente: "bot", contenido: "📚 Lección 3: Componentes de una computadora\n\nUna computadora se compone de hardware y software. El CPU es el cerebro, la RAM es la memoria de trabajo, y el disco duro almacena datos permanentemente.", tipo: "texto", delay: 1000 },
      { id: 3, remitente: "bot", contenido: "🖼️ Diagrama detallado de componentes", tipo: "imagen", delay: 1500 },
      { id: 4, remitente: "bot", contenido: "🎬 Video: 'Ensamblaje de una PC paso a paso' (3 min)", tipo: "video", delay: 1000 },
    );
  }

  return base;
}
