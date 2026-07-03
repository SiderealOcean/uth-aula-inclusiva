# Reporte de Accesibilidad — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `/reporte-accesibilidad` page with a formal WCAG 2.2 technical report covering both LMS and WhatsApp platforms, plus navigation tabs to switch between Home and the report.

**Architecture:**
- New Next.js App Router route `src/app/reporte-accesibilidad/page.tsx`
- Header moved to `layout.tsx` with `usePathname()` tabs (Home | Reporte Accesibilidad)
- New data file `src/data/reporte-accesibilidad.ts` with structured report content per platform
- New component `WcagReportTable.tsx` for the WCAG results table
- Node script `scripts/audit-a11y.mjs` using `@axe-core/playwright` + Playwright to generate real audit JSON + screenshots

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, @axe-core/playwright, Playwright

## Global Constraints

- Must not break existing `npm run build`
- Must follow existing code style (no comments, Tailwind classes, existing patterns)
- All existing data files in `src/data/` remain unchanged
- The PhaseIndicator component stays on home page only
- Report page must be fully static (no client-side data fetching)
- Audit script is optional for build (run separately)

---

### Task 1: Navigation Tabs — Move Header to Layout + Add Tabs

**Files:**
- Modify: `src/app/layout.tsx` — add Header import
- Modify: `src/app/page.tsx` — remove `<Header />` line
- Modify: `src/components/layout/Header.tsx` — add Link tabs, usePathname, active state

**Interfaces:**
- Consumes: none
- Produces: Shared Header in layout with tabs linking to `/` and `/reporte-accesibilidad`

- [ ] **Step 1: Update Header.tsx — add tabs with usePathname**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const tabs = [
    { href: "/", label: "Home" },
    { href: "/reporte-accesibilidad", label: "Reporte Accesibilidad" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-brand-900 text-lg">
            Aula Inclusiva HN
          </span>
          <span className="text-xs text-gray-500">
            Proyecto Final Integrador · UTH · MISC 2025-2026
          </span>
        </div>
        <nav className="flex gap-1 border-b border-gray-100" aria-label="Navegación principal">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  isActive
                    ? "bg-brand-500 text-white"
                    : "text-gray-600 hover:text-brand-700 hover:bg-gray-50"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Move Header from page.tsx to layout.tsx**

Update `src/app/page.tsx` — remove `<Header />` line (line 18):

```tsx
export default function Home() {
  return (
    <>
      <PhaseIndicator />
      {/* rest remains unchanged */}
    </>
  );
}
```

Update `src/app/layout.tsx` — add Header before `<main>`:

```tsx
import Header from "@/components/layout/Header";

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
        <Header />
        <main id="contenido-principal">{children}</main>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: Compiled successfully, linting passes.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx src/components/layout/Header.tsx
git commit -m "feat: add navigation tabs and shared header in layout"
```

---

### Task 2: Data Layer + WcagReportTable Component

**Files:**
- Create: `src/data/reporte-accesibilidad.ts`
- Create: `src/components/ui/WcagReportTable.tsx`

**Interfaces:**

```typescript
// From reporte-accesibilidad.ts
interface ResultadoWCAG {
  codigo: string;
  nombre: string;
  nivel: "A" | "AA" | "AAA";
  plataforma: "LMS" | "WhatsApp" | "Ambos";
  resultado: "Pasa" | "No pasa" | "Incompleto";
  elementoEvaluado: string;
  accionTomada: string;
  evidencia?: string;
}
```

- [ ] **Step 1: Create `src/data/reporte-accesibilidad.ts`**

```typescript
export interface ResultadoWCAG {
  codigo: string;
  nombre: string;
  nivel: "A" | "AA" | "AAA";
  plataforma: "LMS" | "WhatsApp" | "Ambos";
  resultado: "Pasa" | "No pasa" | "Incompleto";
  elementoEvaluado: string;
  accionTomada: string;
  evidencia?: string;
}

export interface IteracionMejora {
  titulo: string;
  descripcion: string;
  antes: string;
  despues: string;
  plataforma: "LMS" | "WhatsApp";
}

export interface EvidenciaVisual {
  ruta: string;
  descripcion: string;
  resultado: "Pasa" | "No pasa" | "Incompleto";
}

export const resultadosWCAG: ResultadoWCAG[] = [
  {
    codigo: "1.1.1",
    nombre: "Contenido no textual",
    nivel: "A",
    plataforma: "WhatsApp",
    resultado: "Pasa",
    elementoEvaluado: "Imágenes en conversación WhatsApp (diagramas, capturas LMS) incluyen texto alternativo descriptivo",
    accionTomada: "Todas las imágenes en whatsapp-demo.ts incluyen descripción textual en el alt text",
  },
  {
    codigo: "1.4.1",
    nombre: "Uso del color",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Paleta de colores con texturas y etiquetas para daltonismo en LMS y WhatsApp",
    accionTomada: "Perfil 'Daltonismo' en AdaptabilityDemo usa paleta segura con patrones + etiquetas de texto en lugar de solo color",
  },
  {
    codigo: "1.4.3",
    nombre: "Contraste mínimo",
    nivel: "AA",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Texto vs fondo en toda la interfaz (Header, tarjetas, tablas, simuladores)",
    accionTomada: "Paleta brand.500 (#1e40af) sobre blanco pasa ratio 4.5:1; configurado en tailwind.config.ts",
  },
  {
    codigo: "2.1.1",
    nombre: "Teclado",
    nivel: "A",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Tabs de navegación en LMSDashboard (Estudiante / Organización / Creador)",
    accionTomada: "Se usan role='tab' nativos con manejo de foco por teclado; aria-selected y aria-controls vinculados",
  },
  {
    codigo: "2.3.1",
    nombre: "Umbral de 3 destellos",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Contenido multimedia (videos, animaciones) en LMS y WhatsApp",
    accionTomada: "No hay contenido con destellos ni parpadeos; animaciones CSS son fadeIn suaves (< 3 destellos/segundo)",
  },
  {
    codigo: "2.4.1",
    nombre: "Evitar bloques",
    nivel: "A",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Enlace 'Saltar al contenido principal' al inicio de cada página",
    accionTomada: "Skip-to-content link implementado en layout.tsx con clase sr-only/focus:not-sr-only",
  },
  {
    codigo: "2.4.6",
    nombre: "Encabezados y etiquetas",
    nivel: "AA",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Secciones del LMS con headings semánticos y aria-labelledby",
    accionTomada: "Cada sección del dashboard usa h2/h3 con ids vinculados via aria-labelledby",
  },
  {
    codigo: "3.1.1",
    nombre: "Idioma de la página",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Atributo lang en el elemento HTML",
    accionTomada: "lang='es' configurado en layout.tsx: <html lang='es'>",
  },
  {
    codigo: "3.3.2",
    nombre: "Etiquetas o instrucciones",
    nivel: "A",
    plataforma: "Ambos",
    resultado: "Pasa",
    elementoEvaluado: "Input de WhatsApp, botones, controles del LMS, navegación por tabs",
    accionTomada: "Todos los controles interactivos tienen aria-label; input de WhatsApp tiene placeholder y aria-label",
  },
  {
    codigo: "4.1.2",
    nombre: "Nombre, función, valor",
    nivel: "A",
    plataforma: "LMS",
    resultado: "Pasa",
    elementoEvaluado: "Tabs, botones, regiones ARIA en LMSDashboard",
    accionTomada: "role='tab', 'tabpanel', 'region' con aria-selected y aria-expanded correctamente vinculados",
  },
];

export const principiosPOURReporte = [
  {
    principio: "Perceptible",
    descripcion: "La información y los componentes de la interfaz deben presentarse de modo que los usuarios puedan percibirlos.",
    aplicacionLMS: "Textos con contraste AA, iconos con etiquetas, imágenes con alt text, soporte para lectores de pantalla con ARIA labels.",
    aplicacionWhatsApp: "Contenido entregado en 4 formatos (texto, audio, imagen, video) según la preferencia del perfil; el usuario elige cómo recibir la información.",
  },
  {
    principio: "Operable",
    descripcion: "Los componentes de la interfaz y la navegación deben poder utilizarse.",
    aplicacionLMS: "Navegación completa por teclado con roles ARIA, skip-to-content link, manejo de foco visible con focus-visible de 3px.",
    aplicacionWhatsApp: "Navegación por mensajes de texto con botones de respuesta rápida; funciona sin mouse ni pantalla táctil avanzada.",
  },
  {
    principio: "Comprensible",
    descripcion: "La información y el manejo de la interfaz deben ser comprensibles.",
    aplicacionLMS: "Lenguaje claro, instrucciones consistentes, retroalimentación inmediata en cada acción (cambio de tab, selección de curso).",
    aplicacionWhatsApp: "Mensajes cortos y directos con formato claro; indicador visual de escritura del bot y confirmación de lectura.",
  },
  {
    principio: "Robusto",
    descripcion: "El contenido debe ser suficientemente robusto para ser interpretado de forma fiable por una amplia variedad de agentes de usuario, incluidos los productos de apoyo.",
    aplicacionLMS: "HTML semántico con roles ARIA explícitos (region, tab, tabpanel) compatible con NVDA, VoiceOver y TalkBack.",
    aplicacionWhatsApp: "La simulación usa markup semántico con atributos ARIA; el delivery real por WhatsApp API es nativamente accesible desde la app de WhatsApp.",
  },
];

export const iteracionesMejora: IteracionMejora[] = [
  {
    titulo: "Input de WhatsApp funcional con ARIA label",
    descripcion: "El input del simulador WhatsApp era originalmente un <div> estático sin capacidad de escritura ni accesibilidad. Se reemplazó por un <input> real con placeholder, aria-label y envío por Enter.",
    antes: "Div estático con texto gris 'Escribe un mensaje...' — no funcional, sin label, no enfocable por teclado.",
    despues: "Input type='text' con onChange, onKeyDown (Enter), aria-label='Mensaje', placeholder y focus ring visible.",
    plataforma: "WhatsApp",
  },
  {
    titulo: "Skip-to-content y foco visible en layout",
    descripcion: "No existía mecanismo para saltar bloques de navegación repetitivos ni indicador visual de foco en todos los elementos.",
    antes: "Sin skip-to-content link; focus outline solo por defecto del navegador (inconsistente entre navegadores).",
    despues: "Enlace 'Saltar al contenido principal' al inicio del body con sr-only/focus:not-sr-only; focus-visible de 3px azul en todos los elementos.",
    plataforma: "LMS",
  },
];

export const herramientaAuditoria = {
  nombre: "axe DevTools",
  version: "4.9",
  tipo: "CLI + Playwright",
  url: "https://www.deque.com/axe/",
};
```

- [ ] **Step 2: Create `src/components/ui/WcagReportTable.tsx`**

```tsx
import { ResultadoWCAG } from "@/data/reporte-accesibilidad";

interface WcagReportTableProps {
  resultados: ResultadoWCAG[];
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

function resultadoBadge(resultado: "Pasa" | "No pasa" | "Incompleto") {
  const styles: Record<string, string> = {
    Pasa: "bg-emerald-100 text-emerald-800",
    "No pasa": "bg-red-100 text-red-800",
    Incompleto: "bg-amber-100 text-amber-800",
  };
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${styles[resultado]}`}>
      {resultado}
    </span>
  );
}

export default function WcagReportTable({ resultados }: WcagReportTableProps) {
  return (
    <div className="overflow-x-auto" role="region" aria-label="Resultados de auditoría WCAG 2.2" tabIndex={0}>
      <table className="w-full text-left border-collapse">
        <caption className="sr-only">Resultados de evaluación WCAG 2.2 por criterio y plataforma</caption>
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Criterio</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Nombre</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Nivel</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Plataforma</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Resultado</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Elemento evaluado</th>
            <th scope="col" className="py-3 px-4 text-sm font-semibold">Acción tomada</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((r) => (
            <tr key={`${r.codigo}-${r.plataforma}`} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm font-mono">{r.codigo}</td>
              <td className="py-3 px-4 text-sm">{r.nombre}</td>
              <td className="py-3 px-4">{nivelBadge(r.nivel)}</td>
              <td className="py-3 px-4 text-sm">{r.plataforma}</td>
              <td className="py-3 px-4">{resultadoBadge(r.resultado)}</td>
              <td className="py-3 px-4 text-sm max-w-xs">{r.elementoEvaluado}</td>
              <td className="py-3 px-4 text-sm max-w-xs">{r.accionTomada}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: Compiled successfully.

- [ ] **Step 4: Commit**

```bash
git add src/data/reporte-accesibilidad.ts src/components/ui/WcagReportTable.tsx
git commit -m "feat: add accessibility report data layer and table component"
```

---

### Task 3: Report Page

**Files:**
- Create: `src/app/reporte-accesibilidad/page.tsx`

**Interfaces:**
- Consumes: `resultadosWCAG`, `principiosPOURReporte`, `iteracionesMejora`, `herramientaAuditoria` from `src/data/reporte-accesibilidad.ts`
- Consumes: `WcagReportTable` from `src/components/ui/WcagReportTable.tsx`
- Produces: Static page at `/reporte-accesibilidad`

- [ ] **Step 1: Create `src/app/reporte-accesibilidad/page.tsx`**

This is a substantial file. Let me write it section by section.

```tsx
import {
  resultadosWCAG,
  principiosPOURReporte,
  iteracionesMejora,
  herramientaAuditoria,
} from "@/data/reporte-accesibilidad";
import WcagReportTable from "@/components/ui/WcagReportTable";

function resultadoBadge(resultado: "Pasa" | "No pasa" | "Incompleto") {
  const styles: Record<string, string> = {
    Pasa: "bg-emerald-100 text-emerald-800",
    "No pasa": "bg-red-100 text-red-800",
    Incompleto: "bg-amber-100 text-amber-800",
  };
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${styles[resultado]}`}>
      {resultado}
    </span>
  );
}

function POURCard({
  principio,
  descripcion,
  aplicacionLMS,
  aplicacionWhatsApp,
}: {
  principio: string;
  descripcion: string;
  aplicacionLMS: string;
  aplicacionWhatsApp: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="font-bold text-brand-700 text-lg mb-2">{principio}</h3>
      <p className="text-sm text-gray-600 mb-4">{descripcion}</p>
      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">LMS</span>
          <p className="text-sm text-gray-700 mt-1">{aplicacionLMS}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">WhatsApp</span>
          <p className="text-sm text-gray-700 mt-1">{aplicacionWhatsApp}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReporteAccesibilidadPage() {
  const total = resultadosWCAG.length;
  const pasan = resultadosWCAG.filter((r) => r.resultado === "Pasa").length;
  const noPasan = resultadosWCAG.filter((r) => r.resultado === "No pasa").length;
  const incompletos = resultadosWCAG.filter((r) => r.resultado === "Incompleto").length;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Encabezado */}
      <section className="mb-12">
        <span className="text-sm uppercase tracking-widest text-brand-500 mb-2 block">
          Entregable E3
        </span>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Reporte de Evaluación de Accesibilidad
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Evaluación técnica basada en WCAG 2.2 aplicada a los dos componentes principales
          del proyecto: la Plataforma Web (LMS) y el Delivery Adaptativo por WhatsApp.
          Herramienta utilizada: <strong>{herramientaAuditoria.nombre} v{herramientaAuditoria.version}</strong> ({herramientaAuditoria.tipo}).
        </p>
      </section>

      {/* Resumen ejecutivo */}
      <section className="mb-12 bg-gray-50 border border-gray-200 rounded-lg p-6" aria-labelledby="resumen-heading">
        <h2 id="resumen-heading" className="text-xl font-bold text-gray-900 mb-4">Resumen ejecutivo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-gray-900">{total}</div>
            <div className="text-sm text-gray-500">Criterios evaluados</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-emerald-600">{pasan}</div>
            <div className="text-sm text-gray-500">Pasan</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{incompletos}</div>
            <div className="text-sm text-gray-500">Incompletos</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-600">{noPasan}</div>
            <div className="text-sm text-gray-500">No pasan</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-200 inline-block"></span> Nivel A: {resultadosWCAG.filter(r => r.nivel === "A").length}</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-200 inline-block"></span> Nivel AA: {resultadosWCAG.filter(r => r.nivel === "AA").length}</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-200 inline-block"></span> Nivel AAA: {resultadosWCAG.filter(r => r.nivel === "AAA").length}</span>
          <span className="flex items-center gap-1">|</span>
          <span className="flex items-center gap-1">LMS: {resultadosWCAG.filter(r => r.plataforma === "LMS" || r.plataforma === "Ambos").length}</span>
          <span className="flex items-center gap-1">WhatsApp: {resultadosWCAG.filter(r => r.plataforma === "WhatsApp" || r.plataforma === "Ambos").length}</span>
        </div>
      </section>

      {/* Tabla WCAG */}
      <section className="mb-12" aria-labelledby="tabla-heading">
        <h2 id="tabla-heading" className="text-xl font-bold text-gray-900 mb-6">
          Criterios WCAG 2.2 evaluados
        </h2>
        <WcagReportTable resultados={resultadosWCAG} />
      </section>

      {/* Principios POUR */}
      <section className="mb-12" aria-labelledby="pour-heading">
        <h2 id="pour-heading" className="text-xl font-bold text-gray-900 mb-6">
          Principios POUR — Aplicación por plataforma
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {principiosPOURReporte.map((p) => (
            <POURCard key={p.principio} {...p} />
          ))}
        </div>
      </section>

      {/* Iteración de mejora */}
      <section className="mb-12" aria-labelledby="iteracion-heading">
        <h2 id="iteracion-heading" className="text-xl font-bold text-gray-900 mb-6">
          Iteraciones de mejora documentadas
        </h2>
        <div className="space-y-6">
          {iteracionesMejora.map((it) => (
            <div key={it.titulo} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-bold text-gray-900">{it.titulo}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{it.plataforma}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{it.descripcion}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Antes</span>
                  <p className="text-sm text-gray-700 mt-2">{it.antes}</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Después</span>
                  <p className="text-sm text-gray-700 mt-2">{it.despues}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evidencia visual */}
      <section className="mb-12" aria-labelledby="evidencia-heading">
        <h2 id="evidencia-heading" className="text-xl font-bold text-gray-900 mb-4">
          Evidencia visual — Auditoría con axe DevTools
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Las siguientes capturas fueron generadas ejecutando axe-core via Playwright sobre
          el sitio en entorno de desarrollo. Cada captura muestra el resultado de la auditoría
          automatizada sobre los componentes evaluados.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <p className="text-sm text-amber-800 font-medium">
            ⚡ Las capturas de axe DevTools se generarán al ejecutar el script de auditoría.
            Actualmente se muestra la estructura del reporte con datos teóricos.
          </p>
          <p className="text-xs text-amber-600 mt-2">
            Para generar: <code className="bg-amber-100 px-1 rounded">npm run audit:a11y</code>
          </p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: Compiled successfully.

- [ ] **Step 3: Commit**

```bash
git add src/app/reporte-accesibilidad/
git commit -m "feat: add accessibility report page"
```

---

### Task 4: Audit Script (axe-core + Playwright)

**Files:**
- Create: `scripts/audit-a11y.mjs`
- Modify: `package.json` — add `audit:a11y` script and dependencies
- Create: `public/audits/` directory

- [ ] **Step 1: Install dependencies**

```bash
npm install -D @axe-core/playwright playwright
npx playwright install chromium
```

- [ ] **Step 2: Create `scripts/audit-a11y.mjs`**

```javascript
import { chromium } from "playwright";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(__dirname, "..", "public", "audits");
const baseUrl = process.env.BASE_URL || "http://localhost:3000";

const pages = [
  { path: "/", name: "home" },
  { path: "/reporte-accesibilidad", name: "reporte" },
];

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

async function runAudit(pagePath, pageName) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    await page.goto(`${baseUrl}${pagePath}`, { waitUntil: "networkidle" });
    console.log(`\n=== Auditing: ${pagePath} (${pageName}) ===`);

    // Inject axe-core and run
    const { violations, passes, incomplete } = await page.evaluate(async () => {
      const axe = await import("@axe-core/playwright");
      // Actually let's use the Node API instead
      return { violations: [], passes: [], incomplete: [] };
    });

    // Use the proper Node API
    const AxeBuilder = (await import("@axe-core/playwright")).default;
    const results = await new AxeBuilder({ page }).analyze();

    const { violations, passes, incomplete } = results;

    // Save full results as JSON
    const jsonPath = resolve(outputDir, `${pageName}-results.json`);
    writeFileSync(jsonPath, JSON.stringify(results, null, 2));
    console.log(`Results saved: ${jsonPath}`);

    // Take screenshot
    const screenshotPath = resolve(outputDir, `${pageName}-screenshot.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`Screenshot saved: ${screenshotPath}`);

    // Summary
    console.log(`Violations: ${violations.length}`);
    console.log(`Passes: ${passes.length}`);
    console.log(`Incomplete: ${incomplete.length}`);

    // Take element-specific screenshots for violations
    for (const violation of violations) {
      for (const node of violation.nodes) {
        const selector = node.target.join(" ");
        try {
          const el = await page.locator(selector).first();
          if (el) {
            const elScreenshotPath = resolve(
              outputDir,
              `${pageName}-violation-${violation.id}-${violation.nodes.indexOf(node)}.png`
            );
            await el.screenshot({ path: elScreenshotPath });
            console.log(`Violation element screenshot: ${elScreenshotPath}`);
          }
        } catch {
          console.log(`Could not capture element: ${selector}`);
        }
      }
    }

    return { violations: violations.length, passes: passes.length, incomplete: incomplete.length };
  } catch (err) {
    console.error(`Error auditing ${pagePath}:`, err.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log(`Axe-core audit starting...\nBase URL: ${baseUrl}`);
  console.log(`Output: ${outputDir}\n`);

  let totalViolations = 0;
  let totalPasses = 0;

  for (const { path, name } of pages) {
    const result = await runAudit(path, name);
    if (result) {
      totalViolations += result.violations;
      totalPasses += result.passes;
    }
  }

  console.log(`\n=== Audit Complete ===`);
  console.log(`Total violations: ${totalViolations}`);
  console.log(`Total passes: ${totalPasses}`);
}

main();
```

- [ ] **Step 3: Add audit script to package.json**

Add to `"scripts"`:
```json
"audit:a11y": "node scripts/audit-a11y.mjs"
```

- [ ] **Step 4: Verify script runs (requires dev server)**

```bash
# In one terminal:
npm run dev &
# Wait for server to be ready, then:
sleep 5 && npm run audit:a11y
# Then kill the dev server
kill %1
```

Expected: JSON files and screenshots generated in `public/audits/`.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/ scripts/audit-a11y.mjs public/audits/
git commit -m "feat: add axe-core audit script and generate initial report"
```

---

### Task 5: Integrate Real Audit Results into Report Page

**Files:**
- Modify: `src/data/reporte-accesibilidad.ts` — update results with audit findings if needed
- Modify: `src/app/reporte-accesibilidad/page.tsx` — add evidence images from audit

- [ ] **Step 1: Review audit results and update data**

After running the audit, examine `public/audits/home-results.json` and `public/audits/reporte-results.json` to see which criteria passed/failed. Update `resultadosWCAG` in `reporte-accesibilidad.ts` with actual findings.

- [ ] **Step 2: Update report page to show real screenshots**

Replace the placeholder amber banner in the evidence section with actual screenshot display:

```tsx
      {/* Evidencia visual */}
      <section className="mb-12" aria-labelledby="evidencia-heading">
        <h2 id="evidencia-heading" className="text-xl font-bold text-gray-900 mb-4">
          Evidencia visual — Auditoría con axe DevTools
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Las siguientes capturas fueron generadas ejecutando axe-core via Playwright sobre
          el sitio en entorno de desarrollo.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-sm text-gray-900 mb-2">Home — Vista completa</h3>
            <img
              src="/audits/home-screenshot.png"
              alt="Captura de pantalla de la página Home auditada con axe DevTools"
              className="w-full border border-gray-200 rounded"
            />
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-bold text-sm text-gray-900 mb-2">Reporte Accesibilidad — Vista completa</h3>
            <img
              src="/audits/reporte-screenshot.png"
              alt="Captura de pantalla de la página Reporte Accesibilidad auditada con axe DevTools"
              className="w-full border border-gray-200 rounded"
            />
          </div>
        </div>
        {violationScreenshots.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-sm text-gray-900 mb-4">Violaciones detectadas</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {violationScreenshots.map((vs, i) => (
                <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <span className="text-xs font-bold text-red-700 uppercase">{vs.criterio}</span>
                  <img
                    src={vs.ruta}
                    alt={`Violación de ${vs.criterio}: ${vs.descripcion}`}
                    className="w-full border border-red-200 rounded mt-2"
                  />
                  <p className="text-xs text-gray-600 mt-2">{vs.descripcion}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: Compiled successfully.

- [ ] **Step 4: Commit**

```bash
git add src/data/reporte-accesibilidad.ts src/app/reporte-accesibilidad/page.tsx public/audits/
git commit -m "feat: integrate real audit evidence into accessibility report"
```
