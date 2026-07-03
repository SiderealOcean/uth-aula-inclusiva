# Plataforma de Educación Inclusiva con Delivery Adaptativo (WhatsApp + Web)

**Proyecto Final Integrador - Inclusión y Accesibilidad Digital**
**Maestría en Ingeniería de la Computación - UTH Honduras**
**Tipo:** B - Plataforma Digital de Servicios Inclusivos
**Fecha:** 2026-07-02

---

## Resumen

Plataforma que permite a organizaciones (ONGs, gobierno, empresas) crear microcursos educativos inclusivos mediante asistencia de IA, y entregarlos a estudiantes vía web o WhatsApp con adaptación automática del formato (texto, imagen, audio, video) según conectividad y discapacidad del usuario. Los estudiantes obtienen certificados digitales al completar.

---

## D1 - Definición del Problema y Contexto Hondureño

**Problema:** En Honduras, el 61% de la población no tiene acceso a internet (CONATEL 2023), el analfabetismo digital supera el 60% en zonas rurales, y no existe una plataforma educativa que adapte contenido según conectividad y discapacidad.

**Población objetivo:**
- Estudiantes en zonas rurales con cobertura 2G/3G
- Personas con discapacidad visual (prefieren audio)
- Personas con discapacidad auditiva (prefieren video subtitulado)
- Personas con daltonismo (imágenes con paleta segura)
- Trabajadores con horarios flexibles que estudian de noche

**Barreras cuantificadas:**
- Penetración internet: ~39% (CONATEL 2023)
- Conectividad rural: 2G/3G predominante; 4G solo en Tegucigalpa, SPS, La Ceiba
- Infraestructura eléctrica intermitente en zonas rurales
- Analfabetismo digital: estimado en 60%+ en zonas rurales (PNUD/BID)
- Marco legal de accesibilidad: Decreto 282-2013 vigente sin reglamento técnico actualizado

**Justificación:** WhatsApp tiene penetración casi universal en Honduras incluso en 2G. Una plataforma que entregue educación adaptativa por WhatsApp + web cierra la brecha de conectividad y accesibilidad simultáneamente.

---

## D2 - Solución Tecnológica

### Artefacto principal: Sitio Web de Presentación Interactiva

**EL sitio web es la presentación del proyecto.** No es un demo del producto real — es el vehículo de presentación que contiene internamente los mockups, las simulaciones y toda la propuesta documentada. El jurado navega el sitio durante la defensa oral (Fase 02).

| Componente | Rol |
|---|---|
| **Sitio web (Next.js + Tailwind)** | Presentación completa con mockups interactivos, simulaciones y documentación |
| **Demo LMS (simulada en código)** | Dashboard, catálogo de cursos, progreso, certificados |
| **Simulación de WhatsApp** | Chat animado que muestra delivery adaptativo de lecciones según perfil |
| **Secciones informativas** | Contexto Honduras, accesibilidad, gobernanza, actores, viabilidad |

### Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Next.js (React + SSR) |
| Estilos | Tailwind CSS |
| Mockups | Código nativo (componentes React simulados) |
| Simulación WhatsApp | JavaScript con animaciones CSS |
| Hosting | Vercel o GitHub Pages |
| Control de versiones | Git + GitHub |

### Alternativas evaluadas

1. **WhatsApp-first (web complementario):** Máximo alcance, pero sin dashboard visual ni experiencia rica. *Descartado por limitar la demostración de capacidades técnicas.*
2. **LMS Web + Bot WhatsApp (seleccionado):** Cubre todos los casos de uso, demuestra las 6 dimensiones del curso.
3. **PWA + WhatsApp notificación:** Offline-first real, pero requiere instalación. *Descartado por barrera de adopción.*

### 3 Flujos de Usuario (obligatorio Tipo B)

**Flujo 1 - Registro y Suscripción**
1. Usuario descubre la plataforma (vía web, WhatsApp o referencia de ONG)
2. Completa perfil en web con accesibilidad guiada: conectividad (baja/media/alta), discapacidad (ninguna/visual/auditiva/daltonismo), idioma preferido
3. También puede registrarse iniciando conversación en WhatsApp: el bot pide datos mínimos (nombre, idioma) y envía enlace al perfil web para completar preferencias de accesibilidad
4. Explora catálogo de cursos (filtrable por categoría, formato disponible, ONG creadora)
5. Se suscribe a uno o más cursos

**Flujo 2 - Recepción de Lección Adaptada por WhatsApp**
1. El sistema envía lección automáticamente según horario preferido
2. Formato adaptado al perfil:
   - Cobertura baja + sin discapacidad → texto + imagen comprimida
   - Cobertura baja + ciego → solo audio
   - Cobertura buena + ciego → audio + texto
   - Cobertura buena + daltonismo → texto + imagen (paleta segura)
   - Cobertura buena + sordo → texto + video subtitulado
   - Cobertura buena + sin discapacidad → texto + imagen + audio + video
3. Usuario consume contenido y responde evaluación corta
4. Progreso registrado automáticamente

**Flujo 3 - Creación de Curso con IA (para ONGs)**
1. Organización se registra y completa perfil
2. Sube "machote" del curso (PDF/DOCX/texto + recursos multimedia)
3. IA procesa y genera automáticamente:
   - Transcripción a audio (TTS)
   - Resumen para bajo ancho de banda
   - Paleta daltónico-safe para imágenes
   - Preguntas de evaluación
   - Metadatos de accesibilidad (alt text, contraste, transcripciones)
4. Organización revisa preview, valida calidad y publica
5. Curso disponible en catálogo

### Viabilidad

**Costos estimados (prototipo):** $0-30/mes usando tiers gratuitos (Vercel, GitHub Pages, Cloudinary).
**Adaptación a conectividad:** WhatsApp funciona en 2G; contenido comprimido según ancho de banda.
**Offline-first:** Contenido descargable para consumo sin conexión.

---

## D3 - Accesibilidad y Diseño Universal

### Criterios WCAG 2.2 a auditar

| Criterio | Nivel | Aplicación en el proyecto |
|---|---|---|
| 1.1.1 Contenido no textual | A | Alt text generado por IA en todas las imágenes |
| 1.4.1 Uso del color | A | Paletas amigables para protanopia, deuteranopia, tritanopia |
| 1.4.3 Contraste mínimo | AA | Ratio 4.5:1 texto normal, 3:1 texto grande |
| 2.3.1 Umbral de 3 destellos | A | Videos sin destellos peligrosos |
| 3.1.1 Idioma de la página | A | Soporte español + idiomas indígenas (garífuna, miskito) |
| 3.3.2 Etiquetas o instrucciones | A | Formularios con etiquetas descriptivas |

### Principios POUR

- **Perceptible:** Contenido disponible en 4 formatos (texto, imagen, audio, video)
- **Operable:** Navegación por teclado + comandos de voz en web
- **Comprensible:** Lenguaje claro, instrucciones consistentes, retroalimentación en cada acción
- **Robusto:** HTML semántico, ARIA labels, compatible con lectores de pantalla

### Evaluación

- Herramienta: axe DevTools + WAVE sobre el sitio desplegado
- Capturas de antes/después de al menos una iteración de mejora
- Tabla de criterios con resultados y acciones tomadas

---

## D4 - Gobernanza y Marco Regulatorio Honduras

### Legislación vigente citada

- **Decreto 282-2013:** Ley de Equidad y Desarrollo Integral para Personas con Discapacidad
- **Decreto 149-2013:** Ley de Firma Electrónica de Honduras (certificados digitales)
- **Convenio ONU Discapacidad (2008):** Ratificado por Honduras, respaldo internacional

### Propuesta regulatoria propia

**"Política de Contenido Educativo Digital Inclusivo"** — Toda organización que reciba fondos públicos o cooperación internacional para educación debe ofrecer sus cursos en al menos 2 formatos complementarios (texto + audio o texto + video subtitulado) como requisito para operar en la plataforma.

### Análisis: facilitadores y obstáculos regulatorios

**Facilita la solución:**
- Decreto 282-2013 obliga al Estado a garantizar accesibilidad en servicios públicos digitales, lo que justifica la adopción de una plataforma como esta en instituciones gubernamentales
- La Ley de Firma Electrónica (149-2013) ya provee el marco para certificados digitales con validez legal, reduciendo la necesidad de nueva legislación

**Obstaculiza la solución:**
- El Decreto 282-2013 carece de reglamento técnico actualizado; sin estándares claros de accesibilidad digital, no hay mecanismo de fiscalización que obligue a las organizaciones a cumplir
- CONATEL no ha emitido resoluciones que prioricen contenido educativo sobre entretenimiento en la gestión de ancho de banda, lo cual afecta la viabilidad de video en zonas rurales
- No existe un marco legal que reconozca certificados emitidos por plataformas privadas como válidos para efectos laborales o académicos

### Instituciones responsables

| Institución | Rol |
|---|---|
| CONATEL | Regulación de conectividad y telecomunicaciones |
| SESAL | Lineamientos de accesibilidad para salud y discapacidad |
| SEPLAN | Planeación estratégica y políticas de inclusión digital |
| UTH / Academia | Validación técnica y pedagógica de contenidos |

---

## D5 - Participación Social y Actores Comunitarios

### Mapa de actores (5 tipos)

| Actor | Rol funcional |
|---|---|
| **Organización (ONG/gobierno/empresa)** | Crea cursos, dona recursos, define políticas de accesibilidad |
| **Educador/Instructor** | Diseña microcontenido, define adaptaciones |
| **Estudiante** | Consume cursos, elige formato, recibe certificado |
| **Administrador de plataforma** | Aprueba cursos, modera contenido, garantiza cumplimiento WCAG |
| **Donante/Patrocinador** | Aporta recursos económicos o infraestructura |

### Modelo de sostenibilidad

- Cuota voluntaria al registrar organización
- ONGs con presupuesto educativo donan para cubrir a estudiantes sin recursos
- La plataforma opera como bien común: código abierto, mantenida por la comunidad
- Voluntarios educadores y prestadores de servicio social contribuyen con creación de contenido

### Barreras de adopción y estrategias

| Barrera | Estrategia |
|---|---|
| Analfabetismo digital 60%+ | Interfaz multimodal (audio como primer canal, no texto) |
| Idiomas indígenas | Soporte para garífuna, miskito, lenca en TTS y texto |
| Desconfianza tecnológica | ONGs locales como puente de confianza y capacitación |
| Costo de datos móviles | Contenido comprimido, descarga en WiFi para consumo offline |

---

## D6 - Estructura de la Presentación (35-40 min)

### Fase 01 - Contexto y Problema [5-7 min]
- Equipo y roles
- Estadísticas de brecha digital en Honduras
- Población objetivo y barreras
- Justificación de la intervención

### Fase 02 - Solución Tecnológica [10-12 min]
- Arquitectura: Web + WhatsApp adaptativo
- Demo en vivo del sitio de presentación
- 3 flujos de usuario demostrados
- Viabilidad técnica y costos

### Fase 03 - Dimensiones de Inclusión [8-10 min]
- Accesibilidad: criterios WCAG, reporte A11y, iteraciones
- Gobernanza: marco legal, propuesta regulatoria
- Participación social: mapa de actores, sostenibilidad

### Fase 04 - Viabilidad y Proyección [5-7 min]
- Impacto esperado y métricas
- Plan de implementación (hitos)
- Riesgos y mitigaciones
- Próximos pasos a producción

### Fase 05 - Cierre y Defensa [5-8 min]
- Síntesis del proyecto
- Defensa técnica ante jurado

---

## Entregables

### E1 - Informe Escrito (entregable futuro)
- PDF, 8-15 págs, APA 7, 8+ referencias (3+ hondureñas)
- Cubre D1-D6 proporcionalmente
- No incluido en el alcance actual

### E3 - Reporte de Accesibilidad (entregable futuro)
- Capturas axe DevTools / WAVE sobre el sitio desplegado
- Tabla WCAG 2.2 con 5+ criterios auditados
- Iteración antes/después documentada
- No incluido en el alcance actual

### E2 + E4 - Sitio Web de Presentación (Artefacto Tecnológico + Diapositivas)
- El sitio web **es** la presentación. Cada sección funciona como una diapositiva dinámica que contiene mockups interactivos, simulaciones y documentación. Sustituye tanto el prototipo navegable (E2) como las diapositivas tradicionales (E4).
- 5 fases de la presentación son navegables como secciones del sitio, con transiciones visuales entre ellas
- Mockups en código: demo LMS + simulación WhatsApp + flujo de creación con IA
- 3 flujos de usuario demostrables
- Desplegado en Vercel/GitHub Pages
- Enlace al repositorio GitHub
- Legibilidad equivalente a fuente 24pt en proyección, contraste WCAG 1.4.3 (AA)

---

## Estructura del Sitio Web de Presentación

```
/ (Landing - Hero + Propósito)
├── /contexto-honduras (Datos INE/CONATEL, barreras)
├── /solucion (Arquitectura, stack, enfoques)
│   ├── /demo-lms (Dashboard simulado, cursos, progreso)
│   ├── /demo-whatsapp (Chat animado con lecciones adaptativas)
│   └── /creacion-cursos (Flujo de IA para ONGs)
├── /accesibilidad (WCAG criterios, reporte A11y, antes/después)
├── /gobernanza (Marco legal, propuesta regulatoria)
├── /actores (Mapa de actores, roles, sostenibilidad)
└── /viabilidad (Costos, riesgos, próximos pasos)
```

## Próximos pasos

1. Aprobación del design spec por el usuario
2. Escribir plan de implementación (writing-plans skill)
3. Construir sitio web de presentación (E2 + E4) con Next.js + Tailwind
4. Desplegar y validar accesibilidad
5. (Futuro) Preparar informe escrito (E1) y reporte de accesibilidad (E3)
