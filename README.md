# Aula Inclusiva HN

**Proyecto Final Integrador**  
**Clase:** DESARROLLO DE TECNOLOGIAS DIGITALES INCLUSIVAS  
**Programa:** Maestría en Ingeniería de la Computación  
**Universidad:** Universidad Tecnológica de Honduras (UTH)  
**Catedrático:** Adrián Hernández Rivas

## Resumen

**Aula Inclusiva HN** es una propuesta tecno-social para reducir la brecha de acceso a educación digital en Honduras. El proyecto plantea una plataforma educativa inclusiva que combina un LMS web con entrega adaptativa de contenido por WhatsApp.

La solución está diseñada para usuarios con baja conectividad, estudiantes de zonas rurales, personas con discapacidad visual o auditiva, personas con daltonismo y trabajadores que necesitan estudiar en horarios flexibles. El sistema adapta el formato del contenido educativo según el perfil del estudiante: texto, imagen comprimida, audio, video subtitulado o combinaciones accesibles.

Este repositorio contiene el prototipo funcional, el informe escrito, el reporte de accesibilidad y la presentación web del Proyecto Final Integrador.

## Problema Que Atiende

La educación digital en Honduras enfrenta barreras estructurales que limitan la inclusión real:

| Barrera | Impacto educativo | Respuesta del proyecto |
| --- | --- | --- |
| Baja conectividad rural | Dificulta el uso de plataformas LMS tradicionales | Entrega por WhatsApp y contenido liviano |
| Internet limitado | Gran parte de la población no tiene acceso estable | Diseño optimizado para 2G/3G y bajo consumo de datos |
| Discapacidad visual | El contenido visual excluye a usuarios ciegos o con baja visión | Audio, texto estructurado y compatibilidad con tecnologías asistivas |
| Discapacidad auditiva | El contenido sonoro sin alternativa excluye a personas sordas | Texto, subtítulos y formatos equivalentes |
| Analfabetismo digital | Plataformas complejas reducen la adopción | Flujos simples, lenguaje claro y acompañamiento comunitario |
| Marco técnico incompleto | Honduras tiene legislación general, pero no lineamientos digitales detallados | Propuesta de gobernanza y política de contenido educativo inclusivo |

## Solución Propuesta

La arquitectura seleccionada es **LMS Web + Bot WhatsApp**.

El LMS permite registrar estudiantes, administrar cursos, mostrar progreso, emitir certificados y facilitar la gestión de contenido por parte de organizaciones. WhatsApp funciona como canal de entrega adaptativa porque es familiar, ligero y viable en zonas con conectividad limitada.

### Flujo Principal

1. Una organización sube un documento base del curso, llamado machote.
2. El sistema genera versiones adaptadas del contenido: resumen liviano, audio, texto, imagen optimizada, video subtitulado y evaluaciones cortas.
3. El estudiante configura su perfil de accesibilidad y conectividad.
4. El sistema entrega cada lección en el formato más adecuado por web o WhatsApp.
5. El avance del estudiante se registra en el LMS.
6. Al finalizar, el estudiante puede recibir una certificación digital.

### Reglas De Adaptación

| Perfil | Formato recomendado |
| --- | --- |
| Baja conectividad, sin discapacidad | Texto e imagen comprimida |
| Baja conectividad, discapacidad visual | Audio |
| Buena conectividad, discapacidad visual | Audio y texto |
| Buena conectividad, daltonismo | Texto e imagen con paleta segura |
| Buena conectividad, discapacidad auditiva | Texto y video subtitulado |
| Buena conectividad, sin discapacidad | Texto, imagen, audio y video |

## Objetivos Del Proyecto

1. Diseñar una solución tecnológica viable para educación digital inclusiva en Honduras.
2. Integrar criterios de accesibilidad WCAG 2.2 y principios POUR.
3. Proponer un modelo de gobernanza alineado con el contexto hondureño.
4. Identificar actores sociales necesarios para sostener la solución.
5. Construir un prototipo funcional que pueda presentarse y evaluarse académicamente.

## Entregables Del Proyecto

| Entregable | Ruta | Descripción |
| --- | --- | --- |
| E1 | `/informe` | Informe escrito del Proyecto Final Integrador |
| E2 | `/` | Prototipo funcional y presentación interactiva |
| E3 | `/reporte-accesibilidad` | Reporte de accesibilidad con evidencia y resultados axe |
| E4 | `/` | Presentación estructurada en fases para defensa oral |

## Estructura Del Sitio

| Ruta | Propósito |
| --- | --- |
| `/` | Página principal con la presentación del proyecto en fases |
| `/informe` | Informe E1 con diagnóstico, solución, accesibilidad, gobernanza, actores y conclusiones |
| `/reporte-accesibilidad` | Reporte E3 con metodología, resultados axe, evaluación WCAG y evidencias visuales |
| `/audit/lms` | Página interna usada para auditar el componente LMS con axe-core |
| `/audit/whatsapp` | Página interna usada para representar el flujo de entrega adaptativa por WhatsApp |

## Stack Tecnológico

| Capa | Tecnología | Uso en el proyecto |
| --- | --- | --- |
| Framework | Next.js 14 | Aplicación web con App Router |
| UI | React 18 | Componentes interactivos del prototipo |
| Lenguaje | TypeScript | Tipado de datos, componentes y contenido estructurado |
| Estilos | Tailwind CSS | Diseño responsivo, consistente y accesible |
| Accesibilidad | axe-core + Playwright | Auditoría automatizada y evidencia técnica |
| Reportes | docx | Generación de documento Word del reporte |
| Canal propuesto | WhatsApp Cloud API | Entrega adaptativa de contenido educativo |
| IA propuesta | OpenAI API / Claude API | Generación de versiones accesibles del contenido |
| Multimedia propuesta | Cloudinary | Optimización de imágenes, audio y video |

## Estructura Del Repositorio

```text
src/
  app/
    page.tsx                       # Presentación principal
    informe/page.tsx               # Informe E1
    reporte-accesibilidad/page.tsx # Reporte E3
    audit/lms/page.tsx             # Página para auditoría LMS
    audit/whatsapp/page.tsx        # Página para auditoría del flujo WhatsApp
  components/
    layout/                        # Header y estructura base
    sections/                      # Secciones principales de la presentación
    ui/                            # Componentes reutilizables
  data/                            # Contenido académico estructurado
public/
  audits/                          # Resultados JSON y capturas de auditoría
scripts/
  audit-a11y.mjs                   # Script de auditoría con axe-core y Playwright
```

## Instalación Local

### Requisitos

- Node.js 18 o superior
- npm 9 o superior
- Git

### Clonar El Repositorio

```bash
git clone https://github.com/SiderealOcean/uth-aula-inclusiva.git
cd uth-aula-inclusiva
```

### Instalar Dependencias

```bash
npm install
```

### Ejecutar En Desarrollo

```bash
npm run dev
```

Luego abrir:

```text
http://localhost:3000
```

### Construir Para Producción

```bash
npm run build
npm run start
```

## Auditoría De Accesibilidad

El proyecto incluye un script para ejecutar auditorías con axe-core y Playwright sobre las páginas internas de evaluación.

Primero se debe levantar la aplicación localmente:

```bash
npm run dev
```

En otra terminal, ejecutar:

```bash
npm run audit:a11y
```

Los resultados se guardan en:

```text
public/audits/
```

El reporte visible se consulta en:

```text
http://localhost:3000/reporte-accesibilidad
```

## Alcance Del Prototipo

Este proyecto es un prototipo académico funcional. Implementa la experiencia web, la presentación del concepto, simulaciones de LMS, simulaciones de entrega por WhatsApp, estructura de informe y reporte de accesibilidad.

Las integraciones reales con WhatsApp Cloud API, servicios de IA, backend persistente, autenticación y almacenamiento multimedia se presentan como parte de la arquitectura propuesta y de la viabilidad del MVP, pero no forman parte de esta versión local del prototipo.

## Dimensiones Académicas Cubiertas

| Dimensión | Contenido |
| --- | --- |
| D1 | Definición del problema y contexto hondureño |
| D2 | Solución tecnológica y viabilidad |
| D3 | Accesibilidad y diseño universal |
| D4 | Gobernanza y marco regulatorio de Honduras |
| D5 | Participación social y actores comunitarios |
| D6 | Presentación y defensa oral |

## Referencia Rápida Para Evaluación

Para revisar el proyecto localmente, el orden sugerido es:

1. Abrir `/` para entender la propuesta general.
2. Revisar `/informe` para leer el desarrollo académico completo.
3. Revisar `/reporte-accesibilidad` para validar la metodología WCAG, resultados axe y evidencias.
4. Explorar las secciones de LMS, WhatsApp y creación con IA dentro de la página principal.

## Autoría

Proyecto desarrollado como entrega académica para la clase **DESARROLLO DE TECNOLOGIAS DIGITALES INCLUSIVAS** de la Maestría en Ingeniería de la Computación, Universidad Tecnológica de Honduras.
