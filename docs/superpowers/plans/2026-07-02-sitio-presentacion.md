# Sitio Web de Presentación - Plataforma de Educación Inclusiva

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un sitio web de presentación interactiva (Next.js + Tailwind) que funciona como diapositivas dinámicas con mockups en código de un LMS inclusivo, simulación de WhatsApp y documentación de las 6 dimensiones del proyecto final.

**Architecture:** Single Page Application con secciones navegables correspondientes a las 5 fases de la presentación. Cada sección es una "diapositiva dinámica" con mockups interactivos (LMS Dashboard, Simulación WhatsApp, flujo de creación con IA). Datos estáticos en archivos TypeScript. Componentes UI reutilizables (StatCard, ActorCard, etc.). Deploy en Vercel.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, ESLint

## Global Constraints

- El sitio DEBE ser navegable secuencialmente como diapositivas (las 5 fases deben ser distinguibles)
- Mockups en código React, no enlaces externos a Figma/Penpot
- 3 flujos de usuario demostrables: registro, recepción de lección adaptada, creación de curso con IA
- Contraste suficiente WCAG 1.4.3 (AA): ratio 4.5:1 texto normal, 3:1 texto grande
- Legibilidad equivalente a fuente 24pt en proyección
- Todos los textos en español
- HTML semántico con ARIA labels donde aplique
- Deploy en Vercel (plan gratuito)

---

## File Structure (final)

```
proyecto_final/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── PhaseIndicator.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ContextoSection.tsx
│   │   │   ├── SolucionSection.tsx
│   │   │   ├── DemoLMSSection.tsx
│   │   │   ├── DemoWhatsAppSection.tsx
│   │   │   ├── CreacionIASection.tsx
│   │   │   ├── AccesibilidadSection.tsx
│   │   │   ├── GobernanzaSection.tsx
│   │   │   ├── ActoresSection.tsx
│   │   │   ├── ViabilidadSection.tsx
│   │   │   └── CierreSection.tsx
│   │   └── ui/
│   │       ├── WhatsAppSimulator.tsx
│   │       ├── LMSDashboard.tsx
│   │       ├── StatCard.tsx
│   │       ├── ActorCard.tsx
│   │       ├── WcagTable.tsx
│   │       ├── CourseCard.tsx
│   │       └── AdaptabilityDemo.tsx
│   └── data/
│       ├── contexto.ts
│       ├── actores.ts
│       ├── wcag.ts
│       ├── tecnologia.ts
│       ├── gobernanza.ts
│       ├── viabilidad.ts
│       └── whatsapp-demo.ts
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

### Task 1: Scaffold del proyecto Next.js + Tailwind

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `postcss.config.js`

**Interfaces:**
- Consumes: nada
- Produces: proyecto base funcional con `npm run dev` corriendo en localhost:3000

- [ ] **Step 1: Crear proyecto Next.js con Tailwind**

```bash
npx create-next-app@14 proyecto_final --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

Workdir: `/home/hguerra/uth/`

- [ ] **Step 2: Verificar que compila y corre**

```bash
npm run build
```

Expected: compilación exitosa sin errores.

- [ ] **Step 3: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js 14 + Tailwind + TypeScript"
```

---

### Task 2: Layout base accesible y tema global

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Consumes: scaffold base del proyecto (Task 1)
- Produces: layout raíz con lang="es", metadatos, fuentes responsivas (min 24pt equivalente), variables de color con contraste WCAG AA

- [ ] **Step 1: Configurar tema Tailwind con colores accesibles**

Agregar colores personalizados en `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#1e40af",
          700: "#1e3a8a",
          900: "#172554",
        },
        surface: {
          light: "#ffffff",
          dark: "#0f172a",
        },
      },
      fontSize: {
        "pres-title": ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        "pres-subtitle": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        "pres-body": ["1.25rem", { lineHeight: "1.75rem" }],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Crear layout raíz accesible**

Reemplazar contenido de `src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aula Inclusiva HN - Plataforma de Educación Digital Adaptativa",
  description:
    "Propuesta de plataforma educativa inclusiva con delivery adaptativo vía WhatsApp y web para Honduras. Proyecto Final Integrador - UTH.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-surface-light text-gray-900 antialiased">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-brand-500 focus:text-white focus:px-4 focus:py-2 focus:z-50"
        >
          Saltar al contenido principal
        </a>
        <main id="contenido-principal">{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Configurar globals.css con variables de accesibilidad**

Reemplazar contenido de `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-text: #0f172a;
    --color-bg: #ffffff;
    --color-primary: #1e40af;
  }

  *:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

- [ ] **Step 4: Verificar build**

```bash
npm run build
```

Expected: compilación exitosa.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: layout accesible con tema Tailwind y colores WCAG AA"
```

---

### Task 3: Datos estáticos - contexto, actores, WCAG, tecnología

**Files:**
- Create: `src/data/contexto.ts`
- Create: `src/data/actores.ts`
- Create: `src/data/wcag.ts`
- Create: `src/data/tecnologia.ts`
- Create: `src/data/gobernanza.ts`
- Create: `src/data/viabilidad.ts`
- Create: `src/data/whatsapp-demo.ts`

**Interfaces:**
- Consumes: layout base (Task 2)
- Produce: datasets tipados exportados para consumo de componentes

- [ ] **Step 1: Crear archivo de datos de contexto**

```typescript
// src/data/contexto.ts

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
```

- [ ] **Step 2: Crear archivo de actores**

```typescript
// src/data/actores.ts

export interface Actor {
  nombre: string;
  categoria: string;
  rol: string;
  responsabilidades: string[];
  icono: string; // emoji como placeholder
}

export const actores: Actor[] = [
  {
    nombre: "Organización (ONG/Gobierno/Empresa)",
    categoria: "Creador de contenido",
    rol: "Crea cursos, dona recursos, define políticas de accesibilidad",
    responsabilidades: [
      "Subir machote de contenido educativo",
      "Validar calidad del contenido generado por IA",
      "Donar recursos para sostenibilidad",
      "Asegurar cumplimiento de políticas de accesibilidad",
    ],
    icono: "🏛️",
  },
  {
    nombre: "Educador / Instructor",
    categoria: "Diseñador pedagógico",
    rol: "Diseña microcontenido, define adaptaciones y evaluaciones",
    responsabilidades: [
      "Estructurar el machote del curso",
      "Definir objetivos de aprendizaje",
      "Revisar evaluaciones generadas por IA",
      "Recomendar formatos de entrega",
    ],
    icono: "👩‍🏫",
  },
  {
    nombre: "Estudiante",
    categoria: "Usuario final",
    rol: "Consume cursos, elige formato, recibe certificado digital",
    responsabilidades: [
      "Configurar perfil de accesibilidad",
      "Consumir contenido en el formato preferido",
      "Completar evaluaciones",
      "Descargar certificado al finalizar",
    ],
    icono: "🎓",
  },
  {
    nombre: "Administrador de plataforma",
    categoria: "Gestor técnico",
    rol: "Aprueba cursos, modera contenido, garantiza WCAG",
    responsabilidades: [
      "Revisar cursos antes de publicación",
      "Verificar cumplimiento WCAG 2.2",
      "Gestionar donaciones y recursos",
      "Mantener infraestructura técnica",
    ],
    icono: "⚙️",
  },
  {
    nombre: "Donante / Patrocinador",
    categoria: "Financiador",
    rol: "Aporta recursos económicos o infraestructura",
    responsabilidades: [
      "Financiar hosting y API WhatsApp",
      "Patrocinar becas de conectividad",
      "Donar equipos para zonas rurales",
    ],
    icono: "🤝",
  },
];
```

- [ ] **Step 3: Crear archivo de criterios WCAG**

```typescript
// src/data/wcag.ts

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
```

- [ ] **Step 4: Crear archivo de tecnología y solución**

```typescript
// src/data/tecnologia.ts

export interface ComponenteStack {
  capa: string;
  tecnologia: string;
  justificacion: string;
}

export const stackTecnologico: ComponenteStack[] = [
  {
    capa: "Framework",
    tecnologia: "Next.js 14",
    justificacion: "React + SSR, rápido, desplegable gratis en Vercel",
  },
  {
    capa: "Estilos",
    tecnologia: "Tailwind CSS",
    justificacion: "Utilidades atómicas, fácil mantener consistencia visual",
  },
  {
    capa: "Bot WhatsApp",
    tecnologia: "WhatsApp Cloud API (Meta)",
    justificacion: "Estándar real, funciona en 2G, penetración casi universal en HN",
  },
  {
    capa: "IA Generación",
    tecnologia: "OpenAI API / Claude API",
    justificacion: "Genera TTS, transcripciones, resúmenes automáticos desde machote",
  },
  {
    capa: "Almacenamiento",
    tecnologia: "Cloudinary",
    justificacion: "Compresión automática de imágenes y video, tier gratuito generoso",
  },
  {
    capa: "Hosting",
    tecnologia: "Vercel + Railway",
    justificacion: "Vercel para frontend (gratis), Railway para backend (gratis hasta $5/mes)",
  },
];

export interface EnfoqueEvaluado {
  nombre: string;
  descripcion: string;
  pros: string[];
  contras: string[];
  seleccionado: boolean;
}

export const enfoques: EnfoqueEvaluado[] = [
  {
    nombre: "WhatsApp-first (web complementario)",
    descripcion: "WhatsApp como canal principal, web solo para registro.",
    pros: ["Máximo alcance (funciona en 2G)", "Mínima fricción de adopción"],
    contras: [
      "Sin dashboard visual ni control de progreso",
      "Multimedia limitado en WhatsApp",
    ],
    seleccionado: false,
  },
  {
    nombre: "LMS Web + Bot WhatsApp (SELECCIONADO)",
    descripcion: "Plataforma web completa para gestión + WhatsApp como canal de delivery.",
    pros: [
      "Experiencia completa en ambos canales",
      "Cubre todos los casos de uso (discapacidad + conectividad)",
      "Certificados digitales con validez",
    ],
    contras: ["Mayor complejidad técnica"],
    seleccionado: true,
  },
  {
    nombre: "PWA + WhatsApp notificación",
    descripcion: "PWA instalable offline + WhatsApp solo para notificaciones.",
    pros: ["Offline-first real", "Experiencias multimedia ricas"],
    contras: ["Requiere instalación de PWA", "Menor alcance inicial"],
    seleccionado: false,
  },
];

export interface FlujoUsuario {
  titulo: string;
  pasos: string[];
}

export const flujosUsuario: FlujoUsuario[] = [
  {
    titulo: "Registro y Suscripción",
    pasos: [
      "Usuario descubre la plataforma (web, WhatsApp o referencia de ONG)",
      "Completa perfil en web con accesibilidad guiada: conectividad, discapacidad, idioma",
      "También puede iniciar en WhatsApp: bot pide nombre e idioma y envía enlace al perfil web",
      "Explora catálogo de cursos filtrable por categoría y formato",
      "Se suscribe a uno o más cursos",
    ],
  },
  {
    titulo: "Recepción de Lección Adaptada por WhatsApp",
    pasos: [
      "Sistema envía lección automáticamente según horario preferido",
      "Formato adaptado al perfil del usuario (texto, imagen, audio o video)",
      "Usuario consume contenido y responde evaluación corta",
      "Progreso registrado automáticamente en el LMS",
    ],
  },
  {
    titulo: "Creación de Curso con IA (ONGs)",
    pasos: [
      "Organización se registra y completa perfil",
      "Sube 'machote' del curso (PDF/DOCX/texto + recursos multimedia)",
      "IA genera: audio TTS, resumen para bajo ancho de banda, paleta daltónico-safe, evaluaciones",
      "Organización revisa preview, valida calidad y publica",
      "Curso disponible en catálogo",
    ],
  },
];

export const archivoReglasAdaptacion = `
Cobertura baja + sin discapacidad  → texto + imagen comprimida
Cobertura baja + ciego             → solo audio
Cobertura buena + ciego            → audio + texto
Cobertura buena + daltonismo       → texto + imagen (paleta segura)
Cobertura buena + sordo            → texto + video subtitulado
Cobertura buena + sin discapacidad → texto + imagen + audio + video
`;

export const costosEstimados = [
  { item: "Vercel (hosting frontend)", costo: "$0/mes", nota: "Tier gratuito" },
  { item: "Railway (backend)", costo: "$0/mes", nota: "Tier gratuito hasta $5" },
  { item: "Cloudinary (media)", costo: "$0/mes", nota: "25 GB almacenamiento gratis" },
  { item: "WhatsApp Cloud API", costo: "$0/mes", nota: "1000 conversaciones gratis/mes" },
  { item: "Total estimado (MVP)", costo: "$0/mes", nota: "En tiers gratuitos" },
];
```

- [ ] **Step 5: Crear archivo de gobernanza**

```typescript
// src/data/gobernanza.ts

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
```

- [ ] **Step 6: Crear archivo de viabilidad**

```typescript
// src/data/viabilidad.ts

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
```

- [ ] **Step 7: Crear archivo de simulación WhatsApp**

```typescript
// src/data/whatsapp-demo.ts

export interface MensajeWhatsApp {
  id: number;
  remitente: "bot" | "usuario";
  contenido: string;
  tipo: "texto" | "imagen" | "audio" | "video";
  delay: number; // ms de delay para animación
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
```

- [ ] **Step 8: Verificar compilación TypeScript**

```bash
npx tsc --noEmit
```

Expected: sin errores.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: datos estáticos - contexto, actores, WCAG, tecnología, gobernanza, viabilidad, WhatsApp demo"
```

---

### Task 4: Componentes UI reutilizables

**Files:**
- Create: `src/components/ui/StatCard.tsx`
- Create: `src/components/ui/ActorCard.tsx`
- Create: `src/components/ui/WcagTable.tsx`
- Create: `src/components/ui/CourseCard.tsx`

**Interfaces:**
- Consumes: tipos de datos de Task 3
- Produce: componentes UI con props tipadas y estados de hover/focus accesibles

- [ ] **Step 1: Crear StatCard**

```typescript
// src/components/ui/StatCard.tsx

interface StatCardProps {
  titulo: string;
  dato: string;
  fuente: string;
}

export default function StatCard({ titulo, dato, fuente }: StatCardProps) {
  return (
    <article
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      aria-label={`${titulo}: ${dato}`}
    >
      <h3 className="text-pres-subtitle text-brand-700 mb-2">{titulo}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-1">{dato}</p>
      <p className="text-sm text-gray-500">Fuente: {fuente}</p>
    </article>
  );
}
```

- [ ] **Step 2: Crear ActorCard**

```typescript
// src/components/ui/ActorCard.tsx

interface ActorCardProps {
  nombre: string;
  rol: string;
  responsabilidades: string[];
  icono: string;
}

export default function ActorCard({
  nombre,
  rol,
  responsabilidades,
  icono,
}: ActorCardProps) {
  return (
    <article
      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
      aria-label={`Actor: ${nombre}`}
    >
      <div className="text-4xl mb-3" aria-hidden="true">
        {icono}
      </div>
      <h3 className="text-pres-subtitle text-brand-700 mb-1">{nombre}</h3>
      <p className="text-sm text-gray-600 mb-3 font-medium">{rol}</p>
      <ul className="space-y-1">
        {responsabilidades.map((r, i) => (
          <li key={i} className="text-pres-body text-gray-700 flex gap-2">
            <span className="text-brand-500" aria-hidden="true">•</span>
            {r}
          </li>
        ))}
      </ul>
    </article>
  );
}
```

- [ ] **Step 3: Crear WcagTable**

```typescript
// src/components/ui/WcagTable.tsx
import { CriterioWCAG } from "@/data/wcag";

interface WcagTableProps {
  criterios: CriterioWCAG[];
}

function nivelBadge(nivel: "A" | "AA" | "AAA") {
  const colors: Record<string, string> = {
    A: "bg-blue-100 text-blue-800",
    AA: "bg-green-100 text-green-800",
    AAA: "bg-purple-100 text-purple-800",
  };
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${colors[nivel]}`}>
      {nivel}
    </span>
  );
}

export default function WcagTable({ criterios }: WcagTableProps) {
  return (
    <div className="overflow-x-auto" role="region" aria-label="Criterios WCAG 2.2 evaluados" tabIndex={0}>
      <table className="w-full text-left border-collapse">
        <caption className="text-pres-subtitle mb-4 text-left">
          Criterios WCAG 2.2 Auditados
        </caption>
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Código</th>
            <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Nombre</th>
            <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Nivel</th>
            <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Aplicación</th>
          </tr>
        </thead>
        <tbody>
          {criterios.map((c) => (
            <tr key={c.codigo} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-pres-body font-mono">{c.codigo}</td>
              <td className="py-3 px-4 text-pres-body">{c.nombre}</td>
              <td className="py-3 px-4">{nivelBadge(c.nivel)}</td>
              <td className="py-3 px-4 text-pres-body">{c.aplicacion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 4: Crear CourseCard**

```typescript
// src/components/ui/CourseCard.tsx

interface CourseCardProps {
  titulo: string;
  organizacion: string;
  modulos: number;
  formatos: string[];
  duracion: string;
}

export default function CourseCard({
  titulo,
  organizacion,
  modulos,
  formatos,
  duracion,
}: CourseCardProps) {
  return (
    <article
      className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
      aria-label={`Curso: ${titulo}`}
    >
      <h3 className="text-pres-subtitle text-brand-700 mb-1">{titulo}</h3>
      <p className="text-sm text-gray-500 mb-3">Por {organizacion}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {formatos.map((f) => (
          <span
            key={f}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
          >
            {f}
          </span>
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{modulos} módulos</span>
        <span>{duracion}</span>
      </div>
    </article>
  );
}
```

- [ ] **Step 5: Verificar compilación**

```bash
npx tsc --noEmit
npm run build
```

Expected: sin errores, build exitoso.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: componentes UI - StatCard, ActorCard, WcagTable, CourseCard"
```

---

### Task 5: Secciones de la Fase 01 - Hero y Contexto

**Files:**
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/components/sections/ContextoSection.tsx`

**Interfaces:**
- Consumes: `barrerasHonduras`, `poblacionesObjetivo` de `@/data/contexto`, `StatCard` de Task 4
- Produces: secciones renderizables de Fase 01

- [ ] **Step 1: Crear HeroSection**

```typescript
// src/components/sections/HeroSection.tsx

export default function HeroSection() {
  return (
    <section
      id="fase-01"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b from-brand-900 to-brand-700 text-white"
      aria-labelledby="hero-titulo"
    >
      <span className="text-sm uppercase tracking-widest mb-4 text-brand-200">
        Proyecto Final Integrador · UTH · Maestría en Ingeniería de la Computación
      </span>
      <h1 id="hero-titulo" className="text-5xl md:text-6xl font-extrabold mb-6">
        Aula Inclusiva HN
      </h1>
      <p className="text-xl md:text-2xl max-w-2xl mb-8 text-brand-100">
        Plataforma de educación digital inclusiva con delivery adaptativo
        vía <strong>WhatsApp + Web</strong>, potenciada por IA para eliminar
        barreras de conectividad y discapacidad en Honduras.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          🇭🇳 Honduras
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          📱 WhatsApp + Web
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          ♿ WCAG 2.2
        </span>
        <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
          🤖 IA Generativa
        </span>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Crear ContextoSection**

```typescript
// src/components/sections/ContextoSection.tsx

import { barrerasHonduras, poblacionesObjetivo } from "@/data/contexto";
import StatCard from "@/components/ui/StatCard";

export default function ContextoSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-gray-50"
      aria-labelledby="contexto-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 01 · Contexto y Problema
        </span>
        <h2 id="contexto-titulo" className="text-pres-title text-gray-900 mb-8">
          La brecha digital en Honduras
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {barrerasHonduras.map((b) => (
            <StatCard key={b.titulo} {...b} />
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-6 mt-12">
          Población objetivo
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {poblacionesObjetivo.map((p) => (
            <div
              key={p.grupo}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <h4 className="font-bold text-brand-700 mb-1">{p.grupo}</h4>
              <p className="text-sm text-gray-600 mb-1">{p.descripcion}</p>
              <p className="text-xs text-gray-400">{p.estimacion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: secciones Fase 01 - Hero y Contexto Honduras"
```

---

### Task 6: Secciones de la Fase 02 - Solución Tecnológica

**Files:**
- Create: `src/components/sections/SolucionSection.tsx`

**Interfaces:**
- Consumes: `stackTecnologico`, `enfoques`, `archivoReglasAdaptacion`, `costosEstimados` de `@/data/tecnologia`
- Produces: sección de arquitectura, enfoques evaluados y reglas de adaptación

- [ ] **Step 1: Crear SolucionSection**

```typescript
// src/components/sections/SolucionSection.tsx

import { stackTecnologico, enfoques, archivoReglasAdaptacion, costosEstimados } from "@/data/tecnologia";

export default function SolucionSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-white"
      aria-labelledby="solucion-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 02 · Solución Tecnológica
        </span>
        <h2 id="solucion-titulo" className="text-pres-title text-gray-900 mb-8">
          Arquitectura y Stack Tecnológico
        </h2>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Stack tecnológico</h3>
        <div className="overflow-x-auto mb-10" role="region" aria-label="Stack tecnológico" tabIndex={0}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Capa</th>
                <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Tecnología</th>
                <th scope="col" className="py-3 px-4 text-pres-body font-semibold">Justificación</th>
              </tr>
            </thead>
            <tbody>
              {stackTecnologico.map((s) => (
                <tr key={s.capa} className="border-b border-gray-200">
                  <td className="py-3 px-4 font-medium text-pres-body">{s.capa}</td>
                  <td className="py-3 px-4 text-pres-body font-mono text-brand-700">{s.tecnologia}</td>
                  <td className="py-3 px-4 text-pres-body text-gray-600">{s.justificacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Enfoques evaluados</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {enfoques.map((e) => (
            <div
              key={e.nombre}
              className={`border-2 rounded-lg p-5 ${
                e.seleccionado
                  ? "border-brand-500 bg-brand-50"
                  : "border-gray-200"
              }`}
            >
              <h4 className="font-bold text-gray-900 mb-2">
                {e.seleccionado && "✅ "}{e.nombre}
              </h4>
              <p className="text-sm text-gray-600 mb-3">{e.descripcion}</p>
              <ul className="text-sm space-y-1 mb-3">
                {e.pros.map((p, i) => (
                  <li key={i} className="text-green-700">+ {p}</li>
                ))}
                {e.contras.map((c, i) => (
                  <li key={i} className="text-red-600">- {c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Reglas de adaptación automática</h3>
        <pre className="bg-gray-900 text-green-400 p-6 rounded-lg text-sm overflow-x-auto mb-10" aria-label="Reglas de adaptación">
          {archivoReglasAdaptacion.trim()}
        </pre>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Costos estimados (MVP)</h3>
        <div className="space-y-2 mb-10">
          {costosEstimados.map((c) => (
            <div key={c.item} className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span className="text-pres-body">{c.item}</span>
              <span className="font-bold text-brand-700">{c.costo}</span>
              <span className="text-sm text-gray-500">{c.nota}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: sección Fase 02 - Solución Tecnológica (stack, enfoques, reglas, costos)"
```

---

### Task 7: Simulación WhatsApp + AdaptabilityDemo

**Files:**
- Create: `src/components/ui/WhatsAppSimulator.tsx`
- Create: `src/components/ui/AdaptabilityDemo.tsx`

**Interfaces:**
- Consumes: `PerfilUsuario`, `generarConversacion` de `@/data/whatsapp-demo`
- Produce: componente interactivo donde se selecciona un perfil y se anima la conversación de WhatsApp

- [ ] **Step 1: Crear WhatsAppSimulator**

```typescript
// src/components/ui/WhatsAppSimulator.tsx

import { MensajeWhatsApp } from "@/data/whatsapp-demo";

interface WhatsAppSimulatorProps {
  mensajes: MensajeWhatsApp[];
  nombrePerfil: string;
}

export default function WhatsAppSimulator({
  mensajes,
  nombrePerfil,
}: WhatsAppSimulatorProps) {
  return (
    <div
      className="max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-lg"
      role="region"
      aria-label={`Simulación de conversación WhatsApp para ${nombrePerfil}`}
    >
      <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-lg" aria-hidden="true">
          🤖
        </div>
        <div>
          <p className="font-semibold text-sm">Aula Inclusiva HN</p>
          <p className="text-xs opacity-80">en línea</p>
        </div>
      </div>

      <div
        className="bg-[#e5ddd5] p-4 space-y-3 min-h-[400px] max-h-[500px] overflow-y-auto"
        style={{
          backgroundImage:
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAWdEVYdFRpdGxlAERlZmF1bHQgQmFja2dyb3VuZAHJfPuAAAAA...')",
        }}
      >
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.remitente === "usuario" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                msg.remitente === "usuario"
                  ? "bg-green-100 text-gray-900 rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none shadow"
              }`}
            >
              {msg.tipo === "audio" && (
                <span className="text-lg mr-1" aria-hidden="true">🎙️</span>
              )}
              {msg.tipo === "imagen" && (
                <span className="text-lg mr-1" aria-hidden="true">🖼️</span>
              )}
              {msg.tipo === "video" && (
                <span className="text-lg mr-1" aria-hidden="true">🎬</span>
              )}
              <span style={{ whiteSpace: "pre-wrap" }}>{msg.contenido}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500 text-center">
        Simulación · WhatsApp Cloud API · La conversación real sería vía WhatsApp
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Crear AdaptabilityDemo**

```typescript
// src/components/ui/AdaptabilityDemo.tsx

"use client";

import { useState } from "react";
import { perfiles, generarConversacion } from "@/data/whatsapp-demo";
import WhatsAppSimulator from "./WhatsAppSimulator";

export default function AdaptabilityDemo() {
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(0);

  const perfil = perfiles[perfilSeleccionado];
  const mensajes = generarConversacion(perfil);

  return (
    <div className="space-y-6">
      <h3 className="text-pres-subtitle text-gray-900">
        Demo: selecciona un perfil y mira cómo se adapta la entrega
      </h3>

      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Seleccionar perfil de usuario">
        {perfiles.map((p, i) => (
          <button
            key={p.nombre}
            role="radio"
            aria-checked={i === perfilSeleccionado}
            onClick={() => setPerfilSeleccionado(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              i === perfilSeleccionado
                ? "bg-brand-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {p.icono} {p.nombre}
          </button>
        ))}
      </div>

      <WhatsAppSimulator
        mensajes={mensajes}
        nombrePerfil={perfil.nombre}
      />
    </div>
  );
}
```

- [ ] **Step 3: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: simulación WhatsApp interactiva con selector de perfiles"
```

---

### Task 8: Sección Demo WhatsApp

**Files:**
- Create: `src/components/sections/DemoWhatsAppSection.tsx`

**Interfaces:**
- Consumes: `AdaptabilityDemo` de Task 7
- Produce: sección de demo con el simulador de WhatsApp

- [ ] **Step 1: Crear DemoWhatsAppSection**

```typescript
// src/components/sections/DemoWhatsAppSection.tsx

import AdaptabilityDemo from "@/components/ui/AdaptabilityDemo";

export default function DemoWhatsAppSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-green-50"
      aria-labelledby="whatsapp-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-green-700 mb-2 block">
          Fase 02 · Demostración
        </span>
        <h2 id="whatsapp-titulo" className="text-pres-title text-gray-900 mb-8">
          Delivery adaptativo por WhatsApp
        </h2>
        <p className="text-pres-body text-gray-700 mb-8 max-w-3xl">
          El sistema detecta el perfil del usuario (conectividad + discapacidad)
          y entrega automáticamente la lección en el formato óptimo. Selecciona
          un perfil para ver cómo cambia la experiencia.
        </p>
        <AdaptabilityDemo />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: sección Demo WhatsApp con simulador interactivo"
```

---

### Task 9: Dashboard LMS y sección Demo LMS

**Files:**
- Create: `src/components/ui/LMSDashboard.tsx`
- Create: `src/components/sections/DemoLMSSection.tsx`

**Interfaces:**
- Consumes: `CourseCard` de Task 4
- Produce: mockup visual de dashboard LMS con cursos y progreso

- [ ] **Step 1: Crear LMSDashboard**

```typescript
// src/components/ui/LMSDashboard.tsx

import CourseCard from "./CourseCard";

const cursosDemo = [
  {
    titulo: "Introducción a la Computación",
    organizacion: "Fundación Educativa HN",
    modulos: 8,
    formatos: ["📝 Texto", "🖼️ Imagen", "🎙️ Audio", "🎬 Video"],
    duracion: "4 semanas",
  },
  {
    titulo: "Alfabetización Digital Básica",
    organizacion: "CONATEL",
    modulos: 5,
    formatos: ["📝 Texto", "🎙️ Audio"],
    duracion: "2 semanas",
  },
  {
    titulo: "Emprendimiento Rural",
    organizacion: "ONG Impulso HN",
    modulos: 10,
    formatos: ["📝 Texto", "🖼️ Imagen", "🎙️ Audio"],
    duracion: "6 semanas",
  },
];

export default function LMSDashboard() {
  return (
    <div
      className="border border-gray-200 rounded-xl overflow-hidden shadow-lg bg-white"
      role="region"
      aria-label="Dashboard del LMS - Simulación"
    >
      <div className="bg-brand-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-bold text-lg">Aula Inclusiva HN</p>
          <p className="text-sm opacity-80">Panel de Estudiante</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            🎓 María López
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
            <p className="text-sm text-brand-700 font-medium">Cursos activos</p>
            <p className="text-3xl font-bold text-brand-900">2</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-700 font-medium">Certificados obtenidos</p>
            <p className="text-3xl font-bold text-green-800">1</p>
          </div>
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Mis cursos</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {cursosDemo.slice(0, 2).map((c) => (
            <CourseCard key={c.titulo} {...c} />
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Cursos disponibles</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {cursosDemo.map((c) => (
            <CourseCard key={c.titulo} {...c} />
          ))}
        </div>
      </div>

      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500 text-center">
        Simulación · Dashboard LMS · Los datos son ilustrativos
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Crear DemoLMSSection**

```typescript
// src/components/sections/DemoLMSSection.tsx

import LMSDashboard from "@/components/ui/LMSDashboard";

export default function DemoLMSSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-blue-50"
      aria-labelledby="lms-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-700 mb-2 block">
          Fase 02 · Demostración
        </span>
        <h2 id="lms-titulo" className="text-pres-title text-gray-900 mb-4">
          Plataforma Web (LMS)
        </h2>
        <p className="text-pres-body text-gray-700 mb-8 max-w-3xl">
          Dashboard donde los estudiantes exploran cursos, siguen su progreso
          y descargan certificados. Las organizaciones crean y gestionan contenido
          desde el panel de administración.
        </p>
        <LMSDashboard />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Dashboard LMS simulado y sección Demo LMS"
```

---

### Task 10: Sección Creación de Cursos con IA

**Files:**
- Create: `src/components/sections/CreacionIASection.tsx`

**Interfaces:**
- Consumes: datos estáticos (Task 3)
- Produce: sección visual del flujo de creación de cursos con IA

- [ ] **Step 1: Crear CreacionIASection**

```typescript
// src/components/sections/CreacionIASection.tsx"

const pasosIA = [
  {
    paso: "1",
    titulo: "ONG sube el machote",
    descripcion:
      "La organización carga un documento (PDF, DOCX o texto plano) con el contenido base + recursos multimedia (imágenes, videos).",
    icono: "📤",
  },
  {
    paso: "2",
    titulo: "IA procesa y genera",
    descripcion:
      "El sistema extrae conceptos clave y genera automáticamente: audio narrado (TTS), resumen para bajo ancho de banda, paleta daltónico-safe, preguntas de evaluación y metadatos de accesibilidad.",
    icono: "🤖",
  },
  {
    paso: "3",
    titulo: "ONG revisa y valida",
    descripcion:
      "La organización recibe una preview completa del curso generado. Revisa calidad del contenido, corrige si es necesario y aprueba la publicación.",
    icono: "✅",
  },
  {
    paso: "4",
    titulo: "Curso disponible",
    descripcion:
      "El curso se publica en el catálogo. Los estudiantes pueden suscribirse y recibirlo automáticamente en el formato que necesitan.",
    icono: "🚀",
  },
];

export default function CreacionIASection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-amber-50"
      aria-labelledby="creacion-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-amber-700 mb-2 block">
          Fase 02 · Demostración
        </span>
        <h2 id="creacion-titulo" className="text-pres-title text-gray-900 mb-4">
          Creación de cursos asistida por IA
        </h2>
        <p className="text-pres-body text-gray-700 mb-8 max-w-3xl">
          Las organizaciones no necesitan producir 4 formatos manualmente.
          Suben un "machote" con el contenido base y la IA genera todo
          automáticamente: audio, imágenes accesibles, evaluaciones. Luego
          solo validan calidad y publican.
        </p>

        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {pasosIA.map((p) => (
            <div
              key={p.paso}
              className="bg-white border border-gray-200 rounded-lg p-5 text-center"
            >
              <div className="text-4xl mb-3" aria-hidden="true">
                {p.icono}
              </div>
              <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                {p.paso}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{p.titulo}</h3>
              <p className="text-sm text-gray-600">{p.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-3xl">
          <h3 className="text-pres-subtitle text-gray-900 mb-4">
            Lo que la IA genera desde un machote
          </h3>
          <ul className="space-y-2 text-pres-body text-gray-700">
            <li>🎙️ <strong>Audio:</strong> Transcripción a voz (TTS) de todo el contenido textual</li>
            <li>📝 <strong>Resumen ligero:</strong> Versión comprimida para bajo ancho de banda</li>
            <li>🎨 <strong>Paleta segura:</strong> Imágenes con colores distinguibles para daltonismo</li>
            <li>❓ <strong>Evaluaciones:</strong> Preguntas de opción múltiple generadas del contenido</li>
            <li>🏷️ <strong>Metadatos A11y:</strong> Alt text, descripciones, transcripciones</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: sección Creación de Cursos con IA"
```

---

### Task 11: Secciones de la Fase 03 - Accesibilidad, Gobernanza y Actores

**Files:**
- Create: `src/components/sections/AccesibilidadSection.tsx`
- Create: `src/components/sections/GobernanzaSection.tsx`
- Create: `src/components/sections/ActoresSection.tsx`

**Interfaces:**
- Consumes: `criteriosWCAG`, `principiosPOUR` de `@/data/wcag`, `legislacion`, `analisisRegulatorio`, `instituciones`, `propuestaRegulatoria` de `@/data/gobernanza`, `actores` de `@/data/actores`
- Produce: tres secciones de la Fase 03

- [ ] **Step 1: Crear AccesibilidadSection**

```typescript
// src/components/sections/AccesibilidadSection.tsx

import { criteriosWCAG, principiosPOUR } from "@/data/wcag";
import WcagTable from "@/components/ui/WcagTable";

export default function AccesibilidadSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-white"
      aria-labelledby="a11y-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 03 · Dimensiones de Inclusión
        </span>
        <h2 id="a11y-titulo" className="text-pres-title text-gray-900 mb-8">
          Accesibilidad y Diseño Universal
        </h2>

        <WcagTable criterios={criteriosWCAG} />

        <div className="mt-12">
          <h3 className="text-pres-subtitle text-gray-900 mb-6">Principios POUR</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {principiosPOUR.map((p) => (
              <div
                key={p.principio}
                className="bg-gray-50 border border-gray-200 rounded-lg p-5"
              >
                <h4 className="font-bold text-brand-700 mb-2">{p.principio}</h4>
                <p className="text-sm text-gray-700">{p.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Crear GobernanzaSection**

```typescript
// src/components/sections/GobernanzaSection.tsx

import { legislacion, analisisRegulatorio, instituciones, propuestaRegulatoria } from "@/data/gobernanza";

export default function GobernanzaSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-gray-50"
      aria-labelledby="gob-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 03 · Dimensiones de Inclusión
        </span>
        <h2 id="gob-titulo" className="text-pres-title text-gray-900 mb-8">
          Gobernanza y Marco Regulatorio
        </h2>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Legislación hondureña aplicable</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {legislacion.map((l) => (
            <div key={l.decreto} className="bg-white border border-gray-200 rounded-lg p-5">
              <h4 className="font-bold text-brand-700 mb-1">{l.decreto}</h4>
              <p className="text-sm text-gray-700 mb-2">{l.nombre}</p>
              <p className="text-xs text-gray-500">{l.relevancia}</p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Análisis: facilitadores y obstáculos</h3>
        <div className="space-y-3 mb-10">
          {analisisRegulatorio.map((a, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg border ${
                a.tipo === "facilita"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}
            >
              <span className="text-sm font-bold">
                {a.tipo === "facilita" ? "✅ Facilita" : "⚠️ Obstaculiza"}
              </span>
              <p className="text-sm text-gray-700 mt-1">{a.descripcion}</p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Instituciones responsables</h3>
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {instituciones.map((inst) => (
            <div key={inst.siglas} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
              <h4 className="font-bold text-brand-700 text-lg">{inst.siglas}</h4>
              <p className="text-xs text-gray-600 mt-1">{inst.nombre}</p>
              <p className="text-xs text-gray-500 mt-2">{inst.rol}</p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Propuesta regulatoria propia</h3>
        <blockquote className="border-l-4 border-brand-500 bg-brand-50 p-4 rounded-r-lg max-w-3xl">
          <p className="text-pres-body text-gray-800 italic">
            "{propuestaRegulatoria}"
          </p>
        </blockquote>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Crear ActoresSection**

```typescript
// src/components/sections/ActoresSection.tsx

import { actores } from "@/data/actores";
import ActorCard from "@/components/ui/ActorCard";

export default function ActoresSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-white"
      aria-labelledby="actores-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 03 · Dimensiones de Inclusión
        </span>
        <h2 id="actores-titulo" className="text-pres-title text-gray-900 mb-8">
          Participación Social y Actores Comunitarios
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {actores.map((a) => (
            <ActorCard key={a.nombre} {...a} />
          ))}
        </div>

        <div className="bg-brand-50 border border-brand-200 rounded-lg p-6 max-w-3xl">
          <h3 className="text-pres-subtitle text-brand-900 mb-3">
            Modelo de sostenibilidad
          </h3>
          <ul className="space-y-2 text-pres-body text-brand-800">
            <li>🏛️ Cuota voluntaria al registrar organización</li>
            <li>💰 ONGs con presupuesto educativo donan para cubrir estudiantes sin recursos</li>
            <li>🌐 Plataforma de código abierto mantenida por la comunidad</li>
            <li>👥 Voluntarios educadores contribuyen con creación y validación de contenido</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: secciones Fase 03 - Accesibilidad, Gobernanza y Actores"
```

---

### Task 12: Secciones de la Fase 04 - Viabilidad y Proyección

**Files:**
- Create: `src/components/sections/ViabilidadSection.tsx`

**Interfaces:**
- Consumes: `riesgos`, `metricasImpacto`, `hitosPlan` de `@/data/viabilidad`
- Produce: sección de viabilidad y proyección

- [ ] **Step 1: Crear ViabilidadSection**

```typescript
// src/components/sections/ViabilidadSection.tsx

import { riesgos, metricasImpacto, hitosPlan } from "@/data/viabilidad";

export default function ViabilidadSection() {
  return (
    <section
      className="min-h-screen px-6 py-20 bg-gray-50"
      aria-labelledby="viabilidad-titulo"
    >
      <div className="max-w-6xl mx-auto">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Fase 04 · Viabilidad y Proyección
        </span>
        <h2 id="viabilidad-titulo" className="text-pres-title text-gray-900 mb-8">
          Viabilidad, Riesgos y Próximos Pasos
        </h2>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Métricas de impacto esperado</h3>
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {metricasImpacto.map((m) => (
            <div
              key={m.indicador}
              className="bg-brand-50 border border-brand-200 rounded-lg p-5 text-center"
            >
              <p className="text-3xl font-bold text-brand-900 mb-1">{m.valor}</p>
              <p className="text-sm text-brand-700">{m.indicador}</p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Riesgos y mitigaciones</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {riesgos.map((r, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-5">
              <span className="text-xs font-bold uppercase text-gray-500">
                {r.categoria}
              </span>
              <p className="text-pres-body text-gray-900 mt-1 mb-2 font-medium">
                {r.descripcion}
              </p>
              <p className="text-sm text-green-700">
                <strong>Mitigación:</strong> {r.mitigacion}
              </p>
            </div>
          ))}
        </div>

        <h3 className="text-pres-subtitle text-gray-900 mb-4">Plan de implementación (alto nivel)</h3>
        <ol className="space-y-3">
          {hitosPlan.map((h, i) => (
            <li key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
              <span className="bg-brand-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                {i + 1}
              </span>
              <span className="text-pres-body text-gray-800">{h}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: sección Fase 04 - Viabilidad, riesgos y proyección"
```

---

### Task 13: Sección de la Fase 05 - Cierre

**Files:**
- Create: `src/components/sections/CierreSection.tsx`

**Interfaces:**
- Consumes: nada externo
- Produce: sección final de síntesis

- [ ] **Step 1: Crear CierreSection**

```typescript
// src/components/sections/CierreSection.tsx

export default function CierreSection() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b from-brand-700 to-brand-900 text-white"
      aria-labelledby="cierre-titulo"
    >
      <span className="text-sm uppercase tracking-widest text-brand-200 mb-4">
        Fase 05 · Cierre y Síntesis
      </span>
      <h2 id="cierre-titulo" className="text-pres-title mb-6">
        Aula Inclusiva HN
      </h2>
      <p className="text-xl max-w-2xl mb-8 text-brand-100">
        Una plataforma que elimina barreras de conectividad y discapacidad
        en la educación digital hondureña, usando WhatsApp + Web con
        adaptación automática de contenido potenciada por IA.
      </p>
      <div className="grid md:grid-cols-4 gap-6 max-w-4xl w-full text-left">
        {[
          { q: "¿Qué problema resuelve?", a: "Brecha de acceso a educación digital por conectividad y discapacidad" },
          { q: "¿Cómo lo resuelve?", a: "Delivery adaptativo multi-formato por WhatsApp + Web con IA" },
          { q: "¿Para quién?", a: "Cualquier persona en Honduras que quiera capacitarse, sin importar su condición" },
          { q: "¿Bajo qué marco?", a: "Decreto 282-2013 + Ley 149-2013 + Propuesta regulatoria propia" },
        ].map((item) => (
          <div key={item.q} className="bg-white/10 backdrop-blur rounded-lg p-4">
            <p className="text-sm font-bold text-brand-200 mb-1">{item.q}</p>
            <p className="text-sm text-white">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: sección Fase 05 - Cierre y Síntesis"
```

---

### Task 14: Ensamblar página principal con PhaseIndicator

**Files:**
- Create: `src/components/layout/PhaseIndicator.tsx`
- Create: `src/components/layout/Header.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: todas las secciones de Tasks 5-13
- Produce: página principal ensamblada con navegación entre fases

- [ ] **Step 1: Crear PhaseIndicator**

```typescript
// src/components/layout/PhaseIndicator.tsx

"use client";

const fases = [
  { numero: "01", nombre: "Contexto", id: "fase-01" },
  { numero: "02", nombre: "Solución", id: "fase-02" },
  { numero: "03", nombre: "Inclusión", id: "fase-03" },
  { numero: "04", nombre: "Viabilidad", id: "fase-04" },
  { numero: "05", nombre: "Cierre", id: "fase-05" },
];

export default function PhaseIndicator() {
  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      aria-label="Navegación entre fases de la presentación"
    >
      <ul className="space-y-3">
        {fases.map((f, i) => (
          <li key={f.id}>
            <a
              href={`#${f.id}`}
              className="flex items-center gap-3 group"
              aria-label={`Ir a Fase ${f.numero}: ${f.nombre}`}
            >
              <span className="text-xs text-gray-400 group-hover:text-brand-500 transition-colors text-right w-24">
                Fase {f.numero}
              </span>
              <span className="w-3 h-3 rounded-full border-2 border-gray-300 group-hover:border-brand-500 group-hover:bg-brand-500 transition-colors" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

- [ ] **Step 2: Crear Header**

```typescript
// src/components/layout/Header.tsx

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <span className="font-bold text-brand-900 text-lg">
          Aula Inclusiva HN
        </span>
        <span className="text-xs text-gray-500">
          Proyecto Final Integrador · UTH · MISC 2025-2026
        </span>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Ensamblar page.tsx**

```typescript
// src/app/page.tsx

import Header from "@/components/layout/Header";
import PhaseIndicator from "@/components/layout/PhaseIndicator";
import HeroSection from "@/components/sections/HeroSection";
import ContextoSection from "@/components/sections/ContextoSection";
import SolucionSection from "@/components/sections/SolucionSection";
import DemoWhatsAppSection from "@/components/sections/DemoWhatsAppSection";
import DemoLMSSection from "@/components/sections/DemoLMSSection";
import CreacionIASection from "@/components/sections/CreacionIASection";
import AccesibilidadSection from "@/components/sections/AccesibilidadSection";
import GobernanzaSection from "@/components/sections/GobernanzaSection";
import ActoresSection from "@/components/sections/ActoresSection";
import ViabilidadSection from "@/components/sections/ViabilidadSection";
import CierreSection from "@/components/sections/CierreSection";

export default function Home() {
  return (
    <>
      <Header />
      <PhaseIndicator />

      {/* Fase 01 */}
      <HeroSection />
      <ContextoSection />

      {/* Fase 02 */}
      <SolucionSection />
      <DemoLMSSection />
      <DemoWhatsAppSection />
      <CreacionIASection />

      {/* Fase 03 */}
      <AccesibilidadSection />
      <GobernanzaSection />
      <ActoresSection />

      {/* Fase 04 */}
      <ViabilidadSection />

      {/* Fase 05 */}
      <CierreSection />
    </>
  );
}
```

- [ ] **Step 4: Verificar build**

```bash
npx tsc --noEmit && npm run build
```

Expected: build exitoso, sin errores de types ni import.

- [ ] **Step 5: Verificar dev server**

```bash
npm run dev
```

Verificar que la app carga en `http://localhost:3000` con todas las secciones visibles.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: ensamblar página principal con navegación entre 5 fases"
```

---

### Task 15: Deploy en Vercel

**Files:**
- No nuevos archivos (configuración desde Vercel dashboard)

**Interfaces:**
- Consumes: proyecto completo compilado (Task 14)
- Produce: URL pública del sitio desplegado

- [ ] **Step 1: Asegurar que el build funciona localmente**

```bash
npm run build
```

Expected: compilación exitosa.

- [ ] **Step 2: Deploy en Vercel**

```bash
npx vercel --prod
```

Expected: URL de producción generada (ej. `https://aula-inclusiva-hn.vercel.app`).

- [ ] **Step 3: Verificar sitio en producción**

Abrir la URL generada y navegar todas las secciones. Verificar:
- Hero visible y responsivo
- Datos de contexto correctos
- Stack y enfoques legibles
- Simulación WhatsApp interactiva (cambios de perfil funcionan)
- Dashboard LMS visible
- Flujo de IA visible
- Tabla WCAG renderizada
- Secciones de gobernanza y actores completas
- Viabilidad y riesgos correctos
- Cierre visible

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "deploy: desplegado en Vercel"
```

---

## Self-Review Summary

### Spec Coverage

| Dimensión | Task(s) que la cubren |
|---|---|
| D1 - Definición del Problema | Task 5 (HeroSection, ContextoSection) con datos de `contexto.ts` |
| D2 - Solución Tecnológica | Tasks 6-10 (SolucionSection, DemoWhatsApp, DemoLMS, CreacionIA) con `tecnologia.ts` |
| D3 - Accesibilidad | Task 11 (AccesibilidadSection) con datos de `wcag.ts` |
| D4 - Gobernanza | Task 11 (GobernanzaSection) con datos de `gobernanza.ts` |
| D5 - Participación Social | Task 11 (ActoresSection) con datos de `actores.ts` |
| D6 - Presentación | Task 14 (ensamblaje) + PhaseIndicator que marca las 5 fases |
| 3 flujos de usuario (Tipo B) | Tasks 8 (WhatsApp), 9 (LMS), 10 (Creación IA) |
| E2 (Artefacto) | Todo el sitio (Tasks 1-15) |
| E4 (Diapositivas) | PhaseIndicator + estructura de 5 fases (Task 14) |

### No Placeholders Found
Todas las tareas contienen código completo, imports exactos, tipos definidos, y comandos verificables.

### Type Consistency
- `@/data/contexto` exporta `Barrera`, `PoblacionObjetivo` usados en Task 5
- `@/data/wcag` exporta `CriterioWCAG` usado en `WcagTable` (Task 4)
- `@/data/actores` exporta `Actor` usado en `ActorCard` (Task 4)
- `@/data/whatsapp-demo` exporta `PerfilUsuario`, `MensajeWhatsApp`, `generarConversacion` usados en Task 7
- `@/data/tecnologia` exporta tipos usados en Task 6
- Todos los imports coinciden en nombre y path
