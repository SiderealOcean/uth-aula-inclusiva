"use client";

import { useState, useEffect } from "react";
import { perfiles, generarConversacion, MensajeWhatsApp } from "@/data/whatsapp-demo";
import WhatsAppSimulator from "./WhatsAppSimulator";

export default function AdaptabilityDemo() {
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(0);
  const [mensajesVisibles, setMensajesVisibles] = useState<MensajeWhatsApp[]>([]);
  const [escribiendo, setEscribiendo] = useState(false);
  const [inputValor, setInputValor] = useState("");
  const [reproduciendo, setReproduciendo] = useState(true);
  const [reiniciarKey, setReiniciarKey] = useState(0);

  const perfil = perfiles[perfilSeleccionado];
  const conversacionCompleta = generarConversacion(perfil);

  // Animación progresiva de mensajes
  useEffect(() => {
    setMensajesVisibles([]);
    setEscribiendo(false);
    setReproduciendo(true);

    let cancelado = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let acumulado = 0;

    conversacionCompleta.forEach((msg) => {
      // Typing indicator antes de cada mensaje del bot
      if (msg.remitente === "bot") {
        acumulado += msg.delay;
        const typingDelay = acumulado;
        const showDelay = acumulado + 600; // 600ms de "escribiendo..."

        timers.push(
          setTimeout(() => {
            if (!cancelado) setEscribiendo(true);
          }, typingDelay)
        );
        timers.push(
          setTimeout(() => {
            if (!cancelado) {
              setEscribiendo(false);
              setMensajesVisibles((prev) => [...prev, msg]);
            }
          }, showDelay)
        );
        acumulado += 600;
      } else {
        acumulado += msg.delay;
        const msgDelay = acumulado;
        timers.push(
          setTimeout(() => {
            if (!cancelado) {
              setMensajesVisibles((prev) => [...prev, msg]);
            }
          }, msgDelay)
        );
      }
    });

    // Marcar fin de la animación
    timers.push(
      setTimeout(() => {
        if (!cancelado) setReproduciendo(false);
      }, acumulado + 500)
    );

    return () => {
      cancelado = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfilSeleccionado, reiniciarKey]);

  const reiniciar = () => {
    setMensajesVisibles([]);
    setEscribiendo(false);
    setReproduciendo(true);
    setReiniciarKey((k) => k + 1);
  };

  const handleEnviar = () => {
    if (!inputValor.trim()) return;
    const nuevoMsg: MensajeWhatsApp = {
      id: Date.now(),
      remitente: "usuario",
      contenido: inputValor,
      tipo: "texto",
      delay: 0,
      timestamp: new Date().toLocaleTimeString("es-HN", { hour: "numeric", minute: "2-digit" }),
    };
    setMensajesVisibles((prev) => [...prev, nuevoMsg]);
    setInputValor("");
  };

  return (
    <div className="space-y-5">
      <h3 className="text-pres-subtitle text-gray-900">
        Demo: selecciona un perfil y observa cómo se adapta la entrega
      </h3>

      {/* Selector de perfiles */}
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Seleccionar perfil de usuario">
        {perfiles.map((p, i) => (
          <button
            key={p.nombre}
            role="radio"
            aria-checked={i === perfilSeleccionado}
            onClick={() => setPerfilSeleccionado(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              i === perfilSeleccionado
                ? "bg-brand-500 text-white shadow-md scale-105"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {p.icono} {p.nombre}
          </button>
        ))}
      </div>

      {/* Panel de info: formato adaptado */}
      <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl" aria-hidden="true">{perfil.icono}</div>
          <div>
            <p className="font-bold text-brand-900 text-sm">{perfil.nombre}</p>
            <p className="text-xs text-brand-700">{perfil.descripcionFormato}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {reproduciendo ? (
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium animate-pulse">
              ▶️ Reproduciendo...
            </span>
          ) : (
            <button
              onClick={reiniciar}
              className="text-xs bg-brand-500 text-white px-3 py-1.5 rounded-full font-medium hover:bg-brand-700 transition-colors"
            >
              🔄 Reiniciar simulación
            </button>
          )}
        </div>
      </div>

      {/* Simulador WhatsApp */}
      <WhatsAppSimulator
        mensajes={mensajesVisibles}
        nombrePerfil={perfil.nombre}
        formatoEntregado={perfil.formatoEntregado}
        descripcionFormato={perfil.descripcionFormato}
        inputValor={inputValor}
        onInputChange={setInputValor}
        onEnviar={handleEnviar}
        escribiendo={escribiendo}
      />
    </div>
  );
}