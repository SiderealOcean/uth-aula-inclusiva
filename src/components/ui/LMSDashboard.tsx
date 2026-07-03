"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";

type Vista = "estudiante" | "organizacion";

const cursosInscritos = [
  {
    titulo: "Introducción a la Computación",
    organizacion: "Fundación Educativa HN",
    modulos: 8,
    formatos: ["📝", "🖼️", "🎙️", "🎬"],
    duracion: "4 semanas",
    progreso: 62,
    completado: 5,
  },
  {
    titulo: "Emprendimiento Rural",
    organizacion: "ONG Impulso HN",
    modulos: 10,
    formatos: ["📝", "🖼️", "🎙️"],
    duracion: "6 semanas",
    progreso: 100,
    completado: 10,
  },
  {
    titulo: "Alfabetización Digital Básica",
    organizacion: "CONATEL",
    modulos: 5,
    formatos: ["📝", "🎙️"],
    duracion: "2 semanas",
    progreso: 20,
    completado: 1,
  },
];

const modulosCursoActivo = [
  { numero: 1, titulo: "¿Qué es una computadora?", completado: true },
  { numero: 2, titulo: "Hardware vs Software", completado: true },
  { numero: 3, titulo: "Componentes de una PC", completado: true },
  { numero: 4, titulo: "Sistema operativo", completado: true },
  { numero: 5, titulo: "Archivos y carpetas", completado: true },
  { numero: 6, titulo: "Navegación web segura", completado: false },
  { numero: 7, titulo: "Correo electrónico", completado: false },
  { numero: 8, titulo: "Evaluación final", completado: false },
];

const cursosDisponibles = [
  {
    titulo: "Higiene y Salud Familiar",
    organizacion: "Secretaría de Salud",
    modulos: 6,
    formatos: ["📝", "🖼️", "🎙️"],
    duracion: "3 semanas",
  },
  {
    titulo: "Agricultura Sostenible",
    organizacion: "FAO Honduras",
    modulos: 12,
    formatos: ["📝", "🖼️", "🎙️", "🎬"],
    duracion: "8 semanas",
  },
  {
    titulo: "Gestión Financiera para Microempresas",
    organizacion: "Banco de Occidente",
    modulos: 7,
    formatos: ["📝", "🎙️"],
    duracion: "4 semanas",
  },
];

const cursosEnRevision = [
  { titulo: "Derechos Laborales en Honduras", organizacion: "Ministerio de Trabajo", estado: "Pendiente IA", color: "amber" },
  { titulo: "Prevención de Violencia de Género", organizacion: "ONU Mujeres HN", estado: "Listo para revisar", color: "blue" },
  { titulo: "Nutrición Infantil 0-5 años", organizacion: "UNICEF Honduras", estado: "Pendiente IA", color: "amber" },
];

export default function LMSDashboard() {
  const [vista, setVista] = useState<Vista>("estudiante");
  const [cursoExpandido, setCursoExpandido] = useState<string | null>(null);

  const cursoCertificado = cursosInscritos.find((c) => c.progreso === 100);

  return (
    <div
      className="border border-gray-300 rounded-xl overflow-hidden shadow-2xl bg-white"
      role="region"
      aria-label="Dashboard del LMS — Simulación interactiva"
    >
      {/* Top bar */}
      <div className="bg-brand-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl" aria-hidden="true">
            🎓
          </div>
          <div>
            <p className="font-bold text-lg">Aula Inclusiva HN</p>
            <p className="text-xs opacity-70">Plataforma LMS</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
          <span className="text-sm font-medium">👤 {vista === "estudiante" ? "María López" : "ONG Impulso HN"}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => setVista("estudiante")}
          className={`flex-1 px-6 py-3 text-sm font-bold transition-colors ${
            vista === "estudiante"
              ? "text-brand-700 border-b-2 border-brand-500 bg-white"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-selected={vista === "estudiante"}
          role="tab"
        >
          🎓 Vista de Estudiante
        </button>
        <button
          onClick={() => setVista("organizacion")}
          className={`flex-1 px-6 py-3 text-sm font-bold transition-colors ${
            vista === "organizacion"
              ? "text-brand-700 border-b-2 border-brand-500 bg-white"
              : "text-gray-500 hover:text-gray-700"
          }`}
          aria-selected={vista === "organizacion"}
          role="tab"
        >
          🏛️ Vista de Organización
        </button>
      </div>

      {/* Body: sidebar + content */}
      <div className="flex min-h-[520px]">
        {/* Sidebar */}
        <aside className="w-52 bg-gray-100 border-r border-gray-200 p-4 shrink-0">
          <nav aria-label="Navegación del panel">
            <ul className="space-y-1">
              {vista === "estudiante" ? (
                ([
                  { icon: "📊", label: "Dashboard", active: true },
                  { icon: "📚", label: "Mis Cursos", active: false },
                  { icon: "🗂️", label: "Catálogo", active: false },
                  { icon: "🏆", label: "Certificados", active: false },
                  { icon: "⚙️", label: "Mi Perfil", active: false },
                ] as const).map((item) => (
                  <li key={item.label}>
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        item.active
                          ? "bg-brand-500 text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span aria-hidden="true">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))
              ) : (
                ([
                  { icon: "📊", label: "Mis Cursos", active: true },
                  { icon: "📤", label: "Subir Machote", active: false },
                  { icon: "🔍", label: "En Revisión", active: false },
                  { icon: "👥", label: "Estudiantes", active: false },
                  { icon: "📈", label: "Reportes", active: false },
                ] as const).map((item) => (
                  <li key={item.label}>
                    <button
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        item.active
                          ? "bg-brand-500 text-white font-semibold"
                          : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <span aria-hidden="true">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {vista === "estudiante" ? (
            <VistaEstudiante
              cursoExpandido={cursoExpandido}
              setCursoExpandido={setCursoExpandido}
              cursoCertificado={cursoCertificado}
            />
          ) : (
            <VistaOrganizacion />
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500 text-center">
        Simulación interactiva · Dashboard LMS · Los datos son ilustrativos
      </div>
    </div>
  );
}

/* ── Vista Estudiante ── */

function VistaEstudiante({
  cursoExpandido,
  setCursoExpandido,
  cursoCertificado,
}: {
  cursoExpandido: string | null;
  setCursoExpandido: (v: string | null) => void;
  cursoCertificado: typeof cursosInscritos[number] | undefined;
}) {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-brand-900">3</p>
          <p className="text-xs text-brand-700 font-medium">Cursos activos</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-800">1</p>
          <p className="text-xs text-green-700 font-medium">Certificado</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-800">60%</p>
          <p className="text-xs text-amber-700 font-medium">Progreso global</p>
        </div>
      </div>

      {/* Mis cursos */}
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        📚 Mis Cursos
      </h3>
      <div className="space-y-3 mb-8">
        {cursosInscritos.map((c) => (
          <div key={c.titulo}>
            <div
              className="cursor-pointer"
              onClick={() =>
                setCursoExpandido(cursoExpandido === c.titulo ? null : c.titulo)
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setCursoExpandido(cursoExpandido === c.titulo ? null : c.titulo);
                }
              }}
              aria-expanded={cursoExpandido === c.titulo}
            >
              <CourseCard {...c} />
            </div>
            {cursoExpandido === c.titulo && (
              <div className="mt-1 bg-gray-50 border border-gray-200 rounded-lg p-4 animate-[fadeIn_0.2s_ease-in]">
                <h4 className="text-sm font-bold mb-2 text-gray-700">
                  Módulos del curso
                </h4>
                <ul className="space-y-1.5">
                  {modulosCursoActivo.map((m) => (
                    <li
                      key={m.numero}
                      className="flex items-center gap-3 text-sm py-1.5 px-2 rounded hover:bg-white"
                    >
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                          m.completado
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                        aria-hidden="true"
                      >
                        {m.completado ? "✓" : m.numero}
                      </div>
                      <span className="flex-1 text-gray-700">
                        {m.numero}. {m.titulo}
                      </span>
                      <span className="text-xs text-gray-500">
                        {m.completado ? "Completado" : "Pendiente"}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs bg-brand-500 text-white px-3 py-1.5 rounded font-medium hover:bg-brand-700">
                    ▶️ Continuar lección 6
                  </button>
                  <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1.5 rounded font-medium hover:bg-gray-300">
                    📥 Recibir por WhatsApp
                  </button>
                </div>
            </div>
            )}
          </div>
        ))}
      </div>

      {/* Certificado */}
      {cursoCertificado && (
        <>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            🏅 Certificado Obtenido
          </h3>
          <div className="max-w-2xl border-4 border-amber-400 rounded-xl p-6 bg-gradient-to-br from-amber-50 to-white shadow-md mb-8">
            <div className="text-center">
              <div className="text-4xl mb-2" aria-hidden="true">🏅</div>
              <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">
                Certificado de Finalización
              </p>
              <p className="text-lg font-bold text-gray-900 mb-1">
                María López
              </p>
              <p className="text-sm text-gray-600 mb-3">
                ha completado satisfactoriamente el curso
              </p>
              <p className="text-xl font-bold text-brand-700 mb-3">
                {cursoCertificado.titulo}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                Organizado por {cursoCertificado.organizacion} · {cursoCertificado.duracion}
              </p>
              <div className="flex justify-between items-end text-xs text-gray-500">
                <div className="text-left">
                  <p className="font-bold text-gray-700">Fecha</p>
                  <p>15 de Junio, 2026</p>
                </div>
                <div className="text-center">
                  <span className="text-3xl" aria-hidden="true">🔖</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-700"> Código</p>
                  <p className="font-mono">UTH-AIHN-2026-001</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Catálogo */}
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        🗂️ Cursos Disponibles
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        {cursosDisponibles.map((c) => (
          <div key={c.titulo}>
            <CourseCard {...c} />
            <button className="mt-2 w-full text-xs bg-brand-100 text-brand-700 py-1.5 rounded font-medium hover:bg-brand-200 transition-colors">
              ➕ Suscribirse
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Vista Organización ── */

function VistaOrganizacion() {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-900">2</p>
          <p className="text-xs text-blue-700 font-medium">Cursos publicados</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-800">3</p>
          <p className="text-xs text-amber-700 font-medium">En revisión</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-800">847</p>
          <p className="text-xs text-green-700 font-medium">Estudiantes activos</p>
        </div>
      </div>

      {/* IA Pipeline */}
      <h3 className="text-lg font-bold mb-3">🤖 Pipeline de Creación con IA</h3>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between gap-2 text-sm">
          {[
            { paso: "📤", label: "Machote subido", estado: "done" },
            { paso: "🤖", label: "IA procesando", estado: "active" },
            { paso: "🔍", label: "Revisión ONG", estado: "pending" },
            { paso: "🚀", label: "Publicado", estado: "pending" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center gap-2">
              {i > 0 && (
                <div
                  className={`h-1 w-8 rounded ${
                    s.estado === "done" ? "bg-green-400" : "bg-gray-200"
                  }`}
                />
              )}
              <div className="text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mx-auto mb-1 ${
                    s.estado === "done"
                      ? "bg-green-100"
                      : s.estado === "active"
                        ? "bg-blue-500 text-white animate-pulse"
                        : "bg-gray-100 text-gray-400"
                  }`}
                  aria-hidden="true"
                >
                  {s.paso}
                </div>
                <p className={`text-xs font-medium ${
                  s.estado === "pending" ? "text-gray-400" : "text-gray-700"
                }`}>
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cursos en revisión */}
      <h3 className="text-lg font-bold mb-3">🔍 Cursos en Revisión</h3>
      <div className="space-y-3 mb-8">
        {cursosEnRevision.map((c) => (
          <div
            key={c.titulo}
            className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
          >
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm">{c.titulo}</h4>
              <p className="text-xs text-gray-500">{c.organizacion}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  c.color === "amber"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {c.estado}
              </span>
              {c.color === "blue" ? (
                <button className="text-xs bg-green-500 text-white px-3 py-1.5 rounded font-medium hover:bg-green-600">
                  ✅ Publicar
                </button>
              ) : (
                <button className="text-xs bg-gray-200 text-gray-600 px-3 py-1.5 rounded font-medium cursor-not-allowed">
                  ⏳ Esperando IA
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botón subir machote */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-400 hover:bg-brand-50/30 transition-colors cursor-pointer">
        <div className="text-3xl mb-2" aria-hidden="true">📤</div>
        <p className="font-bold text-gray-700 mb-1">Subir nuevo machote</p>
        <p className="text-xs text-gray-500">
          PDF, DOCX o texto plano · La IA generará audio, evaluaciones y formatos accesibles automáticamente
        </p>
      </div>
    </>
  );
}