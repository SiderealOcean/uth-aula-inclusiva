import { MensajeWhatsApp } from "@/data/whatsapp-demo";

interface WhatsAppSimulatorProps {
  mensajes: MensajeWhatsApp[];
  nombrePerfil: string;
  formatoEntregado: string;
  descripcionFormato: string;
  inputValor: string;
  onEnviar: () => void;
  escribiendo: boolean;
}

function AudioWaveform({ duracion }: { duracion?: string }) {
  const barras = [
    40, 65, 80, 95, 70, 50, 85, 100, 75, 60, 90, 55, 45, 70, 85, 60, 40, 55, 75, 50,
  ];
  return (
    <div className="flex items-center gap-1 h-8 py-1" aria-label={`Mensaje de audio, duración ${duracion ?? ""}`}>
      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0" aria-hidden="true">
        ▶
      </div>
      <div className="flex items-end gap-0.5 h-full flex-1" aria-hidden="true">
        {barras.map((h, i) => (
          <div
            key={i}
            className="w-1 bg-green-500 rounded-full"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      {duracion && (
        <span className="text-xs text-gray-500 shrink-0 ml-1">{duracion}</span>
      )}
    </div>
  );
}

function CheckLeido() {
  return (
    <span className="inline-flex items-center ml-1" aria-label="Leído">
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
        <path d="M11.5 1L5 7.5L2.5 5" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 1L1.5 7.5" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(3.5 0)" />
      </svg>
    </span>
  );
}

export default function WhatsAppSimulator({
  mensajes,
  nombrePerfil,
  formatoEntregado,
  descripcionFormato,
  inputValor,
  onEnviar,
  escribiendo,
}: WhatsAppSimulatorProps) {
  return (
    <div
      className="max-w-md mx-auto border border-gray-300 rounded-xl overflow-hidden shadow-2xl bg-white"
      role="region"
      aria-label={`Simulación de conversación WhatsApp para ${nombrePerfil}`}
    >
      {/* Header */}
      <div className="bg-green-600 text-white px-4 py-2.5 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-lg" aria-hidden="true">
          🤖
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Aula Inclusiva HN</p>
          <p className="text-xs opacity-80">
            {escribiendo ? "escribiendo..." : "en línea"}
          </p>
        </div>
        <div className="flex gap-4 text-lg opacity-80" aria-hidden="true">
          <span>📞</span>
          <span>⋮</span>
        </div>
      </div>

      {/* Badge de formato adaptado */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2">
        <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">Formato adaptado:</span>
        <span className="text-sm font-medium text-gray-800">{formatoEntregado}</span>
      </div>

      {/* Chat area */}
      <div
        className="bg-[#e5ddd5] p-3 space-y-2 min-h-[380px] max-h-[480px] overflow-y-auto"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 20px)",
        }}
      >
        {mensajes.map((msg) => {
          const esUsuario = msg.remitente === "usuario";
          const esAudio = msg.tipo === "audio";
          const esImagen = msg.tipo === "imagen";
          const esVideo = msg.tipo === "video";

          return (
            <div
              key={msg.id}
              className={`flex ${esUsuario ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm shadow-sm relative ${
                  esUsuario
                    ? "bg-[#d9fdd3] text-gray-900 rounded-br-sm"
                    : "bg-white text-gray-900 rounded-bl-sm"
                }`}
              >
                {esAudio && (
                  <div className="mb-1 pb-1 border-b border-gray-100">
                    <AudioWaveform duracion={msg.duracionAudio} />
                  </div>
                )}
                {esImagen && (
                  <div className="mb-1 flex items-center gap-2 bg-blue-50 rounded p-2">
                    <span className="text-2xl" aria-hidden="true">🖼️</span>
                    <span className="text-xs text-gray-600">Imagen comprimida · 240×180</span>
                  </div>
                )}
                {esVideo && (
                  <div className="mb-1 flex items-center gap-2 bg-purple-50 rounded p-2">
                    <span className="text-2xl" aria-hidden="true">🎬</span>
                    <span className="text-xs text-gray-600">Video · 3:00 min · 2 MB</span>
                  </div>
                )}
                {!esAudio && (
                  <span style={{ whiteSpace: "pre-wrap" }}>{msg.contenido}</span>
                )}
                {esAudio && (
                  <span className="text-xs text-gray-600 block mt-1">{msg.contenido}</span>
                )}
                {/* Timestamp + ✓✓ */}
                <div className="flex items-center justify-end gap-1 mt-0.5 -mb-1">
                  <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                  {esUsuario && <CheckLeido />}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {escribiendo && (
          <div className="flex justify-start">
            <div className="bg-white rounded-lg rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1" aria-label="El bot está escribiendo">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="bg-gray-100 px-3 py-2 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400 border border-gray-200">
          {inputValor || "Escribe un mensaje..."}
        </div>
        <button
          onClick={onEnviar}
          className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors shrink-0"
          aria-label="Enviar mensaje"
        >
          ➤
        </button>
      </div>

      {/* Descripción del formato */}
      <div className="bg-gray-50 px-4 py-1.5 text-xs text-gray-500 text-center border-t border-gray-200">
        {descripcionFormato}
      </div>
    </div>
  );
}