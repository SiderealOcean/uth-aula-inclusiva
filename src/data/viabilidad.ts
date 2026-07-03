export interface Riesgo {
  categoria: string;
  descripcion: string;
  mitigacion: string;
}

export const riesgos: Riesgo[] = [
  {
    categoria: "Técnico",
    descripcion: "Meta puede bloquear cuentas de prueba de WhatsApp Cloud API",
    mitigacion:
      "Alternativa con SMS o web como canal de respaldo para delivery de contenido",
  },
  {
    categoria: "Técnico",
    descripcion: "Videos pesados consumen datos en zonas de baja cobertura",
    mitigacion:
      "Compresión automática con Cloudinary y calidad adaptativa según ancho de banda",
  },
  {
    categoria: "Social",
    descripcion: "Desconfianza tecnológica en comunidades rurales",
    mitigacion:
      "ONGs locales como puente de confianza y capacitación presencial inicial",
  },
  {
    categoria: "Regulatorio",
    descripcion: "Certificados digitales no reconocidos para efectos laborales",
    mitigacion:
      "Alianza con UTH y Secretaría de Educación para validación institucional",
  },
];

export const metricasImpacto = [
  { indicador: "Beneficiarios directos ( año 1)", valor: "10,000+" },
  { indicador: "ONGs creadoras de contenido", valor: "15+" },
  { indicador: "Cursos disponibles", valor: "50+" },
  { indicador: "Cobertura geográfica", valor: "18 departamentos" },
];

export const hitosPlan = [
  "Mes 1-3: Desarrollo del MVP (web + WhatsApp bot básico)",
  "Mes 3: Piloto con 3 ONGs en Francisco Morazán",
  "Mes 6: Expansión a Cortés y Atlántida",
  "Mes 9: Soporte de idiomas indígenas (garífuna, miskito)",
  "Mes 12: 10,000 estudiantes activos, 50 cursos publicados",
];
