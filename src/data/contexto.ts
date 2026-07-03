export interface Barrera {
  titulo: string;
  dato: string;
  fuente: string;
}

export const barrerasHonduras: Barrera[] = [
  {
    titulo: "Penetración de internet",
    dato: "~39% de la población (61% sin acceso)",
    fuente: "CONATEL 2023",
  },
  {
    titulo: "Conectividad rural",
    dato: "2G/3G predominante; 4G solo en Tegucigalpa, SPS, La Ceiba",
    fuente: "CONATEL 2023",
  },
  {
    titulo: "Infraestructura eléctrica",
    dato: "Intermitente en zonas rurales",
    fuente: "ENEE 2023",
  },
  {
    titulo: "Analfabetismo digital",
    dato: "Estimado en 60%+ en zonas rurales",
    fuente: "PNUD / BID",
  },
  {
    titulo: "Marco legal de accesibilidad",
    dato: "Decreto 282-2013 vigente sin reglamento técnico actualizado",
    fuente: "Congreso Nacional HN",
  },
];

export interface PoblacionObjetivo {
  grupo: string;
  descripcion: string;
  estimacion: string;
}

export const poblacionesObjetivo: PoblacionObjetivo[] = [
  {
    grupo: "Zonas rurales (2G/3G)",
    descripcion: "Estudiantes en áreas con conectividad limitada",
    estimacion: "~4.5 millones de personas",
  },
  {
    grupo: "Discapacidad visual",
    descripcion: "Personas ciegas o con baja visión que prefieren audio",
    estimacion: "~217,000 personas (INE 2022)",
  },
  {
    grupo: "Discapacidad auditiva",
    descripcion: "Personas sordas que requieren contenido subtitulado",
    estimacion: "~146,000 personas (INE 2022)",
  },
  {
    grupo: "Daltonismo",
    descripcion: "Personas con dificultad para distinguir colores",
    estimacion: "~5% de la población masculina",
  },
  {
    grupo: "Trabajadores flexibles",
    descripcion: "Personas que requieren horarios adaptables para estudiar",
    estimacion: "Población económicamente activa: ~4.5 millones",
  },
];
