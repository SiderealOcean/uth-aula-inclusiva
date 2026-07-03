export interface CriterioWCAG {
  codigo: string;
  nombre: string;
  nivel: "A" | "AA" | "AAA";
  aplicacion: string;
  estado: "planificado" | "implementado";
}

export const criteriosWCAG: CriterioWCAG[] = [
  {
    codigo: "1.1.1",
    nombre: "Contenido no textual",
    nivel: "A",
    aplicacion: "Alt text generado por IA en todas las imágenes del curso",
    estado: "planificado",
  },
  {
    codigo: "1.4.1",
    nombre: "Uso del color",
    nivel: "A",
    aplicacion:
      "Paletas amigables para protanopia, deuteranopia y tritanopia",
    estado: "planificado",
  },
  {
    codigo: "1.4.3",
    nombre: "Contraste mínimo",
    nivel: "AA",
    aplicacion:
      "Ratio 4.5:1 en texto normal, 3:1 en texto grande, verificado en toda la plataforma",
    estado: "planificado",
  },
  {
    codigo: "2.3.1",
    nombre: "Umbral de 3 destellos",
    nivel: "A",
    aplicacion: "Videos educativos sin destellos peligrosos ni parpadeos",
    estado: "planificado",
  },
  {
    codigo: "3.1.1",
    nombre: "Idioma de la página",
    nivel: "A",
    aplicacion:
      "Soporte español + idiomas indígenas (garífuna, miskito) en TTS y texto",
    estado: "planificado",
  },
  {
    codigo: "3.3.2",
    nombre: "Etiquetas o instrucciones",
    nivel: "A",
    aplicacion: "Formularios con etiquetas descriptivas y ARIA labels",
    estado: "planificado",
  },
];

export const principiosPOUR = [
  {
    principio: "Perceptible",
    descripcion:
      "Contenido disponible en 4 formatos: texto, imagen, audio y video. El usuario recibe el formato que puede percibir según su discapacidad.",
  },
  {
    principio: "Operable",
    descripcion:
      "Navegación por teclado, comandos de voz en web, y navegación por mensajes de texto en WhatsApp. Sin dependencia de mouse o pantalla táctil.",
  },
  {
    principio: "Comprensible",
    descripcion:
      "Lenguaje claro y directo, instrucciones consistentes, retroalimentación inmediata en cada acción del usuario.",
  },
  {
    principio: "Robusto",
    descripcion:
      "HTML semántico, ARIA labels, compatible con lectores de pantalla (NVDA, VoiceOver, TalkBack).",
  },
];
