export interface Riesgo {
  categoria: string;
  descripcion: string;
  mitigacion: string;
  decisionLean: string;
}

export const riesgos: Riesgo[] = [
  {
    categoria: "Técnico",
    descripcion: "Meta puede bloquear cuentas de prueba de WhatsApp Cloud API",
    mitigacion:
      "Alternativa con SMS o web como canal de respaldo para delivery de contenido",
    decisionLean:
      "Pivotar temporalmente a web ligera o SMS si WhatsApp retrasa el piloto.",
  },
  {
    categoria: "Técnico",
    descripcion: "Videos pesados consumen datos en zonas de baja cobertura",
    mitigacion:
      "Compresión automática con Cloudinary y calidad adaptativa según ancho de banda",
    decisionLean:
      "Priorizar texto, audio y microimagenes si el consumo de datos reduce finalización.",
  },
  {
    categoria: "Social",
    descripcion: "Desconfianza tecnológica en comunidades rurales",
    mitigacion:
      "ONGs locales como puente de confianza y capacitación presencial inicial",
    decisionLean:
      "Aumentar acompañamiento comunitario si la adopción inicial es menor al umbral.",
  },
  {
    categoria: "Regulatorio",
    descripcion: "Certificados digitales no reconocidos para efectos laborales",
    mitigacion:
      "Alianza con UTH y Secretaría de Educación para validación institucional",
    decisionLean:
      "Validar primero constancias de participación antes de prometer certificación formal.",
  },
];

export const hipotesisImpacto = [
  {
    indicador: "Adopción piloto",
    valor: "60%+",
    aprendizaje: "Estudiantes inscritos que completan la primera microlección adaptada.",
  },
  {
    indicador: "Accesibilidad útil",
    valor: "4/5",
    aprendizaje: "Satisfacción mínima de usuarios con audio, texto o video subtitulado.",
  },
  {
    indicador: "Viabilidad operativa",
    valor: "3 ONGs",
    aprendizaje: "Organizaciones capaces de subir machotes y validar contenido sin soporte intensivo.",
  },
  {
    indicador: "Escalamiento validado",
    valor: "80%+",
    aprendizaje: "Lecciones entregadas exitosamente en conectividad limitada o intermitente.",
  },
];

export const etapasLeanStartup = [
  {
    fase: "01",
    ciclo: "Descubrir",
    objetivo: "Validar que la barrera principal sea conectividad, accesibilidad o alfabetización digital.",
    experimento:
      "Entrevistas con estudiantes rurales, docentes y 1-3 ONGs hondureñas usando el prototipo como material de conversación.",
    actores: "Estudiantes, ONGs locales, docentes, UTH",
    dependencias: "Acceso a comunidades piloto y validación ética/institucional básica.",
    metricaDecision:
      "Al menos 70% de entrevistados reconoce el problema y acepta probar una lección adaptada.",
  },
  {
    fase: "02",
    ciclo: "Construir",
    objetivo: "Crear un MVP mínimo: catálogo, perfil de accesibilidad y una lección adaptativa medible.",
    experimento:
      "Publicar un curso corto con entrega por web y flujo WhatsApp básico o simulado para comparar formatos.",
    actores: "Equipo técnico, ONG creadora de contenido, educador revisor",
    dependencias: "Hosting, WhatsApp Cloud API o canal alterno, contenido piloto y criterios WCAG.",
    metricaDecision:
      "MVP funcional con al menos 1 curso, 3 perfiles de accesibilidad y registro de progreso.",
  },
  {
    fase: "03",
    ciclo: "Medir",
    objetivo: "Probar adopción, finalización y utilidad real de los formatos adaptados.",
    experimento:
      "Piloto controlado con 30-50 estudiantes y seguimiento de finalización, abandono, formato usado y satisfacción.",
    actores: "ONGs, estudiantes piloto, facilitadores comunitarios, academia",
    dependencias: "Datos de uso, consentimiento, soporte comunitario y conectividad mínima.",
    metricaDecision:
      "60%+ completa la primera lección y 4/5 reporta que el formato recibido fue útil.",
  },
  {
    fase: "04",
    ciclo: "Aprender y escalar",
    objetivo: "Decidir si se persevera, se itera o se pivota antes de expandir departamentos.",
    experimento:
      "Ajustar canal, formato, capacitación o modelo de contenido según evidencia del piloto.",
    actores: "UTH, ONGs aliadas, Secretaría de Educación, CONATEL, donantes",
    dependencias: "Validación regulatoria, costos operativos, soporte técnico y sostenibilidad social.",
    metricaDecision:
      "Escalar solo si retención, accesibilidad y operación alcanzan los umbrales definidos.",
  },
];

export const proximosPasosPiloto = [
  {
    paso: "Cerrar alianza piloto",
    resultado: "Seleccionar 1-3 organizaciones con comunidades objetivo y contenido educativo inicial.",
  },
  {
    paso: "Implementar backend mínimo",
    resultado: "Registrar perfiles, progreso, cursos y evidencias de uso para medición real.",
  },
  {
    paso: "Integrar canal real",
    resultado: "Conectar WhatsApp Cloud API o activar canal alterno de bajo consumo si Meta limita pruebas.",
  },
  {
    paso: "Validar accesibilidad",
    resultado: "Auditar WCAG 2.2, probar lectores de pantalla y revisar contenido con usuarios reales.",
  },
  {
    paso: "Definir decisión de escala",
    resultado: "Perseverar, iterar o pivotar según métricas de adopción, retención y operación.",
  },
];
