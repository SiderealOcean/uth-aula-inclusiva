"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const tabs = [
    { href: "/", label: "Home" },
    { href: "/informe", label: "Informe" },
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
