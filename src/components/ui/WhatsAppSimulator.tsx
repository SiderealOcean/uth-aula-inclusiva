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
