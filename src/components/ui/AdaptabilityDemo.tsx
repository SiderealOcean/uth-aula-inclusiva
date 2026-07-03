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
