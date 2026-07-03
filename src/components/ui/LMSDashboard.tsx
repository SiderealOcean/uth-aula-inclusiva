"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";

type Vista = "estudiante" | "organizacion";
type TabEstudiante = "dashboard" | "cursos" | "catalogo" | "certificados" | "perfil";
type TabOrganizacion = "org-cursos" | "subir" | "revision" | "estudiantes" | "reportes";

const cursosInscritos = [
  { titulo: "Introducción a la Computación", organizacion: "Fundación Educativa HN", modulos: 8, formatos: ["📝", "🖼️", "🎙️", "🎬"], duracion: "4 semanas", progreso: 62, completado: 5 },
  { titulo: "Emprendimiento Rural", organizacion: "ONG Impulso HN", modulos: 10, formatos: ["📝", "🖼️", "🎙️"], duracion: "6 semanas", progreso: 100, completado: 10 },
  { titulo: "Alfabetización Digital Básica", organizacion: "CONATEL", modulos: 5, formatos: ["📝", "🎙️"], duracion: "2 semanas", progreso: 20, completado: 1 },
];

const modulosCurso = [
  { titulo: "¿Qué es una computadora?", completado: true },
  { titulo: "Hardware vs Software", completado: true },
  { titulo: "Componentes de una PC", completado: true },
  { titulo: "Sistema operativo", completado: true },
  { titulo: "Archivos y carpetas", completado: true },
  { titulo: "Navegación web segura", completado: false },
  { titulo: "Correo electrónico", completado: false },
  { titulo: "Evaluación final", completado: false },
];

const cursosDisponibles = [
  { titulo: "Higiene y Salud Familiar", organizacion: "Secretaría de Salud", modulos: 6, formatos: ["📝", "🖼️", "🎙️"], duracion: "3 semanas" },
  { titulo: "Agricultura Sostenible", organizacion: "FAO Honduras", modulos: 12, formatos: ["📝", "🖼️", "🎙️", "🎬"], duracion: "8 semanas" },
  { titulo: "Gestión Financiera para Microempresas", organizacion: "Banco de Occidente", modulos: 7, formatos: ["📝", "🎙️"], duracion: "4 semanas" },
  { titulo: "Derechos Humanos y Ciudadanía", organizacion: "ONG Impulso HN", modulos: 5, formatos: ["📝", "🎙️", "🎬"], duracion: "2 semanas" },
  { titulo: "Ofimática Básica", organizacion: "Fundación Educativa HN", modulos: 9, formatos: ["📝", "🖼️", "🎙️", "🎬"], duracion: "5 semanas" },
  { titulo: "Prevención de Desastres Naturales", organizacion: "COPECO", modulos: 4, formatos: ["📝", "🎙️"], duracion: "1 semana" },
];

const certificadosData = [
  { curso: "Introducción a la Computación", organizacion: "Fundación Educativa HN", fecha: "15 de Junio, 2026", codigo: "UTH-AIHN-2026-001", nota: "95/100" },
  { curso: "Emprendimiento Rural", organizacion: "ONG Impulso HN", fecha: "20 de Mayo, 2026", codigo: "UTH-AIHN-2026-002", nota: "88/100" },
];

const cursosEnRevision = [
  { titulo: "Derechos Laborales en Honduras", organizacion: "Ministerio de Trabajo", estado: "Pendiente IA", color: "amber" },
  { titulo: "Prevención de Violencia de Género", organizacion: "ONU Mujeres HN", estado: "Listo para revisar", color: "blue" },
  { titulo: "Nutrición Infantil 0-5 años", organizacion: "UNICEF Honduras", estado: "Pendiente IA", color: "amber" },
  { titulo: "Educación Financiera para Jóvenes", organizacion: "Banco Central HN", estado: "Listo para revisar", color: "blue" },
  { titulo: "Salud Mental en el Trabajo", organizacion: "OPS/OMS", estado: "Pendiente IA", color: "amber" },
];

const estudiantesData = [
  { nombre: "María López", cursos: 3, progreso: "60%", ultimoAcceso: "Hoy 9:41 AM" },
  { nombre: "Carlos Méndez", cursos: 1, progreso: "100%", ultimoAcceso: "Ayer 3:15 PM" },
  { nombre: "Ana Rivera", cursos: 2, progreso: "35%", ultimoAcceso: "Hace 2 días" },
  { nombre: "José Hernández", cursos: 4, progreso: "72%", ultimoAcceso: "Hace 1 hora" },
  { nombre: "Luisa Fernández", cursos: 1, progreso: "10%", ultimoAcceso: "Hace 3 días" },
  { nombre: "Pedro Castillo", cursos: 2, progreso: "50%", ultimoAcceso: "Hoy 7:30 AM" },
];

const sidebarItemsEstudiante: { icon: string; label: string; tab: TabEstudiante }[] = [
  { icon: "📊", label: "Dashboard", tab: "dashboard" },
  { icon: "📚", label: "Mis Cursos", tab: "cursos" },
  { icon: "🗂️", label: "Catálogo", tab: "catalogo" },
  { icon: "🏆", label: "Certificados", tab: "certificados" },
  { icon: "⚙️", label: "Mi Perfil", tab: "perfil" },
];

const sidebarItemsOrganizacion: { icon: string; label: string; tab: TabOrganizacion }[] = [
  { icon: "📊", label: "Mis Cursos", tab: "org-cursos" },
  { icon: "📤", label: "Subir Machote", tab: "subir" },
  { icon: "🔍", label: "En Revisión", tab: "revision" },
  { icon: "👥", label: "Estudiantes", tab: "estudiantes" },
  { icon: "📈", label: "Reportes", tab: "reportes" },
];

export default function LMSDashboard() {
  const [vista, setVista] = useState<Vista>("estudiante");
  const [tabEstudiante, setTabEstudiante] = useState<TabEstudiante>("dashboard");
  const [tabOrganizacion, setTabOrganizacion] = useState<TabOrganizacion>("org-cursos");
  const [cursoExpandido, setCursoExpandido] = useState<string | null>(null);

  const items = vista === "estudiante" ? sidebarItemsEstudiante : sidebarItemsOrganizacion;
  const tabActivo = vista === "estudiante" ? tabEstudiante : tabOrganizacion;

  return (
    <div
      className="border border-gray-300 rounded-xl overflow-hidden shadow-2xl bg-white"
      role="region"
      aria-label="Dashboard del LMS — Simulación interactiva"
    >
      {/* Top bar */}
      <div className="bg-brand-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl" aria-hidden="true">🎓</div>
          <div>
            <p className="font-bold text-lg">Aula Inclusiva HN</p>
            <p className="text-xs opacity-70">Plataforma LMS</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5">
          <span className="text-sm font-medium">
            👤 {vista === "estudiante" ? "María López" : "ONG Impulso HN"}
          </span>
        </div>
      </div>

      {/* Tabs: Estudiante / Organización */}
      <div className="flex border-b border-gray-200 bg-gray-50" role="tablist" aria-label="Selección de vista">
        {(["estudiante", "organizacion"] as Vista[]).map((v) => (
          <button
            key={v}
            onClick={() => setVista(v)}
            className={`flex-1 px-6 py-3 text-sm font-bold transition-colors ${
              vista === v
                ? "text-brand-700 border-b-2 border-brand-500 bg-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-selected={vista === v}
            role="tab"
          >
            {v === "estudiante" ? "🎓 Vista de Estudiante" : "🏛️ Vista de Organización"}
          </button>
        ))}
      </div>

      {/* Body: sidebar + content */}
      <div className="flex min-h-[560px]">
        <aside className="w-52 bg-gray-100 border-r border-gray-200 p-4 shrink-0">
          <nav aria-label="Navegación del panel">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => {
                      if (vista === "estudiante") setTabEstudiante(item.tab as TabEstudiante);
                      else setTabOrganizacion(item.tab as TabOrganizacion);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      tabActivo === item.tab
                        ? "bg-brand-500 text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                    aria-current={tabActivo === item.tab ? "page" : undefined}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="flex-1 p-6 overflow-y-auto">
          {vista === "estudiante" ? (
            <ContenidoEstudiante
              tab={tabEstudiante}
              cursoExpandido={cursoExpandido}
              setCursoExpandido={setCursoExpandido}
            />
          ) : (
            <ContenidoOrganizacion tab={tabOrganizacion} />
          )}
        </div>
      </div>

      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500 text-center">
        Simulación interactiva · Dashboard LMS · Los datos son ilustrativos
      </div>
    </div>
  );
}

/* ════════════════════ CONTENIDO ESTUDIANTE ════════════════════ */

function ContenidoEstudiante({
  tab, cursoExpandido, setCursoExpandido,
}: {
  tab: TabEstudiante;
  cursoExpandido: string | null;
  setCursoExpandido: (v: string | null) => void;
}) {
  switch (tab) {
    case "dashboard": return <DashboardE />;
    case "cursos": return <MisCursosE cursoExpandido={cursoExpandido} setCursoExpandido={setCursoExpandido} />;
    case "catalogo": return <CatalogoE />;
    case "certificados": return <CertificadosE />;
    case "perfil": return <PerfilE />;
  }
}

function DashboardE() {
  const cursoCertificado = cursosInscritos.find((c) => c.progreso === 100);
  return (
    <>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-brand-900">3</p>
          <p className="text-xs text-brand-700 font-medium">Cursos activos</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-800">2</p>
          <p className="text-xs text-green-700 font-medium">Certificados</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-800">60%</p>
          <p className="text-xs text-amber-700 font-medium">Progreso global</p>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">📚 En progreso</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {cursosInscritos.filter((c) => c.progreso < 100).map((c) => (
          <div key={c.titulo} className="cursor-pointer" onClick={() => {}} role="button" tabIndex={0}>
            <CourseCard {...c} />
          </div>
        ))}
      </div>

      {cursoCertificado && (
        <>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">🏅 Último certificado</h3>
          <div className="max-w-xl border-4 border-amber-400 rounded-xl p-6 bg-gradient-to-br from-amber-50 to-white shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl mb-2" aria-hidden="true">🏅</div>
              <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Certificado de Finalización</p>
              <p className="text-lg font-bold text-gray-900 mb-1">María López</p>
              <p className="text-sm text-gray-600 mb-3">ha completado satisfactoriamente el curso</p>
              <p className="text-xl font-bold text-brand-700 mb-3">{cursoCertificado.titulo}</p>
              <p className="text-xs text-gray-500 mb-4">Organizado por {cursoCertificado.organizacion} · {cursoCertificado.duracion}</p>
              <div className="flex justify-between items-end text-xs text-gray-500">
                <div className="text-left"><p className="font-bold text-gray-700">Fecha</p><p>15 de Junio, 2026</p></div>
                <div className="text-center"><span className="text-3xl" aria-hidden="true">🔖</span></div>
                <div className="text-right"><p className="font-bold text-gray-700">Código</p><p className="font-mono">UTH-AIHN-2026-001</p></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function MisCursosE({ cursoExpandido, setCursoExpandido }: {
  cursoExpandido: string | null;
  setCursoExpandido: (v: string | null) => void;
}) {
  const [filtro, setFiltro] = useState<"todos" | "progreso" | "completados">("todos");
  const filtrados = cursosInscritos.filter((c) => {
    if (filtro === "completados") return c.progreso === 100;
    if (filtro === "progreso") return c.progreso < 100;
    return true;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">📚 Mis Cursos ({filtrados.length})</h3>
        <div className="flex gap-1 text-xs">
          {(["todos", "progreso", "completados"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`px-3 py-1.5 rounded-full font-medium transition-colors ${
                filtro === f
                  ? "bg-brand-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              }`}
            >
              {f === "todos" ? "Todos" : f === "progreso" ? "En progreso" : "Completados"}
            </button>
          ))}
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center">No hay cursos en esta categoría.</p>
      ) : (
        <div className="space-y-3">
          {filtrados.map((c) => (
            <div key={c.titulo}>
              <div
                className="cursor-pointer"
                onClick={() => setCursoExpandido(cursoExpandido === c.titulo ? null : c.titulo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setCursoExpandido(cursoExpandido === c.titulo ? null : c.titulo); }}
                aria-expanded={cursoExpandido === c.titulo}
              >
                <CourseCard {...c} />
              </div>
              {cursoExpandido === c.titulo && (
                <div className="mt-1 bg-gray-50 border border-gray-200 rounded-lg p-4 animate-[fadeIn_0.2s_ease-in]">
                  <h4 className="text-sm font-bold mb-2 text-gray-700">Módulos del curso</h4>
                  <ul className="space-y-1.5">
                    {modulosCurso.map((m, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm py-1.5 px-2 rounded hover:bg-white">
                        <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${m.completado ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`} aria-hidden="true">
                          {m.completado ? "✓" : i + 1}
                        </div>
                        <span className="flex-1 text-gray-700">{i + 1}. {m.titulo}</span>
                        <span className="text-xs text-gray-500">{m.completado ? "Completado" : "Pendiente"}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex gap-2">
                    <button className="text-xs bg-brand-500 text-white px-3 py-1.5 rounded font-medium hover:bg-brand-700">▶️ Continuar lección</button>
                    <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1.5 rounded font-medium hover:bg-gray-300">📥 Recibir por WhatsApp</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function CatalogoE() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroFormato, setFiltroFormato] = useState<string | null>(null);
  const [inscrito, setInscrito] = useState<Set<string>>(new Set(["Higiene y Salud Familiar"]));

  const formatosDisponibles = ["📝", "🖼️", "🎙️", "🎬"];

  const filtrados = cursosDisponibles.filter((c) => {
    if (busqueda && !c.titulo.toLowerCase().includes(busqueda.toLowerCase())) return false;
    if (filtroFormato && !c.formatos.includes(filtroFormato)) return false;
    return true;
  });

  const toggleInscrito = (titulo: string) => {
    const nuevo = new Set(inscrito);
    if (nuevo.has(titulo)) nuevo.delete(titulo);
    else nuevo.add(titulo);
    setInscrito(nuevo);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="text-lg font-bold flex items-center gap-2">🗂️ Catálogo de Cursos</h3>
        <input
          type="text"
          placeholder="Buscar curso..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 w-56 focus:outline-brand-500"
          aria-label="Buscar curso por nombre"
        />
      </div>

      <div className="flex gap-1 text-xs mb-4">
        <button
          onClick={() => setFiltroFormato(null)}
          className={`px-3 py-1.5 rounded-full font-medium transition-colors ${!filtroFormato ? "bg-brand-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
        >
          Todos
        </button>
        {formatosDisponibles.map((f) => (
          <button
            key={f}
            onClick={() => setFiltroFormato(filtroFormato === f ? null : f)}
            className={`px-3 py-1.5 rounded-full font-medium transition-colors ${filtroFormato === f ? "bg-brand-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filtrados.map((c) => {
          const yaInscrito = inscrito.has(c.titulo);
          return (
            <div key={c.titulo} className="relative">
              <CourseCard {...c} />
              <button
                onClick={() => toggleInscrito(c.titulo)}
                className={`mt-2 w-full text-xs py-1.5 rounded font-medium transition-colors ${
                  yaInscrito
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-brand-100 text-brand-700 hover:bg-brand-200"
                }`}
              >
                {yaInscrito ? "✅ Inscrito" : "➕ Suscribirse"}
              </button>
            </div>
          );
        })}
      </div>

      {filtrados.length === 0 && (
        <p className="text-gray-500 text-sm py-8 text-center">No se encontraron cursos con esos filtros.</p>
      )}
    </>
  );
}

function CertificadosE() {
  return (
    <>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🏆 Mis Certificados</h3>

      {certificadosData.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center">Aún no has obtenido ningún certificado.</p>
      ) : (
        <div className="space-y-6">
          {certificadosData.map((cert) => (
            <div key={cert.codigo}>
              <div className="max-w-xl border-4 border-amber-400 rounded-xl p-6 bg-gradient-to-br from-amber-50 to-white shadow-md mx-auto">
                <div className="text-center">
                  <div className="text-4xl mb-2" aria-hidden="true">🏅</div>
                  <p className="text-xs uppercase tracking-widest text-amber-600 font-bold mb-2">Certificado de Finalización</p>
                  <p className="text-lg font-bold text-gray-900 mb-1">María López</p>
                  <p className="text-sm text-gray-600 mb-3">ha completado satisfactoriamente el curso</p>
                  <p className="text-xl font-bold text-brand-700 mb-3">{cert.curso}</p>
                  <p className="text-xs text-gray-500 mb-1">Organizado por {cert.organizacion}</p>
                  <p className="text-xs text-gray-500 mb-4">Nota final: <strong>{cert.nota}</strong></p>
                  <div className="flex justify-between items-end text-xs text-gray-500">
                    <div className="text-left"><p className="font-bold text-gray-700">Fecha</p><p>{cert.fecha}</p></div>
                    <div className="text-center"><span className="text-3xl" aria-hidden="true">🔖</span></div>
                    <div className="text-right"><p className="font-bold text-gray-700">Código</p><p className="font-mono">{cert.codigo}</p></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-3">
                <button className="text-xs bg-brand-500 text-white px-4 py-1.5 rounded font-medium hover:bg-brand-700">⬇️ Descargar PDF</button>
                <button className="text-xs bg-gray-200 text-gray-700 px-4 py-1.5 rounded font-medium hover:bg-gray-300">🔗 Compartir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function PerfilE() {
  const [conectividad, setConectividad] = useState<"baja" | "media" | "alta">("media");
  const [discapacidad, setDiscapacidad] = useState<string>("ninguna");
  const [horario, setHorario] = useState("9:00 AM");
  const [formatoPreferido, setFormatoPreferido] = useState("texto");

  const regla =
    conectividad === "baja" && discapacidad === "visual" ? "🎙️ Solo audio" :
    conectividad === "baja" ? "📝🖼️ Texto + imagen comprimida" :
    discapacidad === "visual" ? "🎙️📝 Audio + texto" :
    discapacidad === "daltonismo" ? "📝🖼️ Texto + imagen (paleta segura)" :
    discapacidad === "auditiva" ? "📝🎬 Texto + video subtitulado" :
    "📝🖼️🎙️🎬 Todos los formatos";

  return (
    <>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">⚙️ Mi Perfil de Accesibilidad</h3>
      <p className="text-sm text-gray-600 mb-6 max-w-lg">
        Configura cómo quieres recibir tu contenido educativo. El sistema adaptará automáticamente la entrega según tus preferencias.
      </p>

      <div className="max-w-lg space-y-5">
        {/* Conectividad */}
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">📶 Nivel de conectividad</label>
          <div className="flex gap-1">
            {(["baja", "media", "alta"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setConectividad(v)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  conectividad === v
                    ? "bg-brand-500 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {v === "baja" ? "📵 Baja (2G)" : v === "media" ? "📶 Media (3G)" : "📶 Alta (4G/WiFi)"}
              </button>
            ))}
          </div>
        </div>

        {/* Discapacidad */}
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">♿ Discapacidad / Preferencia</label>
          <div className="flex flex-wrap gap-1">
            {[
              { value: "ninguna", label: "🙂 Ninguna" },
              { value: "visual", label: "🦯 Visual" },
              { value: "auditiva", label: "🧏 Auditiva" },
              { value: "daltonismo", label: "👁️ Daltonismo" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setDiscapacidad(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  discapacidad === opt.value
                    ? "bg-brand-500 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horario preferido */}
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">🕐 Horario de entrega preferido</label>
          <select
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-brand-500"
            aria-label="Seleccionar horario"
          >
            {["6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "5:00 PM", "7:00 PM"].map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        {/* Formato preferido */}
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">📦 Formato preferido</label>
          <div className="flex flex-wrap gap-1">
            {[
              { value: "texto", label: "📝 Texto" },
              { value: "audio", label: "🎙️ Audio" },
              { value: "video", label: "🎬 Video" },
              { value: "todos", label: "📚 Todos" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFormatoPreferido(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  formatoPreferido === opt.value
                    ? "bg-brand-500 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Regla de adaptación resultante */}
        <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
          <p className="text-xs font-bold text-brand-700 uppercase mb-1">Formato asignado según tu perfil</p>
          <p className="text-lg font-bold text-brand-900">{regla}</p>
          <p className="text-xs text-brand-600 mt-2">
            Conectividad: {conectividad === "baja" ? "📵 2G" : conectividad === "media" ? "📶 3G" : "📶 4G/WiFi"} · Discapacidad: {discapacidad === "ninguna" ? "🙂 Ninguna" : discapacidad === "visual" ? "🦯 Visual" : discapacidad === "auditiva" ? "🧏 Auditiva" : "👁️ Daltonismo"}
          </p>
        </div>

        <button className="w-full bg-brand-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-brand-700 transition-colors">
          💾 Guardar cambios
        </button>
      </div>
    </>
  );
}

/* ════════════════════ CONTENIDO ORGANIZACIÓN ════════════════════ */

function ContenidoOrganizacion({ tab }: { tab: TabOrganizacion }) {
  switch (tab) {
    case "org-cursos": return <OrgDashboard />;
    case "subir": return <OrgSubir />;
    case "revision": return <OrgRevision />;
    case "estudiantes": return <OrgEstudiantes />;
    case "reportes": return <OrgReportes />;
  }
}

function OrgDashboard() {
  return (
    <>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-900">2</p>
          <p className="text-xs text-blue-700 font-medium">Cursos publicados</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-800">5</p>
          <p className="text-xs text-amber-700 font-medium">En revisión</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-800">847</p>
          <p className="text-xs text-green-700 font-medium">Estudiantes activos</p>
        </div>
      </div>

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
              {i > 0 && <div className={`h-1 w-8 rounded ${s.estado === "done" ? "bg-green-400" : "bg-gray-200"}`} />}
              <div className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mx-auto mb-1 ${
                  s.estado === "done" ? "bg-green-100" : s.estado === "active" ? "bg-blue-500 text-white animate-pulse" : "bg-gray-100 text-gray-400"
                }`} aria-hidden="true">{s.paso}</div>
                <p className={`text-xs font-medium ${s.estado === "pending" ? "text-gray-400" : "text-gray-700"}`}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-3">🔍 Cursos en Revisión</h3>
      <div className="space-y-3 mb-6">
        {cursosEnRevision.slice(0, 3).map((c) => (
          <div key={c.titulo} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm">{c.titulo}</h4>
              <p className="text-xs text-gray-500">{c.organizacion}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.color === "amber" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{c.estado}</span>
              {c.color === "blue" ? (
                <button className="text-xs bg-green-500 text-white px-3 py-1.5 rounded font-medium hover:bg-green-600">✅ Publicar</button>
              ) : (
                <button className="text-xs bg-gray-200 text-gray-600 px-3 py-1.5 rounded font-medium cursor-not-allowed">⏳ Esperando IA</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function OrgSubir() {
  const [paso, setPaso] = useState<"form" | "procesando" | "listo">("form");
  const [formatosIA, setFormatosIA] = useState({
    audio: true, resumen: true, paleta: true, evaluaciones: true,
  });

  const toggle = (key: keyof typeof formatosIA) => setFormatosIA((p) => ({ ...p, [key]: !p[key] }));

  return (
    <>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">📤 Subir Nuevo Machote</h3>
      <p className="text-sm text-gray-600 mb-6 max-w-lg">
        Carga tu contenido base y la IA generará automáticamente los formatos adaptativos.
      </p>

      {paso === "form" && (
        <div className="max-w-lg space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Nombre del curso</label>
            <input type="text" className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-brand-500" placeholder="Ej: Ofimática Avanzada" aria-label="Nombre del curso" />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Categoría</label>
            <select className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-brand-500" aria-label="Categoría del curso">
              <option>Tecnología</option>
              <option>Salud</option>
              <option>Educación Financiera</option>
              <option>Agricultura</option>
              <option>Derechos Humanos</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Archivo base</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-brand-400 transition-colors cursor-pointer">
              <div className="text-3xl mb-2" aria-hidden="true">📄</div>
              <p className="text-sm font-medium text-gray-700">Haz clic o arrastra tu archivo aquí</p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOCX o TXT · Máximo 20 MB</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-3">🤖 Generar automáticamente</label>
            <div className="space-y-2">
              {[
                { key: "audio" as const, label: "🎙️ Audio narrado (TTS)", desc: "Voz natural del contenido textual" },
                { key: "resumen" as const, label: "📝 Resumen para bajo ancho de banda", desc: "Versión comprimida del contenido" },
                { key: "paleta" as const, label: "🎨 Paleta daltónico-safe", desc: "Imágenes con colores distinguibles" },
                { key: "evaluaciones" as const, label: "❓ Evaluaciones automáticas", desc: "Preguntas de opción múltiple" },
              ].map((opt) => (
                <label key={opt.key} className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" checked={formatosIA[opt.key]} onChange={() => toggle(opt.key)} className="accent-brand-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <button onClick={() => setPaso("procesando")} className="w-full bg-brand-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-brand-700 transition-colors">
            🤖 Generar con IA
          </button>
        </div>
      )}

      {paso === "procesando" && (
        <div className="max-w-lg text-center py-8">
          <div className="text-5xl mb-4 animate-bounce" aria-hidden="true">🤖</div>
          <p className="text-lg font-bold text-gray-900 mb-2">La IA está procesando tu machote...</p>
          <p className="text-sm text-gray-600 mb-6">Generando audio, resumen, paleta y evaluaciones</p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div className="h-full bg-brand-500 rounded-full animate-pulse" style={{ width: "65%" }} />
          </div>
          <button onClick={() => setTimeout(() => setPaso("listo"), 500)} className="text-xs text-brand-600 underline">Simular finalización</button>
        </div>
      )}

      {paso === "listo" && (
        <div className="max-w-lg text-center py-8">
          <div className="text-5xl mb-4" aria-hidden="true">✅</div>
          <p className="text-lg font-bold text-gray-900 mb-2">¡Machote procesado exitosamente!</p>
          <p className="text-sm text-gray-600 mb-4">La IA ha generado: audio TTS, resumen ligero, paleta daltónico-safe y 5 evaluaciones.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-bold text-green-800 mb-2">Resumen de generación</p>
            <ul className="text-xs text-green-700 space-y-1">
              <li>✅ Audio TTS generado (3:12 min)</li>
              <li>✅ Resumen comprimido creado (1.2 KB)</li>
              <li>✅ Paleta segura para daltonismo aplicada</li>
              <li>✅ 5 preguntas de evaluación generadas</li>
              <li>✅ Metadatos de accesibilidad añadidos</li>
            </ul>
          </div>
          <div className="flex justify-center gap-3">
            <button className="bg-brand-500 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-brand-700">🔍 Revisar y publicar</button>
            <button onClick={() => setPaso("form")} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-300">🔄 Nuevo machote</button>
          </div>
        </div>
      )}
    </>
  );
}

function OrgRevision() {
  return (
    <>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">🔍 Cursos en Revisión ({cursosEnRevision.length})</h3>
      <p className="text-sm text-gray-600 mb-4 max-w-lg">Revisa y publica los cursos que han sido procesados por la IA.</p>

      <div className="space-y-3 max-w-2xl">
        {cursosEnRevision.map((c) => (
          <div key={c.titulo} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 text-sm">{c.titulo}</h4>
              <p className="text-xs text-gray-500">{c.organizacion}</p>
              <div className="flex gap-4 mt-1 text-xs text-gray-400">
                <span>📝 5 módulos</span>
                <span>🎙️ Audio: ✓</span>
                <span>🎨 Paleta: ✓</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.color === "amber" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{c.estado}</span>
              {c.color === "blue" ? (
                <div className="flex gap-1">
                  <button className="text-xs bg-green-500 text-white px-3 py-1.5 rounded font-medium hover:bg-green-600">✅ Publicar</button>
                  <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1.5 rounded font-medium hover:bg-gray-300">✏️ Editar</button>
                </div>
              ) : (
                <button className="text-xs bg-gray-200 text-gray-600 px-3 py-1.5 rounded font-medium cursor-not-allowed">⏳ Esperando IA</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function OrgEstudiantes() {
  return (
    <>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">👥 Estudiantes inscritos ({estudiantesData.length})</h3>
      <p className="text-sm text-gray-600 mb-4 max-w-lg">Lista de estudiantes activos en tus cursos.</p>

      <div className="overflow-x-auto max-w-3xl">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th scope="col" className="py-2 px-3 text-left font-bold text-gray-700">Estudiante</th>
              <th scope="col" className="py-2 px-3 text-left font-bold text-gray-700">Cursos</th>
              <th scope="col" className="py-2 px-3 text-left font-bold text-gray-700">Progreso</th>
              <th scope="col" className="py-2 px-3 text-left font-bold text-gray-700">Último acceso</th>
            </tr>
          </thead>
          <tbody>
            {estudiantesData.map((e) => (
              <tr key={e.nombre} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2.5 px-3 font-medium text-gray-900">{e.nombre}</td>
                <td className="py-2.5 px-3 text-gray-600">{e.cursos}</td>
                <td className="py-2.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="h-full bg-brand-500 rounded-full" style={{ width: e.progreso }} />
                    </div>
                    <span className="text-xs text-gray-500">{e.progreso}</span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-xs text-gray-500">{e.ultimoAcceso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function OrgReportes() {
  const data = [
    { curso: "Introducción a la Computación", estudiantes: 312, completados: 198, tasa: "63%" },
    { curso: "Emprendimiento Rural", estudiantes: 245, completados: 201, tasa: "82%" },
    { curso: "Alfabetización Digital Básica", estudiantes: 180, completados: 92, tasa: "51%" },
    { curso: "Higiene y Salud Familiar", estudiantes: 110, completados: 45, tasa: "41%" },
  ];

  return (
    <>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">📈 Reportes y Métricas</h3>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-900">847</p>
          <p className="text-xs text-blue-700 font-medium">Total estudiantes</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-800">536</p>
          <p className="text-xs text-green-700 font-medium">Cursos completados</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-800">63%</p>
          <p className="text-xs text-amber-700 font-medium">Tasa de completitud</p>
        </div>
      </div>

      {/* Gráfico de barras (visual) */}
      <h4 className="text-sm font-bold text-gray-700 mb-3">Estudiantes por curso</h4>
      <div className="max-w-lg space-y-2 mb-6">
        {data.map((d) => {
          const maxEst = Math.max(...data.map((x) => x.estudiantes));
          const width = (d.estudiantes / maxEst) * 100;
          return (
            <div key={d.curso}>
              <div className="flex justify-between text-xs text-gray-700 mb-1">
                <span className="font-medium">{d.curso}</span>
                <span>{d.estudiantes} estudiantes · {d.tasa} completados</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="h-full rounded-full flex items-center justify-end pr-2 text-xs text-white font-bold"
                  style={{ width: `${width}%`, backgroundColor: "#1e40af" }}
                >
                  {d.estudiantes}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h4 className="text-sm font-bold text-gray-700 mb-3">Distribución por formato de entrega</h4>
      <div className="flex gap-4 max-w-lg mb-6">
        {[
          { label: "📝 Texto", value: 85, color: "bg-blue-500" },
          { label: "🎙️ Audio", value: 62, color: "bg-green-500" },
          { label: "🖼️ Imagen", value: 48, color: "bg-amber-500" },
          { label: "🎬 Video", value: 30, color: "bg-purple-500" },
        ].map((f) => (
          <div key={f.label} className="flex-1 text-center">
            <div className="flex flex-col items-end justify-end h-28 bg-gray-100 rounded-lg overflow-hidden">
              <div className={`w-full ${f.color} transition-all`} style={{ height: `${f.value}%` }} />
            </div>
            <p className="text-xs font-bold mt-1">{f.value}%</p>
            <p className="text-[10px] text-gray-500">{f.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="text-xs bg-brand-500 text-white px-4 py-2 rounded font-medium hover:bg-brand-700">⬇️ Exportar reporte completo (PDF)</button>
        <button className="text-xs bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-300">⬇️ Exportar CSV</button>
      </div>
    </>
  );
}