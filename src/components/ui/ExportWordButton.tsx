"use client";

import { useState } from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  ImageRun,
  HeadingLevel,
  AlignmentType,
  WidthType,
} from "docx";
import {
  resultadosAxeLMS,
  evaluacionContenidoWhatsApp,
  principiosPOURReporte,
  iteracionesMejora,
  resumenAuditoria,
  herramientaAuditoria,
  type ResultadoAxeLMS,
  type EvaluacionContenidoWhatsApp,
} from "@/data/reporte-accesibilidad";

interface ImagenDoc {
  nombre: string;
  ruta: string;
  titulo: string;
  anchoPx: number;
  altoPx: number;
}

const pxToEmu = (px: number) => Math.round(px * 9525);

const imagenes: ImagenDoc[] = [
  { nombre: "lms-screenshot", ruta: "/audits/lms-screenshot.png", titulo: "Plataforma Web (LMS) - captura completa auditada con axe DevTools", anchoPx: 640, altoPx: 450 },
  { nombre: "whatsapp-screenshot", ruta: "/audits/whatsapp-screenshot.png", titulo: "Delivery Adaptativo por WhatsApp - captura ilustrativa del flujo de contenido", anchoPx: 640, altoPx: 450 },
  { nombre: "lms-violation-color-contrast", ruta: "/audits/lms-violation-color-contrast-0.png", titulo: "Violacion de contraste detectada por axe en LMS", anchoPx: 320, altoPx: 200 },
  { nombre: "lms-violation-heading", ruta: "/audits/lms-violation-page-has-heading-one-0.png", titulo: "Violacion page-has-heading-one detectada por axe en LMS", anchoPx: 320, altoPx: 200 },
];

function estadoAxeColor(estado: ResultadoAxeLMS["estado"]): string {
  const colores: Record<ResultadoAxeLMS["estado"], string> = {
    Pasa: "D1FAE5",
    "No pasa": "FEE2E2",
    Incompleto: "FEF3C7",
  };
  return colores[estado];
}

function estadoContenidoColor(estado: EvaluacionContenidoWhatsApp["estado"]): string {
  const colores: Record<EvaluacionContenidoWhatsApp["estado"], string> = {
    Optimo: "D1FAE5",
    Cumple: "DBEAFE",
  };
  return colores[estado];
}

function tagsResumen(tags: string[]): string {
  const wcagTags = tags.filter((tag) => tag.startsWith("wcag") || tag === "best-practice");
  return wcagTags.length > 0 ? wcagTags.join(", ") : "Sin tag WCAG directo";
}

async function fetchImageBuffer(ruta: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(ruta);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

async function generarDocumento(): Promise<Blob> {
  const children: (Paragraph | Table)[] = [];

  // === Sección 1: Encabezado ===
  children.push(
    new Paragraph({
      text: "Reporte de Evaluación de Accesibilidad",
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Entregable E3 — Proyecto Final Integrador", size: 28, color: "6B7280" }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Herramienta: ", bold: true, size: 24 }),
        new TextRun({ text: `${herramientaAuditoria.nombre} v${herramientaAuditoria.version} (${herramientaAuditoria.tipo})`, size: 24 }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Fecha: ", bold: true, size: 24 }),
        new TextRun({ text: new Date().toLocaleDateString("es-HN", { year: "numeric", month: "long", day: "numeric" }), size: 24 }),
      ],
      spacing: { after: 400 },
    }),
  );

  // === Sección 2: Resumen ejecutivo ===
  children.push(
    new Paragraph({
      text: "Resumen ejecutivo",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
  );

  const totalLMS = resultadosAxeLMS.length;
  const pasanLMS = resultadosAxeLMS.filter((r) => r.estado === "Pasa").length;
  const noPasanLMS = resultadosAxeLMS.filter((r) => r.estado === "No pasa").length;
  const incompletosLMS = resultadosAxeLMS.filter((r) => r.estado === "Incompleto").length;

  children.push(
    new Table({
      rows: [
        new TableRow({
          children: ["Reglas axe LMS", "Pasan", "Incompletas", "No pasan"].map(
            (text) =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 22 })], alignment: AlignmentType.CENTER })],
                width: { size: 25, type: WidthType.PERCENTAGE },
                shading: { type: "clear", fill: "F3F4F6" },
              })
          ),
        }),
        new TableRow({
          children: [totalLMS, pasanLMS, incompletosLMS, noPasanLMS].map(
            (valor) =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: String(valor), size: 24, bold: true })], alignment: AlignmentType.CENTER })],
                width: { size: 25, type: WidthType.PERCENTAGE },
              })
          ),
        }),
      ],
    }),
    new Paragraph({ spacing: { after: 200 } }),
    new Paragraph({
      children: [
        new TextRun({ text: "Plataforma Web (LMS): ", bold: true, size: 24 }),
        new TextRun({ text: `${resumenAuditoria.lms.metodologia} Resultado: ${resumenAuditoria.lms.passes} passes, ${resumenAuditoria.lms.violations} violaciones, ${resumenAuditoria.lms.incomplete} incompletas.`, size: 24 }),
      ],
      spacing: { after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Delivery Adaptativo por WhatsApp: ", bold: true, size: 24 }),
        new TextRun({ text: `${resumenAuditoria.whatsapp.metodologia} ${resumenAuditoria.whatsapp.nota}`, size: 24 }),
      ],
      spacing: { after: 400 },
    }),
  );

  // === Sección 3: Reglas axe LMS ===
  children.push(
    new Paragraph({
      text: "Reglas axe evaluadas en Plataforma Web (LMS)",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
  );

  const headerCells = ["Plataforma", "Estado", "Regla axe", "Descripcion", "Impacto", "Nodos", "Tags", "Accion"].map(
    (text) =>
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
        shading: { type: "clear", fill: "1E40AF" },
      })
  );

  const dataRows = resultadosAxeLMS.map((r: ResultadoAxeLMS) =>
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.plataforma, size: 20 })], alignment: AlignmentType.CENTER })] }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: r.estado, size: 20, bold: true })], alignment: AlignmentType.CENTER })],
          shading: { type: "clear", fill: estadoAxeColor(r.estado) },
        }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.regla, size: 20, font: "Consolas" })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.descripcion, size: 20 })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.impacto, size: 20 })], alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: String(r.nodosEvaluados), size: 20 })], alignment: AlignmentType.CENTER })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: tagsResumen(r.tags), size: 18 })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: r.accionRecomendada, size: 20 })] })] }),
      ],
    })
  );

  children.push(
    new Table({
      rows: [new TableRow({ children: headerCells }), ...dataRows],
    }),
    new Paragraph({ spacing: { after: 400 } }),
  );

  // === Sección 4: WhatsApp content evaluation ===
  children.push(
    new Paragraph({
      text: "Delivery Adaptativo por WhatsApp - Evaluacion del contenido",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: resumenAuditoria.whatsapp.nota, size: 24 })],
      spacing: { after: 200 },
    }),
  );

  const whatsappHeaderCells = ["Formato", "Estado", "Criterio", "Evidencia", "Observacion"].map(
    (text) =>
      new TableCell({
        children: [new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
        shading: { type: "clear", fill: "2563EB" },
      })
  );

  const whatsappRows = evaluacionContenidoWhatsApp.map((item) =>
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.formato, size: 20, bold: true })] })] }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: item.estado, size: 20, bold: true })], alignment: AlignmentType.CENTER })],
          shading: { type: "clear", fill: estadoContenidoColor(item.estado) },
        }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.criterio, size: 20 })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.evidencia, size: 20 })] })] }),
        new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: item.observacion, size: 20 })] })] }),
      ],
    })
  );

  children.push(
    new Table({
      rows: [new TableRow({ children: whatsappHeaderCells }), ...whatsappRows],
    }),
    new Paragraph({ spacing: { after: 400 } }),
  );

  // === Sección 5: Principios POUR ===
  children.push(
    new Paragraph({
      text: "Principios POUR — Aplicación por plataforma",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
  );

  for (const p of principiosPOURReporte) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: p.principio, bold: true, size: 28, color: "1E40AF" })],
        spacing: { before: 300, after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: p.descripcion, size: 24 })],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "LMS: ", bold: true, size: 22, color: "6B7280" }),
          new TextRun({ text: p.aplicacionLMS, size: 22 }),
        ],
        spacing: { after: 60 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "WhatsApp: ", bold: true, size: 22, color: "6B7280" }),
          new TextRun({ text: p.aplicacionWhatsApp, size: 22 }),
        ],
        spacing: { after: 200 },
      }),
    );
  }

  // === Sección 6: Iteraciones de mejora ===
  children.push(
    new Paragraph({
      text: "Iteraciones de mejora documentadas",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
  );

  for (const it of iteracionesMejora) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: it.titulo, bold: true, size: 26 })],
        spacing: { before: 300, after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: it.descripcion, size: 24 })],
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "ANTES", bold: true, size: 22, color: "DC2626" })],
        spacing: { after: 40 },
      }),
      new Paragraph({
        children: [new TextRun({ text: it.antes, size: 22 })],
        shading: { type: "clear", fill: "FEE2E2" },
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: "DESPUÉS", bold: true, size: 22, color: "16A34A" })],
        spacing: { after: 40 },
      }),
      new Paragraph({
        children: [new TextRun({ text: it.despues, size: 22 })],
        shading: { type: "clear", fill: "D1FAE5" },
        spacing: { after: 300 },
      }),
    );
  }

  // === Sección 7: Evidencia visual ===
  children.push(
    new Paragraph({
      text: "Evidencia visual y metodologica",
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 },
    }),
  );

  for (const img of imagenes) {
    const buffer = await fetchImageBuffer(img.ruta);
    if (buffer) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: img.titulo, bold: true, size: 22 })],
          spacing: { before: 300, after: 100 },
        }),
        new Paragraph({
          children: [
            new ImageRun({
              data: buffer,
              transformation: {
                width: pxToEmu(img.anchoPx),
                height: pxToEmu(img.altoPx),
              },
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
        }),
      );
    } else {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `[Imagen no disponible: ${img.nombre}]`, size: 22, italics: true, color: "9CA3AF" })],
          spacing: { after: 200 },
        }),
      );
    }
  }

  const doc = new Document({
    title: "E3 - Reporte de Evaluación de Accesibilidad",
    description: "Reporte de accesibilidad WCAG 2.2 del proyecto Aula Inclusiva HN",
    creator: "Aula Inclusiva HN - UTH",
    sections: [{ children }],
  });

  return await Packer.toBlob(doc);
}

export default function ExportWordButton() {
  const [generando, setGenerando] = useState(false);

  async function handleExport() {
    if (generando) return;
    setGenerando(true);
    try {
      const blob = await generarDocumento();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "E3-reporte-accesibilidad.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generando .docx:", err);
      alert("Ocurrió un error al generar el documento. Intenta de nuevo.");
    } finally {
      setGenerando(false);
    }
  }

  return (
    <button
      onClick={handleExport}
      disabled={generando}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Exportar reporte de accesibilidad a Word"
    >
      <span aria-hidden="true">📄</span>
      {generando ? "Generando..." : "Exportar a Word (.docx)"}
    </button>
  );
}
