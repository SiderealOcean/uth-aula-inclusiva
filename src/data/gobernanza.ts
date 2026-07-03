export interface Ley {
  nombre: string;
  decreto: string;
  ano: string;
  relevancia: string;
}

export const legislacion: Ley[] = [
  {
    nombre: "Ley de Equidad y Desarrollo Integral para Personas con Discapacidad",
    decreto: "Decreto 282-2013",
    ano: "2013",
    relevancia:
      "Obliga al Estado a garantizar accesibilidad en servicios públicos. Justifica legalmente que nuestra plataforma sea accesible por defecto.",
  },
  {
    nombre: "Ley de Firma Electrónica de Honduras",
    decreto: "Decreto 149-2013",
    ano: "2013",
    relevancia:
      "Provee marco legal para certificados digitales con validez jurídica, aplicable a los certificados de finalización de curso de la plataforma.",
  },
  {
    nombre: "Convenio ONU sobre Derechos de Personas con Discapacidad",
    decreto: "Ratificado por Honduras",
    ano: "2008",
    relevancia:
      "Respaldo internacional que exige accesibilidad en tecnologías de la información y comunicación.",
  },
];

export interface FacilitadorObstaculo {
  tipo: "facilita" | "obstaculiza";
  descripcion: string;
}

export const analisisRegulatorio: FacilitadorObstaculo[] = [
  {
    tipo: "facilita",
    descripcion:
      "Decreto 282-2013 obliga al Estado a garantizar accesibilidad en servicios públicos digitales, lo que justifica la adopción de la plataforma en instituciones gubernamentales.",
  },
  {
    tipo: "facilita",
    descripcion:
      "La Ley de Firma Electrónica (149-2013) ya provee el marco para certificados digitales con validez legal, reduciendo la necesidad de nueva legislación.",
  },
  {
    tipo: "obstaculiza",
    descripcion:
      "El Decreto 282-2013 carece de reglamento técnico actualizado; sin estándares claros de accesibilidad digital, no hay mecanismo de fiscalización que obligue a las organizaciones a cumplir.",
  },
  {
    tipo: "obstaculiza",
    descripcion:
      "CONATEL no ha emitido resoluciones que prioricen contenido educativo sobre entretenimiento en la gestión de ancho de banda, afectando la viabilidad de video en zonas rurales.",
  },
  {
    tipo: "obstaculiza",
    descripcion:
      "No existe un marco legal que reconozca certificados emitidos por plataformas privadas como válidos para efectos laborales o académicos en Honduras.",
  },
];

export interface Institucion {
  siglas: string;
  nombre: string;
  rol: string;
}

export const instituciones: Institucion[] = [
  {
    siglas: "CONATEL",
    nombre: "Comisión Nacional de Telecomunicaciones",
    rol: "Regulación de conectividad y telecomunicaciones",
  },
  {
    siglas: "SESAL",
    nombre: "Secretaría de Salud",
    rol: "Lineamientos de accesibilidad para salud y discapacidad",
  },
  {
    siglas: "SEPLAN",
    nombre: "Secretaría de Planificación Estratégica",
    rol: "Planeación estratégica y políticas de inclusión digital",
  },
  {
    siglas: "UTH",
    nombre: "Universidad Tecnológica de Honduras",
    rol: "Validación técnica y pedagógica de contenidos",
  },
];

export const propuestaRegulatoria =
  "Política de Contenido Educativo Digital Inclusivo: toda organización que reciba fondos públicos o cooperación internacional para educación debe ofrecer sus cursos en al menos 2 formatos complementarios (texto + audio o texto + video subtitulado) como requisito para operar en la plataforma.";
